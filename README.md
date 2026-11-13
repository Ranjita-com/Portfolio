# Ranjita Akkasali — Engineering & Software Systems Portfolio

A high-performance, executive-grade personal portfolio website engineered for **Ranjita Akkasali**, Engineering Student at **Yenepoya Institute of Technology, Moodbidri**.

Featuring an **Obsidian Glassmorphism** design system, live skills search, interactive project architecture modals, dynamic CV/resume export, verified certificate lightboxes, and a **Python & Flask REST API backend server** (with zero-dependency Node.js fallback) with contact form persistence.

---

## 🚀 Quick Start

### Option 1: Run with Python & Flask (Recommended)
You can run the Flask backend server directly:

```bash
# 1. Install dependencies (if not already installed)
pip install -r requirements.txt

# 2. Start the Flask backend server
python app.py
```

Then open your browser to **[http://localhost:5000](http://localhost:5000)**.

### Option 2: Run with Node.js Server
Alternatively, if you prefer Node.js without Python:

```bash
node server.js
```
Then open your browser to **[http://localhost:3000](http://localhost:3000)**.

### Option 3: Static Preview (No Server Required)
Simply double-click `index.html` or open it with the VS Code **Live Server** extension. The site automatically detects static mode and falls back gracefully.

---

## 📁 Project Structure

```text
E:\Portfolio\
├── index.html              # Semantic HTML5 architecture & UI
├── app.py                  # Python Flask backend server & REST API (Port 5000)
├── server.js               # Node.js backend server & REST API (Port 3000)
├── requirements.txt        # Python dependencies (Flask, Flask-CORS)
├── package.json            # Scripts & project metadata
├── .env.example            # Environment variable configuration template
├── README.md               # Documentation & setup guide
│
├── css\
│   └── styles.css          # Silicon Valley glassmorphism design system
│
├── js\
│   ├── data.js             # Portfolio content configuration & data models
│   └── main.js             # Application logic, animations & UI controllers
│
├── data\
│   └── messages.json       # Persistent storage for contact form submissions
│
└── assets\
    └── images\             # Real certificate images & project screenshots
        ├── cert_iitb_linux.jpg
        ├── cert_iitb_kotlin.jpg
        ├── cert_iitb_java.jpg
        ├── cert_infosys_postman.jpg
        ├── cert_infosys_cybersecurity.jpg
        ├── cert_infosys_prompt_eng.jpg
        ├── cert_hp_cybersecurity.jpg
        ├── cert_ibm.jpg
        ├── cert_azure.jpg
        ├── cert_freedom_ai.jpg
        ├── cert_powerbi.jpg
        ├── cert_iiitk_conference.jpg
        ├── cert_ijrpr_publication.jpg
        ├── cert_icaem_conference.png
        ├── award_solveathon.png
        ├── internship_bluestock.jpg
        ├── internship_internpe.jpg
        ├── internship_prodigy.jpg
        ├── internship_codec.jpg
        └── profile_avatar.jpg
```

---

## 🛠️ Backend REST API Endpoints

The backend (`app.py` on port 5000 / `server.js` on port 3000) provides built-in REST API endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/contact` | Validates, sanitizes, and stores contact form submissions into `data/messages.json`. |
| `GET` | `/api/messages` | Admin endpoint to review received inquiries in JSON format. |
| `GET` | `/api/health` | Health check reporting service status, uptime, and Python/Node version. |
| `GET` | `/*` | High-speed static file server with MIME resolution and cache controls. |

### Submitting a Message via API
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Sarah Jenkins","email":"sarah@example.com","subject":"Engineering Inquiry","message":"Congratulations on your IEEE publication!"}'
```

---

## 📜 Verified Certificates & Internships Included

The portfolio integrates Ranjita's accredited credentials:

1. **IIT Bombay Spoken Tutorial**:
   - **Linux System Administration** (Score: 82.22%, ID: `4046909QWJ`)
   - **Android App Development using Kotlin** (Score: 85.00%, ID: `4046909X5D`)
   - **Java Programming** (4 Academic Credits, ID: `40469094BK`)
2. **Infosys Springboard**:
   - **Postman & REST API Testing**
   - **Cybersecurity Fundamentals & Defense**
   - **Prompt Engineering Specialization**
3. **HP Foundation, IBM & Microsoft Accreditations**:
   - **HP LIFE / HP Foundation**: Introduction to Cybersecurity Awareness (Serial: `c34881d9-2472-4e17-9640-4a6ccf1f91d4`, Stephanie Bormann, Deputy Director)
   - **IBM Developer Skills Network / Etrain**: Rapid Development for AI Services (ID: `25ae5a351e2c42c791c3cc11d0f6e334`, CERDAI1IN)
   - **Freedom with AI**: Freedom with AI Masterclass (ISO 9001:2015 Certified, Avinash Mada)
   - **Skill Nation**: AI Dashboards using Microsoft Power BI (Conducted by Mr. Jatan Shah, Microsoft Certified Trainer)
   - **Microsoft**: Certified Azure Fundamentals (ID: `24rx-XMSn`, verify.certiport.com, Signed by Satya Nadella)
4. **Research Publications & Conferences**:
   - **IEEE IIIT Kottayam (ICITIIT'26)**: Facial Biometric Online Voting (ID: `IIITK/ICITIIT26/PROL/45`)
   - **IJRPR International Journal**: DigitVision CNN (Sr. No: `IJRPR 78482`, IF: 5.536)
   - **IEEE AJIET (IC-AEAM 2026)**: Cognitive Agentic AI for Smart Bus Monitoring
   - **Solve-A-Thon 1.0**: 24-Hour National Hackathon (SIT Mangaluru)
4. **Industry Internships**:
   - **Bluestock Fintech** (Data Analyst Intern, ID: `BFDA170254`)
   - **InternPe** (Web Development Intern, ID: `IPI#67626`)
   - **Prodigy InfoTech** (Machine Learning Intern, CIN: `PIT/NOV25/00285`)
   - **Codec Technologies** (Cyber Security Intern, AICTE ID: `CORPORATE6759d549ce59e1733940553`, National Internship Portal & Google for Education Partner)

---

## 🎨 Live Personalizer

Click the **"Personalize"** floating button at the bottom-right corner of the website to dynamically test or edit details live on your screen.

---

## 📄 License
MIT License. Created for Ranjita Akkasali.

