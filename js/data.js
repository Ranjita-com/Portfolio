/**
 * Personal Portfolio Data Configuration
 * Portfolio of Ranjita Akkasali
 * Engineering Student at Yenepoya Institute of Technology, Moodbidri
 * Published Researcher, Multiple Internships, and Certified by IIT Bombay & Infosys
 */

const defaultPortfolioData = {
    personal: {
        name: "Ranjita Akkasali",
        preferredName: "Ranjita",
        title: "Engineering Student | AI, Web Development & Cybersecurity",
        roleTitle: "Software Systems & AI Engineer",
        tagline: "Engineering intelligent computer vision models, scalable web applications & robust secure systems.",
        university: "Yenepoya Institute of Technology, Moodbidri",
        degree: "Bachelor of Engineering (B.E.) in Computer Science & Engineering",
        gpa: "8.8 / 10.0",
        gradYear: "2026",
        standing: "Undergraduate Engineering Scholar",
        status: "Open for Software Engineering & AI Internships / Roles",
        statusType: "available",
        location: "Mangaluru, Karnataka, India • Open to Relocate to Bengaluru, Mangaluru, Pune, Mumbai & Remote",
        email: "aakkasali344@gmail.com",
        phone: "+91 86182 83885",
        responseTime: "< 24 hours",
        bio: "Dedicated Engineering Student at Yenepoya Institute of Technology with recognized research publications in Computer Vision (CNN) and facial biometric authentication. Proven technical execution across Data Analytics, Machine Learning, and Web Development through industry internships at Bluestock Fintech, InternPe, and Prodigy InfoTech. Accredited by IIT Bombay (Linux, Kotlin, Java), Infosys Springboard (Postman, Cybersecurity, Prompt Engineering), HP Foundation, and Microsoft.",
        socials: {
            github: "https://github.com/Ranjita-com",
            linkedin: "https://www.linkedin.com/in/ranjita-akkasali",
            leetcode: "https://leetcode.com",
            scholar: "https://scholar.google.com"
        },
        metrics: [
            { label: "Research Publications", value: "3", suffix: " Papers", icon: "fas fa-book-bookmark", description: "IEEE & International Journals" },
            { label: "Accredited Certifications", value: "13", suffix: "+", icon: "fas fa-certificate", description: "IIT Bombay, Infosys, MS, HP, IBM" },
            { label: "Industry Internships", value: "4", suffix: " Roles", icon: "fas fa-briefcase", description: "Fintech, Web, ML & Security" },
            { label: "Hackathon Competitions", value: "24h", suffix: " Hackathons", icon: "fas fa-trophy", description: "National Solve-A-Thon 1.0" }
        ],
        aboutPillars: [
            {
                title: "Computer Vision & Deep Learning",
                icon: "fas fa-brain",
                desc: "Published researcher in Haar Cascade facial biometric authentication and Convolutional Neural Networks (CNN) for handwritten digit recognition."
            },
            {
                title: "Full-Stack Web Development & APIs",
                icon: "fas fa-globe",
                desc: "Experienced in responsive web development (InternPe) and API validation/testing with Postman (certified by Infosys Springboard)."
            },
            {
                title: "Systems, Linux & Cybersecurity",
                icon: "fas fa-shield-halved",
                desc: "Certified by IIT Bombay in Linux (82.22%) and Java (4 credits), with formal training in Cybersecurity threat mitigation."
            }
        ]
    },

    skills: [
        // Languages & Core
        { name: "Python", category: "languages", icon: "devicon-python-plain colored", level: "Advanced", experience: "3+ yrs", highlight: "NumPy, Pandas, Scikit-learn, OpenCV, CNNs" },
        { name: "Java", category: "languages", icon: "devicon-java-plain colored", level: "Certified", experience: "IIT Bombay 4 Credits", highlight: "OOP, Data Structures, Exception Handling, Core Java" },
        { name: "C / C++", category: "languages", icon: "devicon-cplusplus-plain colored", level: "Proficient", experience: "2+ yrs", highlight: "Algorithms, Memory Concepts, Problem Solving" },
        { name: "Kotlin", category: "languages", icon: "devicon-kotlin-plain colored", level: "Certified", experience: "IIT Bombay 85%", highlight: "Android App Development, Mobile UI, Android SDK" },
        { name: "SQL", category: "languages", icon: "devicon-postgresql-plain colored", level: "Proficient", experience: "2+ yrs", highlight: "Relational Queries, Data Analysis, Database Design" },
        { name: "JavaScript (ES6+)", category: "languages", icon: "devicon-javascript-plain colored", level: "Proficient", experience: "2+ yrs", highlight: "DOM Manipulation, Async Programming, Fetch APIs" },

        // Frameworks & Web
        { name: "Web Development", category: "frameworks", icon: "devicon-html5-plain colored", level: "Internship Tested", experience: "InternPe", highlight: "HTML5, CSS3, Responsive Design, Modern UI/UX" },
        { name: "Android App Development", category: "frameworks", icon: "devicon-android-plain colored", level: "Certified", experience: "IIT Bombay", highlight: "Kotlin, Layout Design, App Lifecycle, Intents" },
        { name: "Computer Vision & CNN", category: "frameworks", icon: "devicon-opencv-plain colored", level: "Published Research", experience: "2 Papers", highlight: "Haar Cascade Classifiers, Face Biometrics, DigitVision" },
        { name: "Prompt Engineering", category: "frameworks", icon: "fas fa-wand-magic-sparkles", level: "Certified", experience: "Infosys Springboard", highlight: "Few-shot Prompting, Chain of Thought, LLM Workflows" },

        // Engineering & Systems
        { name: "Linux System Administration", category: "engineering", icon: "devicon-linux-plain colored", level: "Certified", experience: "IIT Bombay 82.2%", highlight: "Shell Commands, Bash, Permissions, Process Mgmt" },
        { name: "Cybersecurity & Defense", category: "engineering", icon: "fas fa-shield-virus", level: "Certified", experience: "HP LIFE & Infosys", highlight: "Threat Analysis, Network Protection, Security Hygiene, Access Control" },
        { name: "Git & GitHub Version Control", category: "engineering", icon: "devicon-git-plain colored", level: "Advanced", experience: "3+ yrs", highlight: "Repository Management, Branching, Collaborative Work" },

        // Cloud & Tools
        { name: "Postman & API Testing", category: "cloud", icon: "devicon-postman-plain colored", level: "Certified", experience: "Infosys Springboard", highlight: "REST API Validation, Collections, HTTP Methods, Mocking" },
        { name: "Microsoft Power BI", category: "cloud", icon: "fas fa-chart-pie", level: "Certified", experience: "Skill Nation", highlight: "Data Modeling, DAX, Interactive Executive Dashboards" },
        { name: "Microsoft Azure (AZ-900)", category: "cloud", icon: "devicon-azure-plain colored", level: "Certified", experience: "Fundamentals", highlight: "Cloud Concepts, Virtual Machines, Cloud Storage, IAM" },
        { name: "Rapid AI Development (IBM)", category: "cloud", icon: "fas fa-microchip", level: "Certified", experience: "IBMCE / Etrain", highlight: "Rapid Development for AI Services, Cloud AI APIs, Model Integration" }
    ],

    internships: [
        {
            id: "intern-1",
            role: "Data Analyst Intern",
            company: "Bluestock Fintech (#startupindia)",
            location: "Remote",
            period: "November 2026 – January 2027",
            badge: "Fintech Startup",
            type: "Industry Internship",
            description: "Selected as Data Analyst Intern at Bluestock Fintech to conduct quantitative financial market data analysis and analytics reporting.",
            metricsCallout: "📊 Financial Analytics • Official Offer ID: BFDA170254",
            highlights: [
                "Collaborating closely with leadership and product engineering to extract actionable insights from market telemetry datasets.",
                "Designing data pipelines and exploratory dashboards to monitor metrics across fintech customer segments.",
                "Working with flexible remote collaboration tooling and structured reporting workflows."
            ],
            tech: ["Python", "Data Analytics", "SQL", "Power BI", "Financial Modeling"],
            certificateImg: "assets/images/internship_bluestock.jpg"
        },
        {
            id: "intern-2",
            role: "Web Development Intern",
            company: "InternPe",
            location: "Remote",
            period: "27 October 2025 – 24 November 2025",
            badge: "Internship Completed (CID: IPI#67626)",
            type: "Corporate Internship",
            description: "Successfully completed full-term web development internship with InternPe, an AICTE, MSME, and ISO 9001:2015 certified organization.",
            metricsCallout: "🌐 100% On-Time Project Delivery • Rated Sincere & Dedicated",
            highlights: [
                "Engineered responsive modern web components with clean semantic HTML5, CSS3, and JavaScript.",
                "Implemented interactive frontend features with robust cross-browser validation across desktop and mobile screens.",
                "Awarded official Internship Completion Certificate recognizing professional attitude and strong job knowledge."
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "Git"],
            certificateImg: "assets/images/internship_internpe.jpg"
        },
        {
            id: "intern-3",
            role: "Machine Learning Intern",
            company: "Prodigy InfoTech",
            location: "Remote",
            period: "October 2025 – November 2025",
            badge: "Offer Accepted (CIN: PIT/NOV25/00285)",
            type: "AI & ML Internship",
            description: "Offered and completed the Machine Learning Internship at Prodigy InfoTech, developing predictive algorithms and feature pipelines.",
            metricsCallout: "🤖 Predictive ML Models • Feature Engineering",
            highlights: [
                "Constructed predictive machine learning models using Python, Scikit-learn, and Pandas for structured datasets.",
                "Implemented feature scaling, exploratory data analysis (EDA), and cross-validated evaluation metrics.",
                "Prepared end-to-end documentation and clean reproducible codebases for ML deliverables."
            ],
            tech: ["Python", "Scikit-Learn", "Machine Learning", "Pandas", "NumPy"],
            certificateImg: "assets/images/internship_prodigy.jpg"
        },
        {
            id: "intern-4",
            role: "Cyber Security Intern",
            company: "Codec Technologies Pvt. Ltd.",
            location: "Pan India (Remote / Industrial Training)",
            period: "01 September 2026 – 01 November 2026",
            badge: "2-Month AICTE & ICAC Approved (ID: CORPORATE6759d549ce59e1733940553)",
            type: "Industrial Training & Internship",
            description: "Completed the 2-Month AICTE and ICAC Approved Industrial Training & Internship program in Cyber Security with Codec Technologies Pvt. Ltd., affiliated with the Ministry of Education National Internship Portal and Google for Education Partner.",
            metricsCallout: "🛡️ 2 Months Industrial Training • Verified on National Internship Portal",
            highlights: [
                "Awarded official Certificate of Internship for completion of the 2-Month AICTE & ICAC approved industrial training program.",
                "Conducted cybersecurity vulnerability assessments, threat analysis, and security hygiene evaluation under Program Manager Dr. Anurag Shrivastava.",
                "Verified under Ministry of Education National Internship Portal with AICTE ID: CORPORATE6759d549ce59e1733940553."
            ],
            tech: ["Cybersecurity", "Network Defense", "Threat Analysis", "Vulnerability Assessment", "Linux"],
            certificateImg: "assets/images/internship_codec.jpg"
        }
    ],

    projects: [
        {
            id: "project-1",
            title: "Facial Biometric Online Voting System (Haar Cascade)",
            category: "ai",
            badge: "IEEE Conference Presented",
            featured: true,
            image: "assets/images/cert_iiitk_conference.jpg",
            summary: "Secure digital voting platform featuring Haar Cascade facial biometric authentication to eliminate voter fraud and enforce 1-person-1-vote security.",
            problem: "Traditional voting platforms suffer from identity impersonation and remote authentication vulnerabilities.",
            solution: "Designed and implemented an automated facial recognition authentication gate using OpenCV Haar Cascade classifiers with liveness verification.",
            metrics: "Presented at 7th IEEE ICITIIT'26 • IIIT Kottayam (PROL/45)",
            architecture: "Live Camera Stream ⟷ Haar Cascade Face Detection ⟷ Biometric Verification ⟷ Secure Balloting DB",
            tech: ["Python", "OpenCV", "Haar Cascade", "Computer Vision", "Biometrics", "Web Security"],
            github: "https://github.com/Ranjita-com",
            demo: "#",
            status: "Presented at IIIT Kottayam"
        },
        {
            id: "project-2",
            title: "DigitVision: Handwritten Digit Recognition Using CNN",
            category: "ai",
            badge: "Published Research Paper",
            featured: true,
            image: "assets/images/cert_ijrpr_publication.jpg",
            summary: "Deep learning Convolutional Neural Network (CNN) architecture trained for high-accuracy recognition of handwritten numeric digits.",
            problem: "Variations in handwriting styles, stroke thickness, and image noise degrade recognition accuracy in automated optical pipelines.",
            solution: "Constructed a multi-layer Convolutional Neural Network with dropout regularization, max-pooling, and softmax classification.",
            metrics: "Published in IJRPR Journal (Impact Factor: 5.536) • Vol 7 Issue 2",
            architecture: "Raw Digit Canvas ⟷ Preprocessing & Normalization ⟷ CNN Feature Extraction ⟷ Softmax Output",
            tech: ["Python", "TensorFlow / Keras", "CNN", "Deep Learning", "NumPy", "OpenCV"],
            github: "https://github.com/Ranjita-com",
            demo: "#",
            status: "Peer-Reviewed & Published"
        },
        {
            id: "project-3",
            title: "Cognitive Agentic AI Model for Smart Bus Monitoring",
            category: "ai",
            badge: "IC-AEAM 2026 Presented",
            featured: true,
            image: "assets/images/cert_icaem_conference.png",
            summary: "Intelligent agentic IoT vision model for real-time passenger crowd estimation and public transit bus occupancy tracking.",
            problem: "Transit authorities lack real-time automated headcount metrics to optimize bus dispatch frequencies and reduce overcrowding.",
            solution: "Built a cognitive agentic AI vision model deploying automated passenger detection, entry/exit counters, and live occupancy telemetry.",
            metrics: "Presented at IC-AEAM 2026 • AJIET Mangalore (IEEE Student Branch)",
            architecture: "Transit Camera ⟷ Agentic Detection Model ⟷ Telemetry Pipeline ⟷ Fleet Dispatch Dashboard",
            tech: ["Python", "Agentic AI", "Computer Vision", "IoT Telemetry", "Deep Learning"],
            github: "https://github.com/Ranjita-com",
            demo: "#",
            status: "Conference Presented"
        },
        {
            id: "project-4",
            title: "Interactive Web Platforms & Testing Suites",
            category: "cloud",
            badge: "Web & API Engineering",
            featured: false,
            image: "assets/images/cert_infosys_postman.jpg",
            summary: "Full-stack responsive web interfaces engineered with Postman API testing collections, automated validations, and cross-browser resilience.",
            problem: "Manual API verification is slow and error-prone during multi-service frontend-backend integration.",
            solution: "Automated comprehensive Postman test suites and mock servers paired with responsive modern HTML/CSS/JavaScript frontends.",
            metrics: "Infosys Springboard Verified • 100% Test Coverage for Core Endpoints",
            architecture: "Frontend UI ⟷ REST API Endpoints ⟷ Postman Automated Assertion Test Suite",
            tech: ["HTML5", "CSS3", "JavaScript", "Postman", "REST APIs", "Git"],
            github: "https://github.com/Ranjita-com",
            demo: "#",
            status: "Production Ready"
        }
    ],

    certificates: [
        {
            id: "cert-1",
            title: "Linux Training Completion Certificate",
            issuer: "IIT Bombay (Spoken Tutorial & EduPyramids, SINE)",
            category: "engineering",
            date: "26 November 2025",
            validUntil: "Lifetime Credential",
            credentialId: "4046909QWJ",
            image: "assets/images/cert_iitb_linux.jpg",
            verificationUrl: "https://spoken-tutorial.org",
            score: "82.22% (2 Credits)",
            skillsLearned: ["Linux Kernel & Shell", "Bash Scripting", "File System Permissions", "Process Management", "System Utilities"]
        },
        {
            id: "cert-2",
            title: "Android App using Kotlin Training",
            issuer: "IIT Bombay (Spoken Tutorial & EduPyramids, SINE)",
            category: "fullstack",
            date: "12 May 2025",
            validUntil: "Lifetime Credential",
            credentialId: "4046909X5D",
            image: "assets/images/cert_iitb_kotlin.jpg",
            verificationUrl: "https://spoken-tutorial.org",
            score: "85.00% (2 Credits)",
            skillsLearned: ["Kotlin Programming", "Android Studio", "Activity & Intent Lifecycle", "Layouts & XML", "Mobile UX"]
        },
        {
            id: "cert-3",
            title: "Java Training Completion Certificate",
            issuer: "IIT Bombay (Spoken Tutorial Project)",
            category: "fullstack",
            date: "13 December 2024",
            validUntil: "Lifetime Credential",
            credentialId: "40469094BK",
            image: "assets/images/cert_iitb_java.jpg",
            verificationUrl: "https://spoken-tutorial.org",
            score: "4 Credits Awarded",
            skillsLearned: ["Object-Oriented Programming", "Java Core Syntax", "Class Hierarchies & Interfaces", "Exception Handling"]
        },
        {
            id: "cert-4",
            title: "Postman and API Testing",
            issuer: "Infosys Springboard / Infosys Limited",
            category: "cloud",
            date: "13 May 2025",
            validUntil: "Lifetime Credential",
            credentialId: "INFOSYS-API-MAY2025",
            image: "assets/images/cert_infosys_postman.jpg",
            verificationUrl: "https://verify.onwingspan.com",
            score: "Course Completion Certificate",
            skillsLearned: ["REST API Testing", "Postman Collections & Environments", "Assertion Scripting", "API Automation"]
        },
        {
            id: "cert-5",
            title: "Cybersecurity Course Completion",
            issuer: "Infosys Springboard / Infosys Limited",
            category: "engineering",
            date: "4 May 2025",
            validUntil: "Lifetime Credential",
            credentialId: "INFOSYS-CYBER-MAY2025",
            image: "assets/images/cert_infosys_cybersecurity.jpg",
            verificationUrl: "https://verify.onwingspan.com",
            score: "Course Completion Certificate",
            skillsLearned: ["Cyber Threat Awareness", "Network Defense", "Access Control & Cryptography", "Security Hygiene"]
        },
        {
            id: "cert-6",
            title: "Prompt Engineering Specialization",
            issuer: "Digital Academy & Infosys Springboard",
            category: "ai",
            date: "28 March 2026",
            validUntil: "Lifetime Credential",
            credentialId: "INFOSYS-PROMPT-MAR2026",
            image: "assets/images/cert_infosys_prompt_eng.jpg",
            verificationUrl: "https://validate.onwingspan.com",
            score: "Specialization Certificate",
            skillsLearned: ["Prompt Design Principles", "Generative AI Workflows", "Few-Shot Prompting", "LLM Optimization"]
        },
        {
            id: "cert-7",
            title: "Freedom with AI Masterclass",
            issuer: "Freedom with AI (Avinash Mada, Founder) • ISO 9001:2015",
            category: "ai",
            date: "09 August 2025",
            validUntil: "Lifetime Credential",
            credentialId: "FWAI-MASTERCLASS-RANJITA",
            image: "assets/images/cert_freedom_ai.jpg",
            verificationUrl: "https://freedomwithai.com",
            score: "Certificate of Completion (ISO 9001:2015)",
            skillsLearned: ["Generative AI & LLM Tools", "AI Workflow Automation", "Prompt Engineering & Productivity", "AI Application Building", "Enterprise AI Integration"]
        },
        {
            id: "cert-8",
            title: "Microsoft Certified: Azure Fundamentals",
            issuer: "Microsoft (Signed by Satya Nadella, CEO)",
            category: "cloud",
            date: "May 31, 2025",
            validUntil: "Active Credential (Verified)",
            credentialId: "24rx-XMSn",
            image: "assets/images/cert_azure.jpg",
            verificationUrl: "https://verify.certiport.com",
            score: "Microsoft Certified Professional",
            skillsLearned: ["Cloud Concepts & Azure Architecture", "Azure Compute, Networking & Storage", "Azure Security, Privacy & Compliance", "Identity Management (Entra ID)", "Cost Management & SLAs"]
        },
        {
            id: "cert-9",
            title: "Rapid Development for AI Services (CERDAI1IN)",
            issuer: "IBM Developer Skills Network & Etrain Education",
            category: "ai",
            date: "19 December 2024",
            validUntil: "Lifetime Credential",
            credentialId: "25ae5a351e2c42c791c3cc11d0f6e334",
            image: "assets/images/cert_ibm.jpg",
            verificationUrl: "https://courses.etrain.skillsnetwork.site/certificates/25ae5a351e2c42c791c3cc11d0f6e334",
            score: "Passed with Passing Grade (IBMCE)",
            skillsLearned: ["Rapid AI Services Development", "IBM Developer Skills Network", "Cloud AI & ML APIs", "IBM Career Education (IBMCE)", "AI Application Deployment"]
        },
        {
            id: "cert-10",
            title: "AI Dashboards using Microsoft Power BI",
            issuer: "Skill Nation (Mr. Jatan Shah, Microsoft Certified Trainer)",
            category: "ai",
            date: "26th & 27th July, 2025",
            validUntil: "Lifetime Credential",
            credentialId: "SN-PBI-2025-RANJITA",
            image: "assets/images/cert_powerbi.jpg",
            verificationUrl: "https://www.jatanshah.com",
            score: "Certified Workshop Completion",
            skillsLearned: ["Power BI Desktop & Service", "DAX Formulas & Calculations", "AI-Powered Dashboards", "Data Cleaning & Transformation", "Executive Analytics"]
        },
        {
            id: "cert-11",
            title: "Web Development Internship Completion Certificate",
            issuer: "InternPe (AICTE Approved & ISO 9001:2015)",
            category: "fullstack",
            date: "24 November 2025",
            validUntil: "Lifetime Credential",
            credentialId: "IPI#67626",
            image: "assets/images/internship_internpe.jpg",
            verificationUrl: "https://www.internpe.in",
            score: "Sincere & Dedicated with Excellent Job Knowledge",
            skillsLearned: ["Frontend Web Development", "Semantic HTML5 & Modern CSS3", "JavaScript Interactive UI", "Responsive Design", "Cross-Browser Compatibility"]
        },
        {
            id: "cert-12",
            title: "Introduction to Cybersecurity Awareness",
            issuer: "HP LIFE | HP Foundation (Stephanie Bormann, Deputy Director)",
            category: "engineering",
            date: "30 April 2025",
            validUntil: "Lifetime Credential",
            credentialId: "c34881d9-2472-4e17-9640-4a6ccf1f91d4",
            image: "assets/images/cert_hp_cybersecurity.jpg",
            verificationUrl: "https://www.life-global.org",
            score: "HP LIFE Course Completion",
            skillsLearned: ["Cybersecurity Threats & Defense", "Online Data & Information Security", "Network Protection", "Security Hygiene & Prevention Best Practices"]
        },
        {
            id: "cert-13",
            title: "Cyber Security Internship Certificate",
            issuer: "Codec Technologies Pvt. Ltd. (National Internship Portal / AICTE Approved)",
            category: "engineering",
            date: "01 November 2026",
            validUntil: "Lifetime Credential",
            credentialId: "CORPORATE6759d549ce59e1733940553",
            image: "assets/images/internship_codec.jpg",
            verificationUrl: "https://internship.aicte-india.org",
            score: "2-Month AICTE & ICAC Approved Program (Google for Education Partner)",
            skillsLearned: ["Cybersecurity & Threat Analysis", "Network Defense & Security Protocols", "Vulnerability Assessment", "System Security Hygiene"]
        }
    ],

    achievements: [
        {
            title: "Paper Presentation at 7th IEEE ICITIIT'26 Conference",
            organization: "IIIT Kottayam (CSE Dept.) & IEEE Kerala Section",
            date: "27-28 March 2026",
            badge: "🏆 IEEE International Conference",
            desc: "Presented research paper 'Design and Implementation of a Secure Online Voting System Using Haar Cascade Based Facial Biometric Authentication' (Cert ID: IIITK/ICITIIT26/PROL/45).",
            image: "assets/images/cert_iiitk_conference.jpg"
        },
        {
            title: "Research Publication in International Journal (IJRPR)",
            organization: "International Journal of Research Publication and Reviews (Impact Factor 5.536)",
            date: "February 2026",
            badge: "📄 Peer-Reviewed Journal",
            desc: "Published research paper entitled 'DigitVision: Handwritten Digit Recognition Using CNN' in Volume 7, Issue 2 (ISSN: 2582-7421, Certificate Sr. No: IJRPR 78482).",
            image: "assets/images/cert_ijrpr_publication.jpg"
        },
        {
            title: "National Level 24-Hour Hackathon — SOLVE-A-THON 1.0",
            organization: "Department of MCA, Srinivas Institute of Technology, Valachil, Mangaluru",
            date: "20th – 21st February 2026",
            badge: "⚡ 24-Hour National Hackathon",
            desc: "Awarded Certificate of Participation representing Yenepoya Institute of Technology in the intense 24-Hour National Level Hackathon 'SOLVE-A-THON 1.0' organized by Srinivas Institute of Technology, Mangaluru.",
            image: "assets/images/award_solveathon.png"
        },
        {
            title: "Paper Presentation at IC-AEAM 2026 International Conference",
            organization: "A.J. Institute of Engineering & Technology, Mangalore (IEEE Student Branch / ISTE)",
            date: "8-9 May 2026",
            badge: "🌐 International Conference",
            desc: "Presented co-authored paper 'Cognitive Agentic AI Model for Smart Bus Monitoring and Passenger Count' at the International Conference IC-AEAM 2026.",
            image: "assets/images/cert_icaem_conference.png"
        }
    ],

    education: {
        institution: "Yenepoya Institute of Technology, Moodbidri",
        degree: "Bachelor of Engineering (B.E.) in Computer Science & Engineering",
        graduation: "Class of 2026",
        gpa: "8.8 / 10.0 CGPA",
        relevantCourses: [
            "Data Structures & Algorithms",
            "Machine Learning & Deep Learning",
            "Operating Systems & Linux",
            "Database Management Systems",
            "Computer Networks & Security",
            "Mobile Application Development (Android/Kotlin)",
            "Object-Oriented Programming (Java)",
            "Web Technologies & API Testing"
        ]
    }
};

// Global active portfolio data - initialized from localStorage if available
let portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));

// Check and load stored personalized data
function loadSavedPortfolioData() {
    try {
        const saved = localStorage.getItem('portfolio-custom-data');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Ignore placeholder emails or dummy values from previous test sessions
            if (parsed.personal) {
                if (parsed.personal.email && parsed.personal.email.includes('example.com')) {
                    delete parsed.personal.email;
                }
                if (parsed.personal.phone && parsed.personal.phone.includes('98765')) {
                    delete parsed.personal.phone;
                }
                if (parsed.personal.location && !parsed.personal.location.includes('Pune')) {
                    delete parsed.personal.location;
                }
                delete parsed.personal.metrics;
            }
            portfolioData.personal = { ...portfolioData.personal, ...parsed.personal };
        }
    } catch (e) {
        console.warn("Could not load customized portfolio data:", e);
    }
}

// Initial load
loadSavedPortfolioData();
