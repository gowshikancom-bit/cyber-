// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Simple validation
  if (!data.name || !data.email) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate API call delay
  setTimeout(() => {
    // Show success state
    contactForm.classList.add('success');
    
    // Reset form after delay
    setTimeout(() => {
      contactForm.reset();
      contactForm.classList.remove('success');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 3000);
  }, 1000);
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
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all service cards and about cards
document.querySelectorAll('.service-card, .about-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
  .service-card.visible,
  .about-card.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Active navigation highlight
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    
    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = '';
      });
      navLink.style.color = '#00d4ff';
    }
  });
});
