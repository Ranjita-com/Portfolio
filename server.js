/**
 * ==========================================================================
 * ALEX MORGAN PORTFOLIO - BACKEND SERVER
 * Production Grade Node.js HTTP Server & REST API
 * 
 * Features:
 * - Zero external dependencies required (runs instantly with `node server.js`)
 * - Static file serving with strict MIME type resolution & security checks
 * - Contact Form API (/api/contact) with input validation & sanitization
 * - Persistent message storage in data/messages.json
 * - API Health Check & Admin message endpoints
 * ==========================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

// Configuration
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure data directory and messages file exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2), 'utf8');
}

// MIME Type Mapping
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain; charset=utf-8',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf'
};

// Security helper: sanitize HTML strings
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Request Body Parser Helper
function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            // 1MB limit for safety
            if (body.length > 1e6) {
                req.destroy();
                reject(new Error('Payload too large'));
            }
        });
        req.on('end', () => {
            if (!body) {
                resolve({});
                return;
            }
            try {
                const parsed = JSON.parse(body);
                resolve(parsed);
            } catch (err) {
                reject(new Error('Invalid JSON format'));
            }
        });
        req.on('error', err => reject(err));
    });
}

// Send JSON Response Helper
function sendJson(res, statusCode, data) {
    const json = JSON.stringify(data, null, 2);
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(json);
}

// Main Request Handler
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Handle CORS pre-flight
    if (method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // ----------------------------------------------------------------------
    // REST API ROUTES (/api/*)
    // ----------------------------------------------------------------------

    // GET /api/health
    if (pathname === '/api/health' && method === 'GET') {
        return sendJson(res, 200, {
            status: 'healthy',
            service: 'Portfolio Backend Server',
            uptimeSeconds: Math.floor(process.uptime()),
            nodeVersion: process.version,
            timestamp: new Date().toISOString()
        });
    }

    // POST /api/contact - Handle Contact Form Submission
    if (pathname === '/api/contact' && method === 'POST') {
        try {
            const body = await parseJsonBody(req);
            const { name, email, subject, message } = body;

            // Validation
            const errors = [];
            if (!name || typeof name !== 'string' || name.trim().length < 2) {
                errors.push('Full name must be at least 2 characters.');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
                errors.push('A valid email address is required.');
            }

            if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
                errors.push('Subject must be at least 2 characters.');
            }

            if (!message || typeof message !== 'string' || message.trim().length < 10) {
                errors.push('Message must contain at least 10 characters.');
            }

            if (errors.length > 0) {
                return sendJson(res, 400, {
                    success: false,
                    errors: errors
                });
            }

            // Create record
            const newRecord = {
                id: `msg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
                timestamp: new Date().toISOString(),
                name: sanitize(name.trim()),
                email: sanitize(email.trim().toLowerCase()),
                subject: sanitize(subject.trim()),
                message: sanitize(message.trim()),
                clientIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
                userAgent: req.headers['user-agent'] || 'unknown',
                status: 'unread'
            };

            // Read existing messages and append
            let messages = [];
            try {
                const existingData = fs.readFileSync(MESSAGES_FILE, 'utf8');
                messages = JSON.parse(existingData);
            } catch (err) {
                messages = [];
            }

            messages.push(newRecord);
            fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');

            console.log(`\n📬 [NEW MESSAGE RECEIVED]`);
            console.log(`   From:    ${newRecord.name} <${newRecord.email}>`);
            console.log(`   Subject: ${newRecord.subject}`);
            console.log(`   Time:    ${newRecord.timestamp}`);
            console.log(`   Stored:  data/messages.json (ID: ${newRecord.id})`);

            return sendJson(res, 201, {
                success: true,
                message: `Thank you, ${newRecord.name}! Your message has been received. I will reply to ${newRecord.email} within 24 hours.`,
                referenceId: newRecord.id
            });
        } catch (err) {
            console.error('Error handling contact submission:', err);
            return sendJson(res, 500, {
                success: false,
                error: 'An internal server error occurred while processing your message.'
            });
        }
    }

    // GET /api/messages - View Inquiries (Admin API)
    if (pathname === '/api/messages' && method === 'GET') {
        try {
            const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
            const messages = JSON.parse(data);
            return sendJson(res, 200, {
                success: true,
                count: messages.length,
                messages: messages
            });
        } catch (err) {
            return sendJson(res, 500, { success: false, error: 'Could not read messages' });
        }
    }

    // ----------------------------------------------------------------------
    // STATIC FILE SERVING
    // ----------------------------------------------------------------------
    if (method === 'GET' || method === 'HEAD') {
        let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

        // Prevent directory traversal attacks
        const normalizedPath = path.normalize(filePath);
        if (!normalizedPath.startsWith(PUBLIC_DIR)) {
            res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('403 Forbidden');
            return;
        }

        // Check if file exists
        fs.stat(normalizedPath, (err, stats) => {
            if (err || !stats.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <title>404 Not Found</title>
                        <style>
                            body { font-family: system-ui, sans-serif; background: #07090e; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
                            h1 { font-size: 3rem; margin: 0; color: #38bdf8; }
                            p { color: #94a3b8; }
                            a { color: #38bdf8; text-decoration: none; border-bottom: 1px solid #38bdf8; }
                        </style>
                    </head>
                    <body>
                        <div>
                            <h1>404</h1>
                            <p>The requested file could not be found.</p>
                            <p><a href="/">Return to Portfolio Homepage</a></p>
                        </div>
                    </body>
                    </html>
                `);
                return;
            }

            const ext = path.extname(normalizedPath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            // Cache headers for static assets
            const headers = {
                'Content-Type': contentType,
                'Content-Length': stats.size,
                'X-Content-Type-Options': 'nosniff'
            };

            if (ext === '.html') {
                headers['Cache-Control'] = 'no-cache';
            } else {
                headers['Cache-Control'] = 'public, max-age=86400';
            }

            res.writeHead(200, headers);

            if (method === 'HEAD') {
                res.end();
                return;
            }

            const stream = fs.createReadStream(normalizedPath);
            stream.pipe(res);
        });
        return;
    }

    // Method not allowed
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('405 Method Not Allowed');
});

// Start the Server (listens on both IPv4 and IPv6)
server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  🚀 PORTFOLIO BACKEND SERVER RUNNING`);
    console.log(`======================================================`);
    console.log(`  Local URL:        http://localhost:${PORT}`);
    console.log(`  IP URL:           http://127.0.0.1:${PORT}`);
    console.log(`  Health Check:     http://localhost:${PORT}/api/health`);
    console.log(`  Contact Endpoint: POST http://localhost:${PORT}/api/contact`);
    console.log(`  Stored Messages:  http://localhost:${PORT}/api/messages`);
    console.log(`  Message File:     ${MESSAGES_FILE}`);
    console.log(`======================================================\n`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Error: Port ${PORT} is already in use by another application.`);
        console.error(`Try running on another port: PORT=3001 node server.js\n`);
    } else {
        console.error('\n❌ Server Error:', err);
    }
    process.exit(1);
});

// Graceful Shutdown
process.on('SIGINT', () => {
    console.log('\nStopping Portfolio Server...');
    server.close(() => {
        console.log('Server stopped cleanly.');
        process.exit(0);
    });
});
