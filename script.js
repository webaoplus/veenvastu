/* ========================================
   VASTU SHASTRA CONSULTANCY - JAVASCRIPT
   ======================================== */

// ========================================
// NAVIGATION & HAMBURGER MENU
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      navLinks.classList.remove('active');
      setActiveNav(this.getAttribute('href'));
    });
  });

  // Set active navigation link
  function setActiveNav(page) {
    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === page) {
        link.classList.add('active');
      }
    });
  }

  // Initialize active nav on page load
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  setActiveNav(currentPage);
});

// ========================================
// WHATSAPP FLOATING BUTTON
// ========================================

function initWhatsAppButton() {
  const whatsappButton = document.querySelector('.whatsapp-float');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', function () {
      // Replace with actual WhatsApp number
      const phoneNumber = '+919999999999'; // Example number
      const message = 'Hello! I would like to know more about your Vastu consultancy services.';
      const whatsappURL = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');
    });
  }
}

initWhatsAppButton();

// ========================================
// FORM VALIDATION
// ========================================

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;
    
    this.setupValidation();
  }

  setupValidation() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', (e) => this.validateField(e.target));
      input.addEventListener('input', (e) => {
        if (e.target.classList.contains('invalid')) {
          this.validateField(e.target);
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    const errorElement = field.nextElementSibling;

    // Clear previous error state
    field.classList.remove('invalid');
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.classList.remove('show');
    }

    // Validation rules
    if (field.name === 'name') {
      isValid = value.length >= 2;
      if (!isValid && errorElement) {
        errorElement.textContent = 'Name must be at least 2 characters.';
      }
    } else if (field.name === 'email') {
      isValid = this.isValidEmail(value);
      if (!isValid && errorElement) {
        errorElement.textContent = 'Please enter a valid email address.';
      }
    } else if (field.name === 'phone') {
      isValid = /^[0-9\s\-\+\(\)]{10,}$/.test(value) || value === '';
      if (!isValid && errorElement) {
        errorElement.textContent = 'Please enter a valid phone number.';
      }
    } else if (field.name === 'message') {
      isValid = value.length >= 10;
      if (!isValid && errorElement) {
        errorElement.textContent = 'Message must be at least 10 characters.';
      }
    }

    // Set invalid state
    if (!isValid && value !== '') {
      field.classList.add('invalid');
      if (errorElement) {
        errorElement.classList.add('show');
      }
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleSubmit(e) {
    e.preventDefault();

    const inputs = this.form.querySelectorAll('input, textarea');
    let isFormValid = true;

    inputs.forEach(input => {
      if (input.type !== 'file' && !this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      this.submitForm();
    }
  }

  submitForm() {
    // Get form data
    const formData = new FormData(this.form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || 'Not provided',
      message: formData.get('message'),
      timestamp: new Date().toISOString()
    };

    // Log to console (in production, send to backend)
    console.log('Form submitted:', data);

    // Show success message
    this.showSuccessMessage();

    // Reset form
    this.form.reset();
  }

  showSuccessMessage() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = '✓ Message Sent Successfully!';
    submitBtn.style.background = '#27ae60';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', function () {
  new FormValidator('contactForm');
});

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.card, .codex-item');
  elements.forEach(el => observer.observe(el));
});

// Add fade-in animation class
const style = document.createElement('style');
style.textContent = `
  .card, .codex-item {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .card.fade-in, .codex-item.fade-in {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ========================================
// SERVICE CARD HOVER ANIMATION
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.service-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// ========================================
// MODAL FOR CONSULTATION BOOKING
// ========================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }
});

// ========================================
// CALENDLY INTEGRATION PLACEHOLDER
// ========================================

function redirectToCalendly() {
  // Replace with actual Calendly link
  window.open('https://calendly.com/your-username', '_blank');
}

// ========================================
// RESPONSIVE BEHAVIOR
// ========================================

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Hide/show header on scroll
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    header.style.opacity = '0.95';
  } else {
    // Scrolling up
    header.style.opacity = '1';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================================
// UTILITY: Scroll to Top Button
// ========================================

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show scroll-to-top button on scroll
window.addEventListener('scroll', function () {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  }
});

console.log('Vastu Shastra Consultancy Website - JavaScript Loaded Successfully');
