const themeButton = document.querySelector('.theme-toggle');
const brand = document.querySelector('.brand');

themeButton.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  brand.src = isLight ? brand.dataset.lightLogo : brand.dataset.darkLogo;
  themeButton.setAttribute('aria-pressed', String(isLight));
  themeButton.lastElementChild.textContent = isLight ? 'Tema escuro' : 'Tema claro';
});
