document.addEventListener('DOMContentLoaded', function() {
    // ==================== Mobile Navigation ====================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ==================== Navbar Scroll Effect ====================
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==================== Progress Bars Animation ====================
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateProgressBars() {
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.progress');
            const percent = progressBar.parentElement.querySelector('span:last-child').textContent;
            progressBar.style.width = percent;
            
            // Reset animation by removing and re-adding the width
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = percent;
            }, 100);
        });
    }

    // ==================== Timeline Animation ====================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimelineItems() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                item.classList.add('visible');
            }
        });
    }

    // ==================== Intersection Observer ====================
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special cases for specific sections
                if (entry.target.id === 'skills') {
                    animateProgressBars();
                }
                if (entry.target.classList.contains('timeline-item')) {
                    // Additional timeline animation if needed
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll(
        '.timeline-item, .section, .skill-item, [data-animate]'
    ).forEach(element => {
        observer.observe(element);
    });

    // ==================== Scroll Event Listeners ====================
    window.addEventListener('scroll', function() {
        // As a fallback for older browsers
        animateTimelineItems();
    });

    // ==================== Smooth Scrolling ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== Form Handling ====================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // ==================== Initial Animations ====================
    // Initial check for elements in viewport
    animateTimelineItems();
    
    // Body loaded class for initial transitions
    setTimeout(() => {
        document.querySelector('body').classList.add('loaded');
    }, 200);

    // Initial progress bars animation if skills section is visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight) {
        animateProgressBars();
    }
});