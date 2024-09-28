// Hamburger Menu Functionality
const hamburgerBtn = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  hamburgerBtn.classList.toggle('close');
  hamburgerBtn.setAttribute('aria-expanded', navMenu.classList.contains('show')); // Update aria-expanded
});

// Footer Copyright Year Update
const currentYear = new Date().getFullYear();
const copyrightYear = document.querySelector('.copyright-year');
copyrightYear.textContent = currentYear;
