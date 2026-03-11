/**
 * gikomba.app — Shared UI helpers
 * Injects the site navbar and manages dark mode persistence.
 */

/* ─── Dark Mode ─────────────────────────────────────────────── */
(function () {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }
})();

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateDarkToggleIcon();
}

function updateDarkToggleIcon() {
  const isDark = document.documentElement.classList.contains("dark");
  document.querySelectorAll(".dark-toggle-icon").forEach((el) => {
    el.textContent = isDark ? "light_mode" : "dark_mode";
  });
}

/* ─── Navbar injection ──────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",       href: "index.html" },
  { label: "Blog",       href: "blog.html" },
  { label: "Community",  href: "community.html" },
  { label: "How It Works", href: "how.html" },
  { label: "Join",       href: "registration.html" },
  { label: "Support",    href: "support.html" },
];

function injectNavbar() {
  const placeholder = document.getElementById("site-nav");
  if (!placeholder) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const links = NAV_LINKS.map(({ label, href }) => {
    const isActive = href === currentPage;
    return `<a href="${href}" class="${isActive ? "nav-link-active" : "nav-link"}">${label}</a>`;
  }).join("");

  placeholder.innerHTML = `
    <header class="sticky top-0 z-50 bg-surface dark:bg-surface-dark border-b-2 border-ink dark:border-[#444]">
      <div class="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex items-center justify-between gap-6">

        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-2 shrink-0" aria-label="gikomba.app home">
          <div class="w-8 h-8 bg-primary border-2 border-ink flex items-center justify-center">
            <span class="material-symbols-outlined text-ink text-base">local_mall</span>
          </div>
          <span class="font-display font-extrabold text-xl text-ink dark:text-ink-dark tracking-tight">gikomba<span class="text-secondary">.app</span></span>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          ${links}
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <!-- Dark mode toggle -->
          <button
            onclick="toggleDarkMode()"
            aria-label="Toggle dark mode"
            class="p-2 border-2 border-ink dark:border-[#444] bg-surface dark:bg-[#1A1A1A] text-ink dark:text-ink-dark hover:bg-primary dark:hover:bg-primary dark:hover:text-ink transition-colors"
          >
            <span class="material-symbols-outlined dark-toggle-icon text-lg">dark_mode</span>
          </button>

          <!-- Sign up CTA -->
          <a href="registration.html" class="btn-primary text-sm hidden sm:inline-flex items-center gap-1">
            Join Free
          </a>

          <!-- Mobile menu toggle -->
          <button
            id="mobile-menu-btn"
            aria-label="Open navigation menu"
            aria-expanded="false"
            class="lg:hidden p-2 border-2 border-ink dark:border-[#444]"
            onclick="toggleMobileMenu()"
          >
            <span class="material-symbols-outlined text-ink dark:text-ink-dark">menu</span>
          </button>
        </div>
      </div>

      <!-- Mobile nav drawer -->
      <div id="mobile-menu" class="hidden lg:hidden border-t-2 border-ink dark:border-[#444] bg-surface dark:bg-surface-dark px-6 py-4 flex flex-col gap-3">
        ${NAV_LINKS.map(({ label, href }) => `
          <a href="${href}" class="nav-link py-2 border-b border-ink/10 dark:border-[#444]/30">${label}</a>
        `).join("")}
        <a href="registration.html" class="btn-primary text-sm text-center mt-2">Join Free</a>
      </div>
    </header>
  `;

  updateDarkToggleIcon();
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const btn   = document.getElementById("mobile-menu-btn");
  const open  = menu.classList.toggle("hidden");
  btn.setAttribute("aria-expanded", String(!open));
}

document.addEventListener("DOMContentLoaded", () => {
  injectNavbar();
});