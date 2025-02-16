// Preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Navigation and Header
const header = document.querySelector('header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

// Scroll Header Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking nav links
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('active');
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing Effect
const typedTextSpan = document.querySelector('.typed-text');
const texts = ['Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const typingSpeed = isDeleting ? 100 : 200;
    setTimeout(type, typingSpeed);
}

type();

// Skills Animation
const skillBars = document.querySelectorAll('.skill');
const animateSkills = () => {
    skillBars.forEach(skill => {
        const rect = skill.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            skill.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills();

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Form validation
    if (!name || !email || !message) {
        formResponse.textContent = 'Please fill in all fields.';
        formResponse.className = 'error';
        return;
    }

    try {
        formResponse.textContent = 'Sending message...';
        formResponse.className = '';

        const response = await fetch('https://formspree.io/f/xbldkgez', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formResponse.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formResponse.className = 'success';
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        formResponse.textContent = 'Failed to send message. Please try again later.';
        formResponse.className = 'error';
    }
});

// Form Input Animation
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    input.addEventListener('focus', () => {
        label.classList.add('active');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('active');
        }
    });

    // Check on page load for pre-filled inputs
    if (input.value) {
        label.classList.add('active');
    }
});
