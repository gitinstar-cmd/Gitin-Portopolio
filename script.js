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
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.style.animation = 'none';
    setTimeout(() => {
        hamburger.style.animation = 'spin 0.6s ease-in-out';
    }, 10);
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== SMOOTH SCROLLING ========== 
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

// ========== NAVBAR BACKGROUND ON SCROLL ========== 
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'rgba(0, 255, 255, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'rgba(0, 255, 255, 0.2)';
    }
});

// ========== CONTACT FORM HANDLING ========== 
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        showNotification('Mohon isi semua field!', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }
    
    showNotification('Pesan terkirim! Terima kasih telah menghubungi saya. 🎉', 'success');
    contactForm.reset();
    
    console.log({
        name,
        email,
        message,
        timestamp: new Date().toLocaleString('id-ID')
    });
});

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
const observerOptions = {
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
}, observerOptions);

document.querySelectorAll('.project-card, .skill-tag, .stat-box').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ========== PAGE LOAD ANIMATION ========== 
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.6s ease-in-out';
});

// ========== ACCESSIBILITY: KEYBOARD NAVIGATION ========== 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

console.log('Portfolio website loaded successfully! 🚀');
