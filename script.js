// Loading Screen Functionality
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const logoImg = document.querySelector('.loading-logo-img');
    
    // Ensure logo image loads properly
    if (logoImg) {
        logoImg.onload = function() {
            console.log('Logo loaded successfully');
        };
        logoImg.onerror = function() {
            console.log('Logo failed to load, using fallback');
            this.style.display = 'none';
        };
    }
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 12 + 3; // More consistent progress
        if (progress > 100) progress = 100;
        
        if (progressFill) progressFill.style.width = progress + '%';
        if (loadingPercentage) loadingPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 800);
                }
            }, 300);
        }
    }, 80);
    
    // Fallback: Hide loading screen after 5 seconds max
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('fade-out')) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 800);
        }
    }, 5000);
});

$(document).ready(function() {
    // Sticky navbar on scroll with smooth transition
    $(window).scroll(function() {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // Scroll-up button show/hide with smooth animation
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Slide-up button click with smooth scroll
    $('.scroll-up-btn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800, 'swing');
    });

    // Smooth scroll for menu items
    $('.navbar .menu li a').click(function(e) {
        // Close mobile menu if open
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass("active");
        
        // Smooth scroll to section
        var target = $(this).attr('href');
        if (target.startsWith('#')) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top - 70
            }, 800, 'swing');
        }
    });

    // Toggle menu/navbar for mobile
    $('.menu-btn').click(function(e) {
        e.stopPropagation();
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
        $('body').toggleClass('menu-open');
    });

    // Close menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar .menu').removeClass("active");
            $('.menu-btn i').removeClass("active");
            $('body').removeClass('menu-open');
        }
    });
    
    // Close menu when clicking on menu items
    $('.navbar .menu li a').click(function() {
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass("active");
        $('body').removeClass('menu-open');
    });

    // Typing animation with enhanced options
    var typed = new Typed('.typing', {
        strings: [
            'Data Scientist',
            'AI Developer',
            'Machine Learning Expert',
            'Deep Learning Expert'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });

    var typed2 = new Typed('.typing-2', {
        strings: ['Generative & Agentic AI Specialist'],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Modern Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate skill bars when visible
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .card, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Animate skill bars with smooth transition
    function animateSkillBars() {
        $('.skills .line').each(function() {
            if (!$(this).hasClass('animated')) {
                $(this).addClass('animated');
            }
        });
    }

    // Modern team grid doesn't need carousel anymore
    // Removed owl carousel for team section as we're using CSS Grid
    
    // Add smooth scroll behavior for anchor links
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    });
    
    // Handle button clicks specifically
    $('.hire-btn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 80
        }, 800, 'swing');
    });
    
    $('.projects-btn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#projects').offset().top - 80
        }, 800, 'swing');
    });
    
    $('.contact-btn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 80
        }, 800, 'swing');
    });

    // Parallax effect for home section
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        $('.home').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
    });

    // Add hover effects with micro-interactions
    $('.card').hover(
        function() {
            $(this).find('i').addClass('bounce');
        },
        function() {
            $(this).find('i').removeClass('bounce');
        }
    );

    // Enhanced button hover effects
    $('.hire-btn, .about .right a, .skills .left a, .right form .button-area button').hover(
        function() {
            $(this).addClass('pulse');
        },
        function() {
            $(this).removeClass('pulse');
        }
    );

    // Smooth reveal for footer
    const footerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.2 });

    if (document.querySelector('.footer')) {
        footerObserver.observe(document.querySelector('.footer'));
    }

    // Project filtering functionality
    $('.filter-btn').click(function() {
        var filterValue = $(this).attr('data-filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter projects with animation
        if (filterValue === 'all') {
            $('.project-card').fadeIn(300).css('display', 'block');
        } else {
            $('.project-card').each(function() {
                if ($(this).attr('data-category') === filterValue) {
                    $(this).fadeIn(300).css('display', 'block');
                } else {
                    $(this).fadeOut(300);
                }
            });
        }
    });

    // Animate skill progress bars when in view
    function animateSkillProgress() {
        $('.skill-progress').each(function() {
            var width = $(this).attr('data-width');
            $(this).animate({ width: width + '%' }, 1500, 'easeOutCubic');
        });
    }

    // Enhanced intersection observer for skill bars
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('skills')) {
                animateSkillProgress();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (document.querySelector('.skills')) {
        skillsObserver.observe(document.querySelector('.skills'));
    }

    // Add stagger animation to service cards
    $('.services .card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    // Add stagger animation to project cards
    $('.project-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    // Add stagger animation to team cards
    $('.team-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    // Enhanced form handling with better UX
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
        var form = $(this);
        var submitBtn = form.find('.send-btn');
        var originalText = submitBtn.find('span').text();
        
        // Show loading state
        submitBtn.prop('disabled', true);
        submitBtn.find('span').text('Sending...');
        submitBtn.find('i').removeClass('fa-paper-plane').addClass('fa-spinner fa-spin');
        
        // Simulate form submission
        setTimeout(function() {
            // Reset button
            submitBtn.prop('disabled', false);
            submitBtn.find('span').text(originalText);
            submitBtn.find('i').removeClass('fa-spinner fa-spin').addClass('fa-paper-plane');
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form[0].reset();
        }, 2000);
    });

    // Notification system
    function showNotification(message, type) {
        var notification = $('<div class="notification ' + type + '">' + message + '</div>');
        $('body').append(notification);
        
        setTimeout(function() {
            notification.addClass('show');
        }, 100);
        
        setTimeout(function() {
            notification.removeClass('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add floating animation to tech icons in hero section
    $('.floating-icon').each(function(index) {
        $(this).css({
            'animation-delay': (index * 1.5) + 's',
            'animation-duration': (6 + index) + 's'
        });
    });

    // Enhanced hover effects for project cards
    $('.project-card').hover(
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1)');
        }
    );

    // Smooth counter animation for stats
    function animateCounters() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var countTo = $this.text().replace(/[^0-9]/g, '');
            var suffix = $this.text().replace(/[0-9]/g, '');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum) + suffix);
                },
                complete: function() {
                    $this.text(countTo + suffix);
                }
            });
        });
    }

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (document.querySelector('.stats-container')) {
        statsObserver.observe(document.querySelector('.stats-container'));
    }

    // Enhanced form validation is now handled by contact-form specific handler above

    // Add focus effects to form inputs
    $('input, textarea').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        $(this).parent().removeClass('focused');
    });

    // Hide main content initially until loading is complete
    $('body').css('overflow', 'hidden');

    // Add active state to navigation based on scroll position
    $(window).scroll(function() {
        var scrollPos = $(window).scrollTop() + 100;
        
        $('.navbar .menu li a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            
            if (refElement.length && refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar .menu li a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    });

    // Add loading animation for images
    $('img').each(function() {
        $(this).addClass('loaded');
    });

    // Keyboard navigation support
    $(document).keydown(function(e) {
        // ESC key closes mobile menu
        if (e.keyCode === 27) {
            $('.navbar .menu').removeClass("active");
            $('.menu-btn i').removeClass("active");
        }
    });

    // Add ripple effect to buttons
    $('.hire-btn, button, .about .right a, .skills .left a').on('click', function(e) {
        var ripple = $('<span class="ripple"></span>');
        $(this).append(ripple);
        
        var x = e.pageX - $(this).offset().left;
        var y = e.pageY - $(this).offset().top;
        
        ripple.css({
            left: x + 'px',
            top: y + 'px'
        });
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    $(window).on('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll-dependent operations here
        }, 100);
    });

    // Add smooth transitions to all interactive elements
    $('a, button, .card, input, textarea').css('transition', 'all 0.3s ease');

    // Add CSS for notification system
    $('<style>').text(`
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10000;
            font-weight: 500;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification.error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }
    `).appendTo('head');

    // Console message for developers
    console.log('%c👋 Welcome to my portfolio!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with modern web technologies and lots of ❤️', 'color: #60a5fa; font-size: 14px;');
    console.log('%cInterested in collaboration? Let\'s connect!', 'color: #22c55e; font-size: 14px;');
});