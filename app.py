"""
=============================================================================
RANJITA AKKASALI PORTFOLIO - FLASK BACKEND APPLICATION
Production-Grade Python & Flask REST API Server

Endpoints:
- GET  /                  -> Serves the Portfolio (index.html)
- POST /api/contact       -> Validates & stores contact inquiries in data/messages.json
- GET  /api/messages      -> Admin endpoint returning stored messages
- GET  /api/health        -> Health check reporting service status & Python version
- GET  /<path:filename>   -> Serves CSS, JS, and image assets
=============================================================================
"""

import os
import sys
import json
import time
import uuid
import re
import html
from datetime import datetime

# Ensure utf-8 encoding on Windows console
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Initialize Flask application
app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)  # Enable Cross-Origin Resource Sharing for API flexibility

# Configuration
PORT = int(os.environ.get('PORT', 5000))
HOST = os.environ.get('HOST', '0.0.0.0')
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MESSAGES_FILE = os.path.join(DATA_DIR, 'messages.json')

# Ensure data directory and messages file exist
os.makedirs(DATA_DIR, exist_ok=True)
if not os.path.exists(MESSAGES_FILE):
    with open(MESSAGES_FILE, 'w', encoding='utf-8') as f:
        json.dump([], f, indent=2)


def sanitize_input(text: str) -> str:
    """Escapes HTML entities to prevent Cross-Site Scripting (XSS)."""
    if not isinstance(text, str):
        return ""
    return html.escape(text.strip())


# =============================================================================
# FRONTEND STATIC ROUTES
# =============================================================================

@app.route('/')
def serve_index():
    """Serves the main portfolio HTML page."""
    return send_from_directory(BASE_DIR, 'index.html')


@app.route('/<path:filename>')
def serve_static(filename):
    """Serves static CSS, JS, images, and fonts with directory traversal protection."""
    # Prevent directory traversal
    safe_path = os.path.abspath(os.path.join(BASE_DIR, filename))
    if not safe_path.startswith(BASE_DIR):
        return "403 Forbidden", 403

    if os.path.exists(safe_path) and os.path.isfile(safe_path):
        return send_from_directory(BASE_DIR, filename)
    return "404 Not Found", 404


# =============================================================================
# REST API ROUTES
# =============================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Reports application health, runtime environment, and uptime."""
    return jsonify({
        "status": "healthy",
        "service": "Portfolio Flask Backend",
        "framework": "Flask 3.x",
        "python_version": sys.version.split()[0],
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }), 200


@app.route('/api/contact', methods=['POST'])
def handle_contact():
    """
    Receives, validates, sanitizes, and persists contact form inquiries.
    Stores messages in data/messages.json.
    """
    try:
        data = request.get_json(silent=True) or request.form.to_dict()
        if not data:
            return jsonify({
                "success": False,
                "error": "Request body must be valid JSON or form data."
            }), 400

        name = data.get('name', '')
        email = data.get('email', '')
        subject = data.get('subject', '')
        message = data.get('message', '')

        errors = []

        # Validate name
        if not name or len(name.strip()) < 2:
            errors.append("Full name must be at least 2 characters.")

        # Validate email
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not email or not re.match(email_regex, email.strip()):
            errors.append("A valid email address is required.")

        # Validate subject
        if not subject or len(subject.strip()) < 2:
            errors.append("Subject must be at least 2 characters.")

        # Validate message
        if not message or len(message.strip()) < 10:
            errors.append("Message must contain at least 10 characters.")

        if errors:
            return jsonify({
                "success": False,
                "errors": errors
            }), 400

        # Create structured message record
        record_id = f"msg_{int(time.time())}_{uuid.uuid4().hex[:8]}"
        new_record = {
            "id": record_id,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "name": sanitize_input(name),
            "email": sanitize_input(email.lower()),
            "subject": sanitize_input(subject),
            "message": sanitize_input(message),
            "client_ip": request.headers.get('X-Forwarded-For', request.remote_addr),
            "user_agent": request.headers.get('User-Agent', 'unknown'),
            "status": "unread"
        }

        # Read existing records and append
        saved_to_disk = False
        try:
            messages = []
            if os.path.exists(MESSAGES_FILE):
                try:
                    with open(MESSAGES_FILE, 'r', encoding='utf-8') as f:
                        messages = json.load(f)
                except Exception:
                    messages = []
            messages.append(new_record)
            with open(MESSAGES_FILE, 'w', encoding='utf-8') as f:
                json.dump(messages, f, indent=2)
            saved_to_disk = True
        except Exception as file_err:
            app.logger.warning(f"Could not persist message to disk ({file_err}), message logged to console.")

        # Log to terminal console
        print("\n" + "="*50)
        print(">> [NEW FLASK CONTACT INQUIRY RECEIVED]")
        print(f"   From:    {new_record['name']} <{new_record['email']}>")
        print(f"   Subject: {new_record['subject']}")
        print(f"   Time:    {new_record['timestamp']}")
        print(f"   Saved:   {'data/messages.json' if saved_to_disk else 'In-Memory/Console'} (ID: {new_record['id']})")
        print("="*50 + "\n")

        return jsonify({
            "success": True,
            "message": f"Thank you, {new_record['name']}! Your message has been safely received. I will reply to {new_record['email']} within 24 hours.",
            "referenceId": new_record["id"]
        }), 201

    except Exception as e:
        app.logger.error(f"Error handling contact message: {e}")
        return jsonify({
            "success": False,
            "error": "An internal server error occurred while processing your message."
        }), 500


@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Admin endpoint to retrieve all submitted inquiries."""
    try:
        with open(MESSAGES_FILE, 'r', encoding='utf-8') as f:
            messages = json.load(f)
        return jsonify({
            "success": True,
            "count": len(messages),
            "messages": messages
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# =============================================================================
# ERROR HANDLERS
# =============================================================================

@app.errorhandler(404)
def not_found(e):
    if request.path.startswith('/api/'):
        return jsonify({"success": False, "error": "Endpoint not found"}), 404
    return """
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
            <p>The requested page or asset could not be found.</p>
            <p><a href="/">Return to Portfolio Homepage</a></p>
        </div>
    </body>
    </html>
    """, 404


# =============================================================================
# SERVER ENTRYPOINT
# =============================================================================

if __name__ == '__main__':
    print("\n" + "="*56)
    print("  >> PORTFOLIO FLASK SERVER RUNNING")
    print("="*56)
    print(f"  Local URL:        http://localhost:{PORT}")
    print(f"  IP URL:           http://127.0.0.1:{PORT}")
    print(f"  Health Check:     http://localhost:{PORT}/api/health")
    print(f"  Contact API:      POST http://localhost:{PORT}/api/contact")
    print(f"  Stored Messages:  http://localhost:{PORT}/api/messages")
    print(f"  Message Storage:  {MESSAGES_FILE}")
    print("="*56 + "\n")
    app.run(host=HOST, port=PORT, debug=False)
