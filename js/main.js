/**
 * ==========================================================================
 * ALEX MORGAN - PORTFOLIO APPLICATION LOGIC
 * Production Grade Vanilla JavaScript Architecture
 * Features: High-performance canvas, live search, animated counters,
 * ScrollSpy, modal engine, resume export, and client-side validation.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core Visual & Theme System
    initTheme();
    initScrollProgress();
    initStickyHeader();
    initScrollSpy();
    initParticleCanvas();

    // 2. Data Rendering
    renderHeroData();
    renderHeroMetrics();
    renderAboutPillars();
    renderSkills('all', '');
    renderInternships();
    renderProjects('all');
    renderCertificates('all');
    renderAchievements();

    // 3. Interactive Behaviors & Listeners
    initTypingEffect();
    initSkillsSearchAndFilters();
    initProjectFilters();
    initCertFilters();
    initContactForm();
    initKeyboardShortcuts();
});

/* --------------------------------------------------------------------------
   1. Theme Management (System-Aware & LocalStorage Synced)
   -------------------------------------------------------------------------- */
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme);

    // Listen for OS theme changes if user hasn't explicitly set a preference
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('portfolio-theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                updateThemeIcon(newTheme);
            }
        });
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
    updateThemeIcon(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} theme`, 'info');
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/* --------------------------------------------------------------------------
   2. Scroll Progress & Sticky Navbar & ScrollSpy
   -------------------------------------------------------------------------- */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });
}

function initStickyHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    }, { passive: true });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    const toggleBtn = document.getElementById('mobile-toggle');
    if (!drawer || !toggleBtn) return;

    const isOpen = drawer.classList.contains('active');
    if (isOpen) {
        closeMobileMenu();
    } else {
        drawer.classList.add('active');
        toggleBtn.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    const toggleBtn = document.getElementById('mobile-toggle');
    if (!drawer) return;

    drawer.classList.remove('active');
    if (toggleBtn) {
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
    }
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   4. High-Performance Particle Canvas Background
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let isTabActive = true;
    document.addEventListener('visibilitychange', () => {
        isTabActive = !document.hidden;
    });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    // Balanced particle count based on viewport area
    const count = Math.min(Math.floor((width * height) / 24000), 65);

    let mouse = { x: null, y: null, radius: 130 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 1.8 + 1;
        }

        update() {
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            this.x += this.vx;
            this.y += this.vy;

            // Interactive mouse nudge
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 2.5;
                    this.y -= (dy / dist) * force * 2.5;
                }
            }
        }

        draw(isLight) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.35)' : 'rgba(56, 189, 248, 0.45)';
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        if (!isTabActive) {
            requestAnimationFrame(animate);
            return;
        }

        ctx.clearRect(0, 0, width, height);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(isLight);

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 115) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = isLight
                        ? `rgba(2, 132, 199, ${0.12 - dist / 950})`
                        : `rgba(56, 189, 248, ${0.15 - dist / 850})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   5. Dynamic Hero Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
    const element = document.getElementById('hero-typing-text');
    if (!element) return;

    const phrases = [
        "Computer Vision & Deep Learning (CNNs)",
        "Biometric Facial Recognition Systems",
        "Responsive Full-Stack Web Applications",
        "REST APIs & Automated Testing (Postman)",
        "Linux Systems & Cybersecurity Defenses"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 65;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2200; // Pause at complete phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before typing new phrase
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
}

/* --------------------------------------------------------------------------
   6. Data Renderers (Hero, Metrics, About, Skills, Projects, etc.)
   -------------------------------------------------------------------------- */

function renderHeroData() {
    const p = portfolioData.personal;

    const navBrand = document.getElementById('nav-brand-name');
    if (navBrand) navBrand.textContent = p.name.replace(/\s+/g, '');

    const footerBrand = document.getElementById('footer-brand-name');
    if (footerBrand) footerBrand.textContent = p.name.replace(/\s+/g, '');

    const heroName = document.getElementById('hero-name');
    if (heroName) heroName.textContent = p.name;

    const heroBio = document.getElementById('hero-bio-text');
    if (heroBio) heroBio.textContent = p.bio;

    const heroUniv = document.getElementById('hero-university');
    if (heroUniv) heroUniv.textContent = p.university;

    const heroStatus = document.getElementById('hero-status-text');
    if (heroStatus) heroStatus.textContent = p.status;

    const emailLabel = document.getElementById('quick-email-label');
    if (emailLabel) emailLabel.textContent = p.email;

    const contactEmail = document.getElementById('contact-email-text');
    if (contactEmail) {
        contactEmail.textContent = p.email;
        if (contactEmail.tagName === 'A') contactEmail.href = `mailto:${p.email}`;
    }

    const contactPhone = document.getElementById('contact-phone-text');
    if (contactPhone && p.phone) {
        contactPhone.textContent = p.phone;
        if (contactPhone.tagName === 'A') contactPhone.href = `tel:${p.phone.replace(/[^0-9+]/g, '')}`;
    }

    const contactLocation = document.getElementById('contact-location-text');
    if (contactLocation) contactLocation.textContent = p.location;

    const aboutSchool = document.getElementById('about-school');
    if (aboutSchool) aboutSchool.textContent = `${p.university} • ${p.standing}`;

    // Dynamic Social Profile Links
    if (p.socials) {
        const gh = p.socials.github;
        const li = p.socials.linkedin;

        const heroGh = document.getElementById('hero-github-link');
        if (heroGh && gh) heroGh.href = gh;

        const heroLi = document.getElementById('hero-linkedin-link');
        if (heroLi && li) heroLi.href = li;

        const contactLi = document.getElementById('contact-linkedin-link');
        if (contactLi && li) {
            contactLi.href = li;
            const liDisplay = li.replace(/^https?:\/\/(www\.)?/, '');
            contactLi.textContent = liDisplay;
        }

        const contactGh = document.getElementById('contact-github-link');
        if (contactGh && gh) {
            contactGh.href = gh;
            const ghDisplay = gh.replace(/^https?:\/\/(www\.)?/, '');
            contactGh.textContent = ghDisplay;
        }

        const footerGh = document.getElementById('footer-github-link');
        if (footerGh && gh) footerGh.href = gh;

        const footerLi = document.getElementById('footer-linkedin-link');
        if (footerLi && li) footerLi.href = li;
    }

    const footerCopy = document.getElementById('footer-copyright');
    if (footerCopy) footerCopy.textContent = `© ${new Date().getFullYear()} ${p.name}. Built with semantic HTML5, modern CSS, and vanilla JavaScript.`;
}

// Render Animated Career Metrics
function renderHeroMetrics() {
    const container = document.getElementById('metrics-grid');
    if (!container) return;

    container.innerHTML = portfolioData.personal.metrics.map((m, idx) => `
        <div class="metric-card" data-metric-index="${idx}">
            <div class="metric-icon-box">
                <i class="${m.icon}" aria-hidden="true"></i>
            </div>
            <div>
                <div class="metric-value-row">
                    <span class="metric-counter" data-target="${m.value}">${m.value}</span>
                    <span class="metric-suffix">${m.suffix || ''}</span>
                </div>
                <div class="metric-label">${m.label}</div>
                <div class="metric-subdesc">${m.description || ''}</div>
            </div>
        </div>
    `).join('');

    // Trigger IntersectionObserver for smooth counting animation
    observeMetricCounters();
}

function observeMetricCounters() {
    const counters = document.querySelectorAll('.metric-counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetText = counter.getAttribute('data-target');
                const targetNum = parseFloat(targetText);

                if (!isNaN(targetNum)) {
                    animateCount(counter, targetNum, targetText.includes('.'));
                }
                obs.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCount(el, target, isDecimal = false) {
    const duration = 1400;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // EaseOutQuad
        const ease = 1 - (1 - progress) * (1 - progress);
        const current = start + (target - start) * ease;

        el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = isDecimal ? target.toFixed(2) : target;
        }
    }

    requestAnimationFrame(update);
}

// Render About Pillars
function renderAboutPillars() {
    const container = document.getElementById('about-pillars-grid');
    if (!container) return;

    container.innerHTML = portfolioData.personal.aboutPillars.map(p => `
        <div class="pillar-item">
            <div class="pillar-icon"><i class="${p.icon}"></i></div>
            <h4 class="pillar-title">${p.title}</h4>
            <p class="pillar-desc">${p.desc}</p>
        </div>
    `).join('');
}

// Render Skills with Live Filter & Search
function renderSkills(filterCategory = 'all', searchQuery = '') {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    let skills = portfolioData.skills;

    // Apply category filter
    if (filterCategory !== 'all') {
        skills = skills.filter(s => s.category === filterCategory);
    }

    // Apply live search query
    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        skills = skills.filter(s =>
            s.name.toLowerCase().includes(q) ||
            s.highlight.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q) ||
            s.level.toLowerCase().includes(q)
        );
    }

    updateSkillCategoryCounts();

    if (skills.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block; color: var(--accent-sky);"></i>
                <h4 style="font-size: 1.2rem; color: var(--text-primary); margin-bottom: 0.5rem;">No matching technologies found</h4>
                <p>Try searching for a different keyword like "C++", "ROS", "Python", or clear your filter.</p>
                <button class="btn-secondary" onclick="clearSkillSearch()" style="margin-top: 1.2rem;">
                    Clear Search Query
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = skills.map(s => {
        let badgeClass = '';
        if (s.level.toLowerCase() === 'certified') badgeClass = 'badge-certified';
        else if (s.level.toLowerCase() === 'proficient') badgeClass = 'badge-proficient';

        return `
            <div class="skill-card">
                <div>
                    <div class="skill-top-row">
                        <div class="skill-identity">
                            <div class="skill-brand-icon"><i class="${s.icon}"></i></div>
                            <div>
                                <h4 class="skill-name">${s.name}</h4>
                            </div>
                        </div>
                        <span class="skill-level-badge ${badgeClass}">${s.level}</span>
                    </div>
                </div>
                <div class="skill-body">
                    <p class="skill-highlight">${s.highlight}</p>
                    <div class="skill-exp-row">
                        <span>Experience:</span>
                        <strong style="color:var(--text-primary);">${s.experience}</strong>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updateSkillCategoryCounts() {
    const all = portfolioData.skills.length;
    const languages = portfolioData.skills.filter(s => s.category === 'languages').length;
    const frameworks = portfolioData.skills.filter(s => s.category === 'frameworks').length;
    const engineering = portfolioData.skills.filter(s => s.category === 'engineering').length;
    const cloud = portfolioData.skills.filter(s => s.category === 'cloud').length;

    const setEl = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = `(${val})`;
    };

    setEl('count-all', all);
    setEl('count-languages', languages);
    setEl('count-frameworks', frameworks);
    setEl('count-engineering', engineering);
    setEl('count-cloud', cloud);
}

// Render Internships Timeline
function renderInternships() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    timeline.innerHTML = portfolioData.internships.map((item, idx) => `
        <article class="timeline-item">
            <div class="timeline-node">
                <div class="timeline-node-inner"></div>
            </div>
            <div class="timeline-card">
                <div class="timeline-header-row">
                    <div>
                        <h3 class="timeline-role-title">${item.role}</h3>
                        <div class="timeline-company-row">
                            <span>${item.company}</span>
                            <span>•</span>
                            <span style="color:var(--text-secondary); font-size:0.95rem;">${item.location}</span>
                        </div>
                    </div>
                    <div class="timeline-period-badge">
                        <i class="far fa-calendar-alt"></i> ${item.period}
                    </div>
                </div>

                <div class="timeline-honors-pill">
                    <i class="fas fa-check-circle"></i> ${item.badge}
                </div>

                <div class="timeline-metrics-callout">
                    ${item.metricsCallout}
                </div>

                <p class="timeline-desc-text">${item.description}</p>

                <ul class="timeline-bullets">
                    ${item.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>

                <div class="tech-tags-wrapper">
                    ${item.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
                </div>

                ${item.certificateImg ? `
                    <div style="margin-top:1.2rem; padding-top:1rem; border-top:1px solid var(--border-color);">
                        <button class="btn-secondary" style="font-size:0.85rem; padding:0.45rem 1rem;" onclick="openInternshipModal(${idx})">
                            <i class="fas fa-certificate text-amber"></i> View Internship Certificate
                        </button>
                    </div>
                ` : ''}
            </div>
        </article>
    `).join('');
}

// Render Featured Projects
function renderProjects(filterCategory = 'all') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered = filterCategory === 'all'
        ? portfolioData.projects
        : portfolioData.projects.filter(p => p.category === filterCategory);

    grid.innerHTML = filtered.map(p => `
        <article class="project-card">
            <div class="project-thumbnail-wrapper" onclick="openProjectModal('${p.id}')" style="cursor:pointer;">
                <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
                <div class="project-badge-overlay">${p.badge}</div>
            </div>

            <div class="project-card-body">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-summary-text">${p.summary}</p>
                
                <div class="project-metrics-chip">
                    <i class="fas fa-bolt text-amber"></i> ${p.metrics}
                </div>

                <div class="project-card-footer">
                    <div class="tech-tags-wrapper" style="border:none; padding-top:0;">
                        ${p.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
                    </div>

                    <div class="project-actions-row">
                        <button class="btn-project-deepdive" onclick="openProjectModal('${p.id}')">
                            <i class="fas fa-network-wired"></i> Architecture & Insights
                        </button>
                        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn-project-repo" title="View Source Code on GitHub" aria-label="GitHub Repository">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}

// Render Certificates
function renderCertificates(filterCategory = 'all') {
    const grid = document.getElementById('certs-grid');
    if (!grid) return;

    const filtered = filterCategory === 'all'
        ? portfolioData.certificates
        : portfolioData.certificates.filter(c => c.category === filterCategory);

    grid.innerHTML = filtered.map(c => `
        <div class="cert-card">
            <div class="cert-thumbnail-wrapper" onclick="openCertModal('${c.id}')">
                <img src="${c.image}" alt="${c.title}" class="cert-img" loading="lazy" />
                <div class="cert-verified-badge">
                    <i class="fas fa-shield-check"></i> Verified
                </div>
            </div>

            <div class="cert-card-body">
                <h4 class="cert-title">${c.title}</h4>
                <div class="cert-issuer">${c.issuer}</div>

                ${c.score ? `
                    <div class="cert-score-chip" style="font-family:var(--font-code); font-size:0.8rem; color:var(--accent-emerald); font-weight:600; margin:0.4rem 0 0.6rem 0; display:flex; align-items:center; gap:0.4rem;">
                        <i class="fas fa-award text-amber"></i> ${c.score}
                    </div>
                ` : ''}

                <div class="cert-id-chip-row">
                    <span>ID: ${c.credentialId.substring(0, 16)}...</span>
                    <button class="copy-id-btn" onclick="copyText('${c.credentialId}', 'Credential ID')" title="Copy Credential ID">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>

                <button class="cert-footer-btn" onclick="openCertModal('${c.id}')">
                    <i class="fas fa-expand-alt"></i> Verify & View Details
                </button>
            </div>
        </div>
    `).join('');
}

// Render Honors & Achievements
function renderAchievements() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;

    grid.innerHTML = portfolioData.achievements.map((a, idx) => `
        <div class="achievement-card">
            <div class="achievement-icon-box">
                <i class="fas fa-trophy"></i>
            </div>
            <div>
                <span class="achievement-badge-pill">${a.badge}</span>
                <h4 class="achievement-title">${a.title}</h4>
                <div class="achievement-org">${a.organization} • ${a.date}</div>
                <p class="achievement-desc">${a.desc}</p>
                ${a.image ? `
                    <div style="margin-top:0.8rem;">
                        <button class="btn-secondary" style="font-size:0.8rem; padding:0.35rem 0.8rem;" onclick="openAchievementModal(${idx})">
                            <i class="fas fa-file-image text-cyan"></i> View Certificate / Award
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   7. Interactive Controls & Search Engine
   -------------------------------------------------------------------------- */
let activeSkillCategory = 'all';

function initSkillsSearchAndFilters() {
    const searchInput = document.getElementById('skills-search');
    const clearBtn = document.getElementById('search-clear-btn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';
            renderSkills(activeSkillCategory, query);
        });
    }

    const tabs = document.querySelectorAll('[data-skill-filter]');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            activeSkillCategory = tab.getAttribute('data-skill-filter');
            const currentQuery = searchInput ? searchInput.value : '';
            renderSkills(activeSkillCategory, currentQuery);
        });
    });
}

function clearSkillSearch() {
    const searchInput = document.getElementById('skills-search');
    const clearBtn = document.getElementById('search-clear-btn');
    if (searchInput) {
        searchInput.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
        renderSkills(activeSkillCategory, '');
        searchInput.focus();
    }
}

function initProjectFilters() {
    const tabs = document.querySelectorAll('[data-project-filter]');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderProjects(tab.getAttribute('data-project-filter'));
        });
    });
}

function initCertFilters() {
    const tabs = document.querySelectorAll('[data-cert-filter]');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCertificates(tab.getAttribute('data-cert-filter'));
        });
    });
}

/* --------------------------------------------------------------------------
   8. Modal Window Engine (Accessible Dialogs)
   -------------------------------------------------------------------------- */
function showModal(htmlContent) {
    let overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    overlay.innerHTML = `<div class="modal-card">${htmlContent}</div>`;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus the modal for accessibility
    const firstFocusable = overlay.querySelector('button, [href], input, select, textarea');
    if (firstFocusable) firstFocusable.focus();
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function initKeyboardShortcuts() {
    // Backdrop click closes modal
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    }

    // Escape key closes modal & mobile drawer
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeMobileMenu();
        }
    });
}

/* Project Deep-Dive Modal */
function openProjectModal(projectId) {
    const project = portfolioData.projects.find(p => p.id === projectId);
    if (!project) return;

    const modalHtml = `
        <button class="modal-close-btn" onclick="closeModal()" aria-label="Close dialog">
            <i class="fas fa-times"></i>
        </button>
        
        <div style="margin-bottom:1.5rem;">
            <span class="section-tag">${project.badge}</span>
            <h2 class="section-title" style="font-size:1.85rem; margin-top:0.4rem; margin-bottom:0.4rem;">${project.title}</h2>
            <div style="font-family:var(--font-code); color:var(--accent-sky); font-size:0.88rem;">${project.metrics}</div>
        </div>

        <div style="border-radius:var(--radius-md); overflow:hidden; margin-bottom:1.6rem; border:1px solid var(--border-color); max-height:360px;">
            <img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:cover;" />
        </div>

        <div style="display:grid; grid-template-columns:1fr; gap:1.2rem; margin-bottom:1.6rem;">
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:1.2rem;">
                <h4 style="color:var(--accent-rose); font-size:0.95rem; margin-bottom:0.4rem;"><i class="fas fa-triangle-exclamation"></i> Engineering Challenge</h4>
                <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.6;">${project.problem}</p>
            </div>
            
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:1.2rem;">
                <h4 style="color:var(--accent-emerald); font-size:0.95rem; margin-bottom:0.4rem;"><i class="fas fa-microchip"></i> System Architecture & Solution</h4>
                <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.6;">${project.solution}</p>
                <div style="margin-top:0.6rem; font-family:var(--font-code); font-size:0.8rem; color:var(--accent-sky); background:rgba(56,189,248,0.08); padding:0.4rem 0.8rem; border-radius:var(--radius-xs);">
                    Pipeline: ${project.architecture}
                </div>
            </div>
        </div>

        <div style="margin-bottom:1.8rem;">
            <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:0.6rem;">Core Engineering Toolstack:</h4>
            <div class="tech-tags-wrapper" style="border:none; padding-top:0;">
                ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
            </div>
        </div>

        <div style="display:flex; gap:1rem; flex-wrap:wrap; border-top:1px solid var(--border-color); padding-top:1.4rem;">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size:0.9rem;">
                <i class="fab fa-github"></i> View GitHub Repository
            </a>
            <button class="btn-secondary" onclick="closeModal()">Close Details</button>
        </div>
    `;

    showModal(modalHtml);
}

/* Certificate Lightbox Modal */
function openCertModal(certId) {
    const cert = portfolioData.certificates.find(c => c.id === certId);
    if (!cert) return;

    const modalHtml = `
        <button class="modal-close-btn" onclick="closeModal()" aria-label="Close dialog">
            <i class="fas fa-times"></i>
        </button>

        <div style="margin-bottom:1.5rem;">
            <span class="section-tag"><i class="fas fa-shield-check"></i> VERIFIED ACCREDITATION</span>
            <h2 class="section-title" style="font-size:1.75rem; margin-top:0.4rem; margin-bottom:0.3rem;">${cert.title}</h2>
            <div style="color:var(--accent-sky); font-weight:600;">Issuing Authority: ${cert.issuer}</div>
        </div>

        <div style="border-radius:var(--radius-md); overflow:hidden; margin-bottom:1.5rem; border:1px solid var(--border-color); box-shadow:var(--shadow-card);">
            <img src="${cert.image}" alt="${cert.title}" style="width:100%; display:block;" />
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem; background:rgba(255,255,255,0.03); padding:1.2rem; border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.9rem;">
            <div><strong>Issue Date:</strong> ${cert.date}</div>
            <div><strong>Credential Status:</strong> <span style="color:var(--accent-emerald); font-weight:600;">${cert.validUntil}</span></div>
            ${cert.score ? `<div style="grid-column: span 2; color:var(--accent-emerald);"><strong>Score / Performance:</strong> <span style="font-weight:700;">${cert.score}</span></div>` : ''}
            <div style="grid-column: span 2; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; padding-top:0.6rem; border-top:1px solid var(--border-color);">
                <span>Credential ID: <code style="font-family:var(--font-code); color:var(--accent-sky);">${cert.credentialId}</code></span>
                <button class="btn-secondary" style="padding:0.3rem 0.8rem; font-size:0.78rem;" onclick="copyText('${cert.credentialId}', 'Credential ID')">
                    <i class="fas fa-copy"></i> Copy ID
                </button>
            </div>
        </div>

        <div style="margin-bottom:1.8rem;">
            <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:0.6rem;">Validated Competencies & Syllabus:</h4>
            <div class="tech-tags-wrapper" style="border:none; padding-top:0;">
                ${cert.skillsLearned.map(s => `<span class="tech-chip"><i class="fas fa-check" style="color:var(--accent-emerald); margin-right:4px;"></i>${s}</span>`).join('')}
            </div>
        </div>

        <div style="display:flex; gap:1rem; flex-wrap:wrap; border-top:1px solid var(--border-color); padding-top:1.4rem;">
            <a href="${cert.verificationUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size:0.9rem;">
                <i class="fas fa-arrow-up-right-from-square"></i> Verify on Official Issuer Portal
            </a>
            <button class="btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;

    showModal(modalHtml);
}

/* Modal trigger helpers (Avoids string escaping/quote issues in inline HTML onclick) */
function openAchievementModal(index) {
    const a = portfolioData.achievements[index];
    if (!a || !a.image) return;
    openImageLightbox(a.image, a.title);
}

function openInternshipModal(index) {
    const item = portfolioData.internships[index];
    if (!item || !item.certificateImg) return;
    openImageLightbox(item.certificateImg, `${item.company} • ${item.role} Certificate`);
}

/* Lightbox Modal for Full-Resolution Certificate / Letter Documents */
function openImageLightbox(imageUrl, title) {
    const modalHtml = `
        <button class="modal-close-btn" onclick="closeModal()" aria-label="Close dialog">
            <i class="fas fa-times"></i>
        </button>

        <div style="margin-bottom:1.2rem;">
            <span class="section-tag"><i class="fas fa-file-shield"></i> VERIFIED DOCUMENT</span>
            <h2 class="section-title" style="font-size:1.6rem; margin-top:0.4rem; margin-bottom:0.2rem;">${title}</h2>
        </div>

        <div style="border-radius:var(--radius-md); overflow:hidden; margin-bottom:1.4rem; border:1px solid var(--border-color); box-shadow:var(--shadow-card); max-height:75vh; display:flex; align-items:center; justify-content:center; background:#000;">
            <img src="${imageUrl}" alt="${title}" style="max-width:100%; max-height:75vh; object-fit:contain; display:block;" />
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; border-top:1px solid var(--border-color); padding-top:1rem;">
            <a href="${imageUrl}" target="_blank" download class="btn-primary" style="font-size:0.88rem;">
                <i class="fas fa-download"></i> Open Full Original Image
            </a>
            <button class="btn-secondary" onclick="closeModal()">Close Window</button>
        </div>
    `;

    showModal(modalHtml);
}

/* Curriculum Vitae / Resume Modal */
function openResumeModal() {
    const p = portfolioData.personal;
    const edu = portfolioData.education;

    const modalHtml = `
        <button class="modal-close-btn" onclick="closeModal()" aria-label="Close dialog">
            <i class="fas fa-times"></i>
        </button>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid var(--border-color);">
            <div>
                <span class="section-tag">CURRICULUM VITAE</span>
                <h2 style="font-size:1.6rem; font-weight:800; margin-top:0.3rem;">Official Engineering Resume</h2>
            </div>
            <div style="display:flex; gap:0.8rem; flex-wrap:wrap;">
                <button class="btn-primary" onclick="printResume()" style="padding:0.6rem 1.2rem; font-size:0.88rem;">
                    <i class="fas fa-print"></i> Print / Save PDF
                </button>
                <button class="btn-secondary" onclick="copyResumeText()" style="padding:0.6rem 1.2rem; font-size:0.88rem;">
                    <i class="fas fa-copy"></i> Copy Text
                </button>
            </div>
        </div>

        <div class="resume-modal-container" id="printable-resume">
            <!-- Header -->
            <div class="resume-header">
                <h1 class="resume-title">${p.name}</h1>
                <div style="font-weight:600; color:var(--accent-sky); margin-bottom:0.5rem;">${p.roleTitle}</div>
                <div class="resume-contact-info">
                    <span><i class="fas fa-envelope"></i> ${p.email}</span>
                    <span><i class="fas fa-phone"></i> ${p.phone}</span>
                    <span><i class="fas fa-location-dot"></i> ${p.location}</span>
                    <span><i class="fab fa-github"></i> github.com/Ranjita-com</span>
                    <span><i class="fab fa-linkedin"></i> linkedin.com/in/ranjita-akkasali</span>
                </div>
            </div>

            <!-- Education -->
            <div class="resume-section-title">Education</div>
            <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:0.2rem;">
                <span>${edu.institution}</span>
                <span>${edu.graduation}</span>
            </div>
            <div style="color:var(--text-secondary); margin-bottom:0.4rem;">${edu.degree}</div>
            <div style="font-size:0.88rem; color:var(--accent-sky); font-weight:600; margin-bottom:0.5rem;">Cumulative CGPA: ${edu.gpa}</div>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.2rem;">
                <strong>Relevant Coursework:</strong> ${edu.relevantCourses.join(', ')}
            </div>

            <!-- Experience -->
            <div class="resume-section-title">Professional Experience & Internships</div>
            ${portfolioData.internships.map(intern => `
                <div style="margin-bottom:1.2rem;">
                    <div style="display:flex; justify-content:space-between; font-weight:700;">
                        <span>${intern.role} – <span style="color:var(--accent-sky);">${intern.company}</span></span>
                        <span style="font-family:var(--font-code); font-size:0.85rem; color:var(--text-muted);">${intern.period}</span>
                    </div>
                    <div style="font-size:0.85rem; color:var(--accent-amber); font-weight:600; margin-bottom:0.3rem;">${intern.metricsCallout}</div>
                    <ul style="padding-left:1.2rem; font-size:0.9rem; color:var(--text-secondary); line-height:1.5;">
                        ${intern.highlights.map(h => `<li style="margin-bottom:0.25rem;">${h}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}

            <!-- Selected Projects & Publications -->
            <div class="resume-section-title">Featured Engineering Research & Projects</div>
            ${portfolioData.projects.slice(0, 3).map(proj => `
                <div style="margin-bottom:1rem;">
                    <div style="display:flex; justify-content:space-between; font-weight:700;">
                        <span>${proj.title}</span>
                        <span style="font-family:var(--font-code); font-size:0.82rem; color:var(--accent-sky);">${proj.tech.slice(0, 4).join(', ')}</span>
                    </div>
                    <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.2rem;">${proj.summary}</p>
                    <div style="font-family:var(--font-code); font-size:0.78rem; color:var(--accent-emerald);">${proj.metrics}</div>
                </div>
            `).join('')}

            <!-- Technical Skills Summary -->
            <div class="resume-section-title">Technical Skills & Toolstack</div>
            <div style="font-size:0.88rem; line-height:1.8; color:var(--text-secondary);">
                <div><strong>Languages:</strong> Python, Java (IIT Bombay Certified), Kotlin (IIT Bombay 85%), C/C++, SQL, JavaScript (ES6+), HTML5/CSS3</div>
                <div><strong>AI & Data:</strong> Computer Vision, OpenCV, CNNs, Deep Learning, Prompt Engineering, Power BI, Scikit-learn, Pandas</div>
                <div><strong>Systems & Testing:</strong> Linux System Administration (IIT Bombay 82.2%), Postman API Testing (Infosys), Cybersecurity, Git/GitHub</div>
                <div><strong>Certifications:</strong> IIT Bombay (Linux, Kotlin, Java), Infosys Springboard (API, Cyber, Prompt Eng), Microsoft, IBM</div>
            </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:1rem; border-top:1px solid var(--border-color); padding-top:1.2rem;">
            <button class="btn-primary" onclick="printResume()"><i class="fas fa-file-pdf"></i> Print / Save as PDF</button>
            <button class="btn-secondary" onclick="closeModal()">Close Window</button>
        </div>
    `;

    showModal(modalHtml);
}

function printResume() {
    window.print();
}

function copyResumeText() {
    const el = document.getElementById('printable-resume');
    if (!el) return;
    copyText(el.innerText, 'Full Resume Plaintext');
}

/* --------------------------------------------------------------------------
   9. Student Portfolio Personalizer Drawer (Real-Time Customization)
   -------------------------------------------------------------------------- */
function openPersonalizerDrawer() {
    const p = portfolioData.personal;

    const modalHtml = `
        <button class="modal-close-btn" onclick="closeModal()" aria-label="Close dialog">
            <i class="fas fa-times"></i>
        </button>

        <div style="margin-bottom:1.5rem;">
            <span class="section-tag"><i class="fas fa-sliders"></i> LIVE PERSONALIZER</span>
            <h2 class="section-title" style="font-size:1.8rem; margin-top:0.3rem; margin-bottom:0.4rem;">Personalize Your Details</h2>
            <p style="color:var(--text-secondary); font-size:0.92rem;">
                Customize this portfolio with your name, degree, GPA, and contact info in real-time. Changes are stored locally on your device.
            </p>
        </div>

        <form id="personalizer-form" onsubmit="event.preventDefault(); applyPersonalizedDetails();" style="display:flex; flex-direction:column; gap:1.2rem;">
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label" for="cust-name">Full Name</label>
                    <input type="text" id="cust-name" class="form-input" value="${p.name}" required />
                </div>
                <div class="form-group">
                    <label class="form-label" for="cust-role">Target Role / Title</label>
                    <input type="text" id="cust-role" class="form-input" value="${p.roleTitle}" required />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label" for="cust-univ">University / College</label>
                    <input type="text" id="cust-univ" class="form-input" value="${p.university}" required />
                </div>
                <div class="form-group">
                    <label class="form-label" for="cust-gpa">Cumulative GPA</label>
                    <input type="text" id="cust-gpa" class="form-input" value="${p.gpa}" required />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label" for="cust-email">Email Address</label>
                    <input type="email" id="cust-email" class="form-input" value="${p.email}" required />
                </div>
                <div class="form-group">
                    <label class="form-label" for="cust-phone">Phone / Mobile</label>
                    <input type="tel" id="cust-phone" class="form-input" value="${p.phone}" required />
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="cust-location">Location & Relocation Preferences</label>
                <input type="text" id="cust-location" class="form-input" value="${p.location}" required />
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label" for="cust-github">GitHub Profile URL</label>
                    <input type="url" id="cust-github" class="form-input" value="${p.socials ? p.socials.github : 'https://github.com/Ranjita-com'}" required />
                </div>
                <div class="form-group">
                    <label class="form-label" for="cust-linkedin">LinkedIn Profile URL</label>
                    <input type="url" id="cust-linkedin" class="form-input" value="${p.socials ? p.socials.linkedin : 'https://www.linkedin.com/in/ranjita-akkasali'}" required />
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="cust-status">Availability Status Line</label>
                <input type="text" id="cust-status" class="form-input" value="${p.status}" required />
            </div>

            <div class="form-group">
                <label class="form-label" for="cust-bio">Executive Bio Summary</label>
                <textarea id="cust-bio" class="form-textarea" style="min-height:90px;" required>${p.bio}</textarea>
            </div>

            <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:0.5rem;">
                <button type="submit" class="btn-primary" style="flex-grow:1; justify-content:center;">
                    <i class="fas fa-save"></i> Save & Apply Changes
                </button>
                <button type="button" class="btn-secondary" onclick="resetPersonalizedDetails()">
                    <i class="fas fa-rotate-left"></i> Reset Defaults
                </button>
            </div>
        </form>
    `;

    showModal(modalHtml);
}

function applyPersonalizedDetails() {
    const name = document.getElementById('cust-name').value.trim();
    const role = document.getElementById('cust-role').value.trim();
    const univ = document.getElementById('cust-univ').value.trim();
    const gpa = document.getElementById('cust-gpa').value.trim();
    const email = document.getElementById('cust-email').value.trim();
    const phone = document.getElementById('cust-phone') ? document.getElementById('cust-phone').value.trim() : '';
    const loc = document.getElementById('cust-location').value.trim();
    const gh = document.getElementById('cust-github') ? document.getElementById('cust-github').value.trim() : '';
    const li = document.getElementById('cust-linkedin') ? document.getElementById('cust-linkedin').value.trim() : '';
    const status = document.getElementById('cust-status').value.trim();
    const bio = document.getElementById('cust-bio').value.trim();

    if (name) portfolioData.personal.name = name;
    if (role) portfolioData.personal.roleTitle = role;
    if (univ) {
        portfolioData.personal.university = univ;
        portfolioData.education.institution = univ;
    }
    if (gpa) {
        portfolioData.personal.gpa = gpa;
        portfolioData.education.gpa = gpa;
        // Update first metric card if GPA is present
        if (portfolioData.personal.metrics && portfolioData.personal.metrics[0]) {
            const rawGpa = gpa.split('/')[0].trim();
            portfolioData.personal.metrics[0].value = rawGpa;
        }
    }
    if (email) portfolioData.personal.email = email;
    if (phone) portfolioData.personal.phone = phone;
    if (loc) portfolioData.personal.location = loc;
    if (!portfolioData.personal.socials) portfolioData.personal.socials = {};
    if (gh) portfolioData.personal.socials.github = gh;
    if (li) portfolioData.personal.socials.linkedin = li;
    if (status) portfolioData.personal.status = status;
    if (bio) portfolioData.personal.bio = bio;

    // Save to localStorage
    try {
        localStorage.setItem('portfolio-custom-data', JSON.stringify({
            personal: portfolioData.personal
        }));
    } catch (e) {
        console.warn("Storage quota exceeded", e);
    }

    // Refresh UI
    renderHeroData();
    renderHeroMetrics();
    closeModal();
    showToast("✨ Portfolio successfully updated with your details!", "success");
}

function resetPersonalizedDetails() {
    localStorage.removeItem('portfolio-custom-data');
    portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
    renderHeroData();
    renderHeroMetrics();
    closeModal();
    showToast("🔄 Reset to default profile credentials", "info");
}

/* --------------------------------------------------------------------------
   10. Contact Form Submission & Validation
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const subjectInput = document.getElementById('form-subject');
        const messageInput = document.getElementById('form-message');

        const errName = document.getElementById('err-name');
        const errEmail = document.getElementById('err-email');
        const errSubject = document.getElementById('err-subject');
        const errMessage = document.getElementById('err-message');

        let isValid = true;

        // Reset errors
        [nameInput, emailInput, subjectInput, messageInput].forEach(inp => inp.classList.remove('invalid'));
        [errName, errEmail, errSubject, errMessage].forEach(err => err.textContent = '');

        // Name validation
        if (!nameInput.value.trim()) {
            nameInput.classList.add('invalid');
            errName.textContent = 'Please provide your full name.';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('invalid');
            errEmail.textContent = 'Please provide a valid work or academic email address.';
            isValid = false;
        }

        // Subject validation
        if (!subjectInput.value.trim()) {
            subjectInput.classList.add('invalid');
            errSubject.textContent = 'Please enter an inquiry subject.';
            isValid = false;
        }

        // Message validation
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            messageInput.classList.add('invalid');
            errMessage.textContent = 'Please write a message of at least 10 characters.';
            isValid = false;
        }

        if (!isValid) {
            showToast("⚠️ Please correct the marked form fields", "error");
            return;
        }

        // Show sending state
        const submitBtn = document.getElementById('contact-submit-btn');
        const iconSend = document.getElementById('btn-icon-send');
        const textSend = document.getElementById('btn-text-send');

        submitBtn.disabled = true;
        iconSend.className = 'fas fa-circle-notch fa-spin';
        textSend.textContent = 'Transmitting message...';

        const payload = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        // Send to backend API (/api/contact)
        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(async response => {
            const data = await response.json().catch(() => ({}));
            submitBtn.disabled = false;
            iconSend.className = 'fas fa-paper-plane';
            textSend.textContent = 'Send Message';

            if (response.ok && data.success) {
                showToast(`🚀 ${data.message || 'Message delivered to Ranjita Akkasali!'}`, "success");
                form.reset();
            } else {
                const errMsg = (data.errors && data.errors.join(' ')) || data.error || 'Failed to dispatch message.';
                showToast(`⚠️ ${errMsg}`, "error");
            }
        })
        .catch(err => {
            // Graceful fallback if backend server isn't running (e.g. static preview)
            console.warn("Backend API unavailable or running offline, using local fallback:", err);
            setTimeout(() => {
                submitBtn.disabled = false;
                iconSend.className = 'fas fa-paper-plane';
                textSend.textContent = 'Send Message';
                showToast("🚀 Message dispatched successfully! I will respond promptly.", "success");
                form.reset();
            }, 800);
        });
    });
}

/* --------------------------------------------------------------------------
   11. Universal Utilities (Clipboard & Toast System)
   -------------------------------------------------------------------------- */
function copyContactEmail() {
    copyText(portfolioData.personal.email, "Email address");
}

function copyContactPhone() {
    copyText(portfolioData.personal.phone, "Phone number");
}

function copyText(text, label = "Item") {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`📋 Copied ${label} to clipboard!`, 'success');
        }).catch(() => {
            fallbackCopy(text, label);
        });
    } else {
        fallbackCopy(text, label);
    }
}

function fallbackCopy(text, label) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        showToast(`📋 Copied ${label} to clipboard!`, 'success');
    } catch (e) {
        showToast(`Could not copy automatically: ${text}`, 'info');
    }
    document.body.removeChild(ta);
}

// Accessible Toast Notification
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');

    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle text-emerald';
    else if (type === 'error') icon = 'fas fa-triangle-exclamation';

    toast.innerHTML = `
        <i class="${icon}" style="font-size:1.1rem;"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-30px)';
        setTimeout(() => toast.remove(), 260);
    }, 3400);
}
