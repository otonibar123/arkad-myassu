/* ============================================
   MyAssu.fr — Main JS
   ============================================ */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Scroll animations (fade-up)
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Apply fade-up to cards and sections
document.querySelectorAll('.service-card, .advantage-card, .stat-item, .cta-card').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Callback modal
const callbackOverlay = document.getElementById('callbackModal');
if (callbackOverlay) {
  const callbackForm = document.getElementById('callbackForm');
  const callbackSuccess = document.getElementById('callbackSuccess');

  // Open
  document.querySelectorAll('.callback-float').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      callbackOverlay.classList.add('active');
    });
  });

  // Close on X button
  callbackOverlay.querySelector('.modal-close').addEventListener('click', () => {
    callbackOverlay.classList.remove('active');
  });

  // Close on overlay click
  callbackOverlay.addEventListener('click', (e) => {
    if (e.target === callbackOverlay) callbackOverlay.classList.remove('active');
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') callbackOverlay.classList.remove('active');
  });

  // Submit
  callbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    callbackForm.style.display = 'none';
    callbackSuccess.classList.add('visible');
    setTimeout(() => {
      callbackOverlay.classList.remove('active');
      setTimeout(() => {
        callbackForm.style.display = '';
        callbackForm.reset();
        callbackSuccess.classList.remove('visible');
      }, 300);
    }, 2500);
  });
}

// Animated counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(target * eased);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
