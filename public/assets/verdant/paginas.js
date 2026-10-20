(() => {
  const top = document.querySelector('.top');
  const button = top && top.querySelector('.top__burger');
  if (!button) return;
  const set = open => { top.classList.toggle('is-open', open); button.setAttribute('aria-expanded', String(open)); button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); };
  button.addEventListener('click', () => set(!top.classList.contains('is-open')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  matchMedia('(min-width: 981px)').addEventListener('change', e => { if (e.matches) set(false); });
})();
