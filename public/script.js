// ============================================
// NAVIGATION & SMOOTH SCROLLING
// ============================================



const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navButton = document.getElementById('nav-button');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on hamburger click
if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navButton) navButton.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (navButton) navButton.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (navButton) navButton.classList.remove('active');
    }
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(
                `.nav-link[href="#${section.id}"]`
            );
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .about-feature').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        // Show success message
        const originalText = e.target.querySelector('button').textContent;
        e.target.querySelector('button').textContent = 'Message Sent! ✓';
        e.target.querySelector('button').style.background = 'var(--accent-gold)';
        e.target.querySelector('button').style.color = '#000';

        // Reset form
        contactForm.reset();

        // Restore button after 3 seconds
        setTimeout(() => {
            e.target.querySelector('button').textContent = originalText;
            e.target.querySelector('button').style.background = '';
            e.target.querySelector('button').style.color = '';
        }, 3000);

        console.log('Form submitted:', { name, email, message });
    });
}

// ============================================
// BUTTON HOVER EFFECTS
// ============================================

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// CARD HOVER LIFT EFFECT
// ============================================

document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================

const parallaxElements = document.querySelectorAll('[class*="element-"]');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((el, index) => {
        const yPos = scrolled * (0.5 + index * 0.1);
        el.style.transform = `translateY(${yPos}px)`;
    });
});


// ============================================
// FLOATING ANIMATION ENHANCEMENT
// ============================================

document.querySelectorAll('.floating-element').forEach((el, index) => {
    const duration = 6 + index * 2;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${index}s`;
});

// ============================================
// STAGGER ANIMATIONS
// ============================================

const animateOnScroll = (selector, delay = 0.1) => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * delay}s`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
};

// Apply stagger animations to various elements
animateOnScroll('.feature-card', 0.1);
animateOnScroll('.pricing-card', 0.15);

// ============================================
// SMOOTH PAGE LOAD
// ============================================

window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals if they exist
        console.log('Escape key pressed');
    }
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log when page is fully loaded
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time:', pageLoadTime, 'ms');
});

// ============================================
// TOUCH DEVICE OPTIMIZATIONS
// ============================================

const isTouchDevice = () => {
    return (
        (typeof window !== 'undefined' &&
            ('ontouchstart' in window ||
                (window.DocumentTouch &&
                    typeof document !== 'undefined' &&
                    document instanceof window.DocumentTouch)))
    );
};

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
    // Disable hover effects on touch devices for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button if needed
const addScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.id = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent-gold);
        color: #000;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', scrollToTop);
};

// Initialize scroll to top button
addScrollToTopButton();

