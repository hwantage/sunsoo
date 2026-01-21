// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initAccordion();
    initScrollAnimations();
    initSmoothScroll();
    initActiveNavLink();
});

// ===== Navbar Functionality =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('mobile-active');
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('mobile-active');
        });
    });
}

// ===== Accordion Functionality =====
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items (optional: for exclusive accordion)
            // accordionItems.forEach(i => i.classList.remove('active'));

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    // Add fade-in class to animatable elements
    const animatableSelectors = [
        '.problem-card',
        '.timeline-item',
        '.question-card',
        '.solution-card',
        '.mindset-card',
        '.action-card',
        '.plan-card',
        '.flow-diagram',
        '.quote-highlight',
        '.expert-quote',
        '.benefit-box',
        '.ai-capabilities'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Active Nav Link =====
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== Utility: Debounce =====
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

// ===== Counter Animation (optional enhancement) =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== Timeline Animation Enhancement =====
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}

// Initialize timeline animation after DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initTimelineAnimation();
});

// ===== Print Styles Enhancement =====
window.addEventListener('beforeprint', () => {
    // Expand all accordions for printing
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.add('active');
    });
    
    // Show all animated elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
    });
});
