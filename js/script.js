// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to highlight active link based on scroll position
    function highlightNavLink() {
        let currentSection = '';
        
        // Offset for sticky header
        const headerHeight = document.getElementById('main-header').offsetHeight;
        const scrollY = window.scrollY + headerHeight + 50; // Added buffer

        // Check if at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
           currentSection = sections[sections.length - 1].getAttribute('id');
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
        }

        // Special case for 'Home' if near top
        if(window.scrollY < 100) {
            currentSection = 'home';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', highlightNavLink);
    
    // Run once on load to set initial state
    highlightNavLink();

    // Testimonials Carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;
    let testimonialInterval;

    // Initialize Slider
    if (testimonialCards.length > 0) {
        // Create Dots
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToTestimonial(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        // Show first testimonial
        testimonialCards[0].classList.add('active');
        
        // Start Auto Rotation
        startInterval();
    }

    function goToTestimonial(index) {
        // Hide all
        testimonialCards.forEach(card => card.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

        // Show target
        currentTestimonial = index;
        testimonialCards[currentTestimonial].classList.add('active');
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        if(dots.length > 0) {
            dots[currentTestimonial].classList.add('active');
        }
    }

    function nextTestimonial() {
        let nextIndex = (currentTestimonial + 1) % testimonialCards.length;
        goToTestimonial(nextIndex);
    }

    function startInterval() {
        if (testimonialCards.length > 1) {
            testimonialInterval = setInterval(nextTestimonial, 5000); // 5 seconds
        }
    }

    function resetInterval() {
        clearInterval(testimonialInterval);
        startInterval();
    }

    // Pause on hover
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    if (testimonialsWrapper) {
        testimonialsWrapper.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialsWrapper.addEventListener('mouseleave', () => {
            startInterval();
        });
    }
    // Scroll Animation Observer
    const revealElements = document.querySelectorAll('section > .container, .service-card, .image-wrapper, .press-item');
    
    // Add reveal class to elements for CSS transition
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            
            // Toggle Icon
            const icon = menuToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});
