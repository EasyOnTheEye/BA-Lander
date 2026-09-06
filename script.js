const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const navLinks = document.querySelectorAll('#primary-nav a');
const currentYear = document.querySelector('#current-year');
const contactForm = document.querySelector('#contact-form');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const recipient = contactForm.dataset.recipient;
    const subject = String(formData.get('subject') || '').trim();
    const body = [
      `Name: ${String(formData.get('name') || '').trim()}`,
      `Email: ${String(formData.get('email') || '').trim()}`,
      `Topic: ${String(formData.get('topic') || '').trim()}`,
      '',
      String(formData.get('message') || '').trim(),
    ].join('\n');

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    primaryNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (event) => {
    if (!primaryNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
}
