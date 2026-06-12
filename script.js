// ==================== Mobile Menu Toggle ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== Smooth Scroll ====================
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

// ==================== Form Submission ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;

    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Create mailto link (you can replace this with an actual backend service)
    const mailtoLink = `mailto:dhrumil@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    // Show success message
    const originalText = contactForm.querySelector('button').textContent;
    contactForm.querySelector('button').textContent = 'Message Sent! ✓';
    contactForm.querySelector('button').style.background = '#10b981';

    // Reset form
    contactForm.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
        contactForm.querySelector('button').textContent = originalText;
        contactForm.querySelector('button').style.background = '';
    }, 3000);

    // In production, you would send this data to a backend service
    console.log('Form submitted:', { name, email, subject, message });

    // Optional: Open default email client
    // window.location.href = mailtoLink;
});

// ==================== Scroll Animation ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and article cards
document.querySelectorAll('.project-card, .article-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ==================== Active Navigation Link ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Add Active Link Styling ====================
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--secondary-color);
        border-bottom: 2px solid var(--secondary-color);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// ==================== Parallax Effect on Hero ====================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (window.pageYOffset < window.innerHeight) {
        hero.style.backgroundPosition = `0% ${window.pageYOffset * 0.5}px`;
    }
});

// ==================== Counter Animation ====================
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 100;
        let count = 0;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.floor(count) + '+';
                setTimeout(updateCount, 30);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCount();
    });
};

// Trigger animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

// ==================== Loading Animation ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

// ==================== Local Storage for Form ====================
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

inputs.forEach(input => {
    // Load saved values
    const savedValue = localStorage.getItem(`form_${input.name || input.placeholder}`);
    if (savedValue) {
        input.value = savedValue;
    }

    // Save values on input
    input.addEventListener('input', () => {
        localStorage.setItem(`form_${input.name || input.placeholder}`, input.value);
    });
});

// Clear local storage on successful form submission
contactForm.addEventListener('submit', () => {
    inputs.forEach(input => {
        localStorage.removeItem(`form_${input.name || input.placeholder}`);
    });
});

console.log('Portfolio website loaded successfully!');