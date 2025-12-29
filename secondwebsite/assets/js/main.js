// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Add loaded class to body after preloader is hidden
        document.body.classList.add('loaded');
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // Back to top button
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.textContent.includes('%') ? '%' : '';
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            const updateCount = () => {
                count += increment;
                
                if (count < target) {
                    stat.textContent = Math.ceil(count) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + suffix;
                }
            };
            
            // Only animate when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                    observer.unobserve(stat);
                }
            });
            
            observer.observe(stat);
        });
    }
    
    // Initialize stats animation when scrolled to stats section
    const statsSection = document.querySelector('.stats-section');
    
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            statsObserver.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            const successAlert = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Thank you for your message! I'll get back to you soon.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            
            const formContainer = contactForm.parentElement;
            formContainer.insertAdjacentHTML('beforebegin', successAlert);
            
            // Reset form
            this.reset();
            
            // Scroll to top of form
            formContainer.scrollIntoView({ behavior: 'smooth' });
            
            // Remove alert after 5 seconds
            setTimeout(() => {
                const alert = document.querySelector('.alert');
                if (alert) {
                    alert.remove();
                }
            }, 5000);
        });
    }
    
    // Animate elements on scroll using Intersection Observer
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Call the animation function
    animateOnScroll();
    
    // Add animation to skills progress bars
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                // Small delay to ensure the initial width is set to 0 before animating
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            this.style.borderColor = 'var(--primary-purple)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'var(--border-subtle)';
        });
    });
    
    // Add animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            this.style.borderColor = 'var(--primary-purple)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'var(--border-subtle)';
        });
    });
    
    // Add animation to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            this.style.borderColor = 'var(--primary-purple)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'var(--border-subtle)';
        });
    });
    
    // Add animation to contact info items
    const contactItems = document.querySelectorAll('.contact-info-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-info-icon');
            icon.style.transform = 'translateY(-5px)';
            icon.style.background = 'linear-gradient(135deg, var(--primary-purple), var(--neon-blue))';
            icon.style.color = '#fff';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-info-icon');
            icon.style.transform = 'translateY(0)';
            icon.style.background = 'rgba(139, 92, 246, 0.1)';
            icon.style.color = 'var(--primary-purple)';
        });
    });
    
    // Add animation to social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.background = 'linear-gradient(135deg, var(--primary-purple), var(--neon-blue))';
            this.style.color = '#fff';
            this.style.borderColor = 'transparent';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.background = 'var(--card-bg)';
            this.style.color = 'var(--body-text)';
            this.style.borderColor = 'var(--border-subtle)';
        });
    });
    
    // Add animation to footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-purple)';
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = 'var(--muted-text)';
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add animation to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 10px 25px rgba(34, 211, 238, 0.4)';
            } else if (this.classList.contains('btn-outline-light')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.2)';
                this.style.borderColor = 'var(--primary-purple)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.3)';
            } else if (this.classList.contains('btn-outline-light')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
                this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
    
    // Add animation to navbar links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#fff';
            const after = window.getComputedStyle(this, '::after');
            this.style.setProperty('--after-width', '50%');
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = 'var(--body-text)';
            this.style.setProperty('--after-width', '0');
        });
    });
    
    // Add animation to service links
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'translateX(0)';
        });
    });
    
    // Add animation to project links
    const projectLinks = document.querySelectorAll('.project-links .btn');
    
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = '0 10px 25px rgba(34, 211, 238, 0.4)';
            } else {
                this.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.2)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add animation to form inputs
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-purple)';
            this.style.boxShadow = '0 0 0 0.25rem rgba(139, 92, 246, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border-subtle)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add animation to footer bottom links
    const footerBottomLinks = document.querySelectorAll('.footer-bottom-links a');
    
    footerBottomLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-purple)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = 'var(--muted-text)';
        });
    });
    
    // Add animation to newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        const input = newsletterForm.querySelector('.form-control');
        const button = newsletterForm.querySelector('.btn');
        
        input.addEventListener('focus', function() {
            newsletterForm.style.borderColor = 'var(--primary-purple)';
            newsletterForm.style.boxShadow = '0 0 0 0.25rem rgba(139, 92, 246, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            newsletterForm.style.borderColor = 'var(--border-subtle)';
            newsletterForm.style.boxShadow = 'none';
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(34, 211, 238, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }
    
    // Add animation to carousel controls
    const carouselControls = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    
    carouselControls.forEach(control => {
        control.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, var(--primary-purple), var(--neon-blue))';
            this.style.borderColor = 'var(--primary-purple)';
        });
        
        control.addEventListener('mouseleave', function() {
            this.style.background = 'var(--card-bg)';
            this.style.borderColor = 'var(--border-subtle)';
        });
    });
    
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Add class to body when page is fully loaded
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
    });
});
