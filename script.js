// ========================================
// SMOOTH SCROLL
// ========================================
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

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    }
    
    // Hide/show navbar on scroll (optional)
    // Uncomment if you want this behavior
    /*
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    */
    
    lastScroll = currentScroll;
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animatedElements = document.querySelectorAll(`
    .feature-card,
    .step,
    .pricing-card,
    .testimonial-card
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

const animateCounters = () => {
    if (counterAnimated) return;
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isRating = target.includes('★');
        
        if (isRating) {
            // Skip animation for rating
            return;
        }
        
        const value = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        const duration = 2000;
        const increment = value / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < value) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = value + suffix;
            }
        };
        
        updateCounter();
    });
    
    counterAnimated = true;
};

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ========================================
// FEATURE CARDS HOVER EFFECT
// ========================================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--gray-100)';
    });
});

// ========================================
// PRICING CARD SELECTION
// ========================================
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('click', function() {
        pricingCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// ========================================
// TESTIMONIALS CAROUSEL (Optional Enhancement)
// ========================================
// This is a simple implementation. You can enhance it with a library like Swiper.js
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const isMobile = window.innerWidth < 768;

if (isMobile && testimonialCards.length > 0) {
    // Hide all except first on mobile
    testimonialCards.forEach((card, index) => {
        if (index !== 0) {
            card.style.display = 'none';
        }
    });
    
    // Add navigation dots (optional)
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        dotsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 2rem;
        `;
        
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.style.cssText = `
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border: none;
                background: ${index === 0 ? 'var(--primary)' : 'var(--gray-300)'};
                cursor: pointer;
                transition: all 0.3s;
            `;
            
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                updateTestimonials();
            });
            
            dotsContainer.appendChild(dot);
        });
        
        testimonialsSection.appendChild(dotsContainer);
    }
}

function updateTestimonials() {
    testimonialCards.forEach((card, index) => {
        card.style.display = index === currentTestimonial ? 'block' : 'none';
    });
    
    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
        dot.style.background = index === currentTestimonial ? 'var(--primary)' : 'var(--gray-300)';
    });
}

// ========================================
// LAZY LOADING FOR IMAGES (if you add images later)
// ========================================
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ========================================
// FORM VALIDATION (if you add a contact form)
// ========================================
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add your form validation logic here
        const formData = new FormData(this);
        
        // Example: Show success message
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // You can integrate with your backend here
    });
});

// ========================================
// PERFORMANCE: Debounce function for scroll events
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// ANALYTICS TRACKING (Add your analytics here)
// ========================================
function trackEvent(eventName, eventData) {
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    console.log('Event tracked:', eventName, eventData);
}

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('cta_click', {
            button_text: btn.textContent.trim(),
            button_location: btn.closest('section')?.className || 'unknown'
        });
    });
});

// ========================================
// PRINT MESSAGE ON LOAD
// ========================================
console.log('%c🍕 Drillo Landing Page', 'font-size: 20px; font-weight: bold; color: #B94C2D;');
console.log('%cGestão inteligente para seu negócio', 'font-size: 14px; color: #666;');
console.log('%cVisite: https://play.google.com/store', 'font-size: 12px; color: #999;');

// ========================================
// SERVICE WORKER (for PWA - optional)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}
