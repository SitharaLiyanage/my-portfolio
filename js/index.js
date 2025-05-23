// ------------------- DOM Elements ------------------- //
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('nav a');
const categoryButtons = document.querySelectorAll('.category-btn');
const projectItems = document.querySelectorAll('.project-item');
const contactForm = document.getElementById('contact-form');
const currentTimeElement = document.getElementById('current-time');

// ------------------- Header Scroll Effect ------------------- //
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// ------------------- Active Navigation ------------------- //
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ------------------- Smooth Scrolling ------------------- //
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ------------------- Project Category Filtering ------------------- //
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        projectItems.forEach(item => {
            if (item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ------------------- Skills Animation ------------------- //
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// ------------------- Intersection Observer for Animations ------------------- //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;

            // Animate skills when about section comes into view
            if (element.id === 'about') {
                setTimeout(animateSkills, 500);
            }

            // Add fade-in animation to elements
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Make home section visible immediately
document.getElementById('home').style.opacity = '1';
document.getElementById('home').style.transform = 'translateY(0)';

// ------------------- Contact Form ------------------- //
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        organization: formData.get('organization'),
        message: formData.get('message')
    };

    // Simulate form submission
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// ------------------- Time Update ------------------- //
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit'
    });
    currentTimeElement.textContent = `${timeString} GMT +5:30`;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// ------------------- Floating Particles ------------------- //
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#a855f7';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `pulse ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';

        particlesContainer.appendChild(particle);
    }
}

// ------------------- Utility Functions ------------------- //
function downloadCV() {
    // Replace with actual CV download link
    alert('CV download would be implemented here');
}

function sendMail() {
    window.location.href = 'mailto:dev.sitharaliyanage@gmail.com';
}

// ------------------- Initialize ------------------- //
document.addEventListener('DOMContentLoaded', () => {
    createFloatingParticles();
    updateActiveNav();

    // Add some delay for smoother initial load
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ------------------- Loading Animation ------------------- //
window.addEventListener('load', () => {
    // Remove any loading screens if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// ------------------- Parallax Effect ------------------- //
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform += ` translateY(${scrolled * speed}px)`;
    });
});

// ------------------- Service Hover Effects ------------------- //
const services = document.querySelectorAll('.service');

services.forEach(service => {
    service.addEventListener('mouseenter', () => {
        service.style.transform = 'scale(1.05) translateY(-5px)';
    });

    service.addEventListener('mouseleave', () => {
        service.style.transform = 'scale(1) translateY(0)';
    });
});

// ------------------- Typing Effect for Hero ------------------- //
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typing effect to hero description on load
window.addEventListener('load', () => {
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const originalText = heroDescription.textContent;
        setTimeout(() => {
            typeWriter(heroDescription, originalText, 100);
        }, 1500);
    }
});