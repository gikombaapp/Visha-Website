/**
 * visha — for the collective
 * Client-side: dark mode toggle + mobile menu
 */

/* ─── Dark mode ──────────────────────────────────────────────
   html.dark-pending is set inline before paint (in Layout.astro).
   On DOMContentLoaded we move it to body.dark for scoping.
─────────────────────────────────────────────────────────────── */
(function () {
  if (document.documentElement.classList.contains('dark-pending')) {
    document.documentElement.classList.remove('dark-pending');
    document.body.classList.add('dark');
  }
})();

function setDark(isDark) {
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('visha-theme', isDark ? 'dark' : 'light');
  updateDarkIcon(isDark);
}

function updateDarkIcon(isDark) {
  document.querySelectorAll('.dark-icon').forEach(el => {
    el.textContent = isDark ? 'light_mode' : 'dark_mode';
  });
}

/* Dark toggle button */
document.addEventListener('DOMContentLoaded', () => {
  const isDark = document.body.classList.contains('dark');
  updateDarkIcon(isDark);

  const toggle = document.getElementById('dark-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      setDark(!document.body.classList.contains('dark'));
    });
  }

  /* ─── Mobile menu ──────────────────────────────────────────── */
  const menuBtn  = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      if (hamburgerIcon) hamburgerIcon.textContent = isOpen ? 'menu' : 'close';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        if (hamburgerIcon) hamburgerIcon.textContent = 'menu';
      }
    });
  }
});
