// ========== LOADING SCREEN ========== 
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 500);
});

// ========== THEME TOGGLE ========== 
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    htmlElement.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('light-mode');
    const isLightMode = htmlElement.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    
    themeToggle.style.animation = 'none';
    setTimeout(() => {
        themeToggle.style.animation = 'rotate 0.6s ease-in-out';
    }, 10);
});

// ========== MOBILE MENU TOGGLE ========== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========== SMOOTH SCROLLING & ACTIVE NAV LINK ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Update breadcrumb
    updateBreadcrumb(current);
});

// ========== BREADCRUMB NAVIGATION ========== 
function updateBreadcrumb(sectionId) {
    const breadcrumb = document.getElementById('breadcrumb');
    const sectionNames = {
        'home': 'Home',
        'about': 'About',
        'experience': 'Experience',
        'services': 'Services',
        'projects': 'Projects',
        'testimonials': 'Testimonials',
        'blog': 'Blog',
        'faq': 'FAQ',
        'contact': 'Contact'
    };
    
    breadcrumb.innerHTML = `<span class="breadcrumb-item" onclick="document.getElementById('home').scrollIntoView({behavior: 'smooth'})">Home</span>`;
    
    if (sectionId && sectionNames[sectionId]) {
        breadcrumb.innerHTML += ` / <span class="breadcrumb-item">${sectionNames[sectionId]}</span>`;
    }
}

// ========== NAVBAR BACKGROUND ON SCROLL ========== 
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'rgba(0, 255, 255, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'rgba(0, 255, 255, 0.2)';
    }
});

// ========== ANIMATED COUNTER ========== 
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Start counters when section is visible
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const counters = entry.target.querySelectorAll('.stat-counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            entry.target.classList.add('animated');
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.getElementById('about');
if (aboutSection) {
    counterObserver.observe(aboutSection);
}

// ========== PROJECT FILTERING ========== 
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.8s ease-out both';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ========== PROJECT MODAL ========== 
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const projectModalButtons = document.querySelectorAll('.project-modal-btn');

const projectData = {
    1: {
        title: 'E-Commerce Platform',
        description: 'Platform e-commerce modern dengan fitur lengkap untuk online store. Dilengkapi dengan sistem pembayaran, inventory management, dan customer dashboard.',
        techs: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
        features: ['Shopping Cart System', 'Payment Gateway Integration', 'Admin Dashboard', 'Product Management', 'Order Tracking', 'User Reviews']
    },
    2: {
        title: 'Task Management App',
        description: 'Aplikasi manajemen tugas dengan kolaborasi real-time. Memungkinkan tim untuk berkolaborasi, share file, dan track progress project secara efisien.',
        techs: ['Vue.js', 'Firebase', 'Tailwind CSS'],
        features: ['Drag & Drop Tasks', 'Real-time Collaboration', 'File Sharing', 'Calendar Integration', 'Notifications', 'Team Management']
    },
    3: {
        title: 'Movie Discovery Website',
        description: 'Website penemuan film dengan integrasi API TMDb. Fitur advanced filtering dan personalized recommendations berdasarkan preferensi user.',
        techs: ['JavaScript', 'REST API', 'HTML5/CSS3'],
        features: ['Advanced Search', 'Movie Recommendations', 'Watchlist Feature', 'Rating System', 'Review Section', 'Responsive Design']
    },
    4: {
        title: 'Music Streaming Platform',
        description: 'Platform streaming musik dengan library lagu yang luas. Fitur playlist creation, social sharing, dan algoritma rekomendasi yang canggih.',
        techs: ['React', 'Web Audio API', 'Redux'],
        features: ['Playlist Management', 'Custom Audio Player', 'Social Sharing', 'Recommendations', 'Search Functionality', 'Offline Mode']
    },
    5: {
        title: 'Finance Tracker App',
        description: 'Aplikasi pelacakan keuangan pribadi dengan analytics dashboard yang komprehensif. Membantu manage pengeluaran dan budget planning dengan mudah.',
        techs: ['Angular', 'Chart.js', 'SQLite'],
        features: ['Expense Tracking', 'Budget Planning', 'Analytics Dashboard', 'Categorization', 'Reports Generation', 'Data Export']
    },
    6: {
        title: 'Fitness Tracking App',
        description: 'Aplikasi fitness tracking dengan monitoring workout, nutrisi, dan progress visualization. Termasuk community features untuk motivasi bersama.',
        techs: ['Flutter', 'Firebase', 'Dart'],
        features: ['Workout Tracking', 'Nutrition Monitoring', 'Progress Charts', 'Community Features', 'Goal Setting', 'Workout Plans']
    }
};

projectModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.getAttribute('data-project');
        const project = projectData[projectId];

        // Update modal content
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;

        // Update technologies
        const techsContainer = document.getElementById('modalTechs');
        techsContainer.innerHTML = project.techs.map(tech => `<span>${tech}</span>`).join('');

        // Update features
        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');

        // Show modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========== FAQ ACCORDION ========== 
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Close other items
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.parentElement.classList.remove('active');
            }
        });

        // Toggle current item
        faqItem.classList.toggle('active');
    });
});

// ========== CONTACT FORM HANDLING ========== 
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validation
    if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
        showNotification('Mohon isi semua field!', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Pesan terkirim! Terima kasih telah menghubungi saya. 🎉', 'success');
    contactForm.reset();
    
    console.log({
        name,
        email,
        subject,
        message,
        timestamp: new Date().toLocaleString('id-ID')
    });
});

// ========== NEWSLETTER FORM ========== 
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }
    
    showNotification('Terima kasih! Anda telah berlangganan newsletter kami. 📧', 'success');
    newsletterForm.reset();
    
    console.log({
        email,
        subscribed: true,
        timestamp: new Date().toLocaleString('id-ID')
    });
});

// ========== NOTIFICATION SYSTEM ========== 
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease-in-out;
        ${type === 'success' ? `
            background: rgba(57, 255, 20, 0.2);
            border: 2px solid #39ff14;
            color: #39ff14;
            box-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
        ` : `
            background: rgba(255, 100, 100, 0.2);
            border: 2px solid #ff6464;
            color: #ff6464;
            box-shadow: 0 0 20px rgba(255, 100, 100, 0.5);
        `}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ========== SCROLL ANIMATION OBSERVER ========== 
const observerOptions2 = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions2);

// Observe elements
document.querySelectorAll('.project-card, .skill-tag, .stat-box, .service-card, .testimonial-card, .blog-card, .faq-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ========== BACK TO TOP BUTTON ========== 
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== PARALLAX EFFECT ========== 
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        heroVisual.style.transform = `translateY(${scrollY * 0.5}px)`;
    });
}

// ========== MOUSE FOLLOW EFFECT ========== 
const floatingCards = document.querySelectorAll('.floating-card');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        card.style.transform = `
            translateX(${mouseX * speed}px)
            translateY(${mouseY * speed}px)
        `;
    });
});

// ========== KEYBOARD SHORTCUT ========== 
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Jump to sections with keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                break;
            case '2':
                e.preventDefault();
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                break;
            case '3':
                e.preventDefault();
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                break;
            case '4':
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

// ========== DYNAMIC FORM VALIDATION ========== 
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (input.value && !emailRegex.test(input.value)) {
                input.style.borderBottomColor = '#ff6464';
            } else {
                input.style.borderBottomColor = 'rgba(0, 255, 255, 0.2)';
            }
        }
    });

    input.addEventListener('input', () => {
        if (input.value) {
            input.style.borderBottomColor = 'rgba(0, 255, 255, 0.5)';
        }
    });
});

// ========== SAVE FORM DATA TO LOCALSTORAGE ========== 
formInputs.forEach(input => {
    const savedValue = localStorage.getItem(`form_${input.id}`);
    if (savedValue) {
        input.value = savedValue;
    }

    input.addEventListener('change', () => {
        localStorage.setItem(`form_${input.id}`, input.value);
    });
});

// ========== ACCESSIBILITY: FOCUS MANAGEMENT ========== 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========== PERFORMANCE: LAZY LOAD IMAGES ========== 
const images = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========== ANALYTICS TRACKING ========== 
function trackPageView(sectionId) {
    console.log(`Page view: ${sectionId}`, new Date().toLocaleTimeString());
}

function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData, new Date().toLocaleTimeString());
}

// Track filter clicks
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('project_filter', {
            filter: button.getAttribute('data-filter')
        });
    });
});

// Track modal opens
projectModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('project_modal_open', {
            projectId: button.getAttribute('data-project')
        });
    });
});

// Track form submissions
contactForm.addEventListener('submit', () => {
    trackEvent('contact_form_submit', {
        timestamp: new Date().toLocaleString('id-ID')
    });
});

// ========== CONSOLE WELCOME MESSAGE ========== 
console.log('%c🚀 Welcome to Gitin Arifysa Fadilah Portfolio', 'color: #00ffff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ffff;');
console.log('%cCreated with HTML, CSS & JavaScript ⚡', 'color: #ff00ff; font-size: 14px; font-weight: bold;');
console.log('%cKeyboard Shortcuts: Ctrl/Cmd + 1,2,3,4 to navigate', 'color: #39ff14; font-size: 12px;');

// ========== SERVICE WORKER REGISTRATION ========== 
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}

// ========== CLEANUP ========== 
window.addEventListener('beforeunload', () => {
    // Save analytics before leaving
    console.log('Session ended at', new Date().toLocaleString('id-ID'));
});

// ========== INITIALIZATION ========== 
console.log('Portfolio website loaded successfully! 🚀');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
});