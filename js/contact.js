/* ============================================
   Contact & Devis — JS
   ============================================ */

// Tab switching
document.querySelectorAll('.form-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.querySelector(`[data-panel="${target}"]`).classList.add('active');
  });
});

// File input display
document.querySelectorAll('.file-input').forEach(input => {
  input.addEventListener('change', () => {
    const nameEl = input.parentElement.querySelector('.file-name');
    if (input.files.length > 0) {
      nameEl.textContent = input.files[0].name;
    } else {
      nameEl.textContent = 'Aucun fichier sélectionné';
    }
  });
});

// Form submission (demo — replace with real endpoint)
document.querySelectorAll('#devisForm, #contactForm').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const wrapper = document.querySelector('.contact-form-wrapper');
    const tabs = wrapper.querySelector('.form-tabs');
    const success = document.getElementById('formSuccess');

    // Hide forms and tabs
    document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
    tabs.style.display = 'none';

    // Show success
    success.classList.add('visible');
  });
});
