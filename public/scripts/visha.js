/**
 * gikomba.app — Shared UI helpers
 * Injects the site navbar and manages dark mode persistence.
 */

/* ─── Dark Mode (runs immediately to prevent flash) ─────────── */
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

/* ─── Nav links ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",         href: "index.html" },
  { label: "How It Works", href: "how.html" },
  { label: "Community",    href: "community.html" },
  { label: "Blog",         href: "blog.html" },
  { label: "Support",      href: "support.html" },
];

/* ─── Navbar injection ──────────────────────────────────────── */
function injectNavbar() {
  const placeholder = document.getElementById("site-nav");
  if (!placeholder) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const desktopLinks = NAV_LINKS.map(({ label, href }) => {
    const isActive = href === currentPage;
    const baseClass = "text-sm font-semibold transition-colors px-1 py-0.5";
    const activeClass = `${baseClass} text-secondary dark:text-primary border-b-2 border-secondary dark:border-primary`;
    const idleClass   = `${baseClass} text-ink dark:text-ink-dark hover:text-secondary dark:hover:text-primary`;
    return `<a href="${href}" class="${isActive ? activeClass : idleClass}"${isActive ? ' aria-current="page"' : ""}>${label}</a>`;
  }).join("");

  const mobileLinks = NAV_LINKS.map(({ label, href }) => {
    const isActive = href === currentPage;
    return `<a href="${href}" class="block text-base font-semibold py-3 border-b border-ink/10 dark:border-[#444]/40 ${isActive ? "text-secondary dark:text-primary" : "text-ink dark:text-ink-dark hover:text-secondary dark:hover:text-primary"} transition-colors"${isActive ? ' aria-current="page"' : ""}>${label}</a>`;
  }).join("");

  placeholder.innerHTML = `
    <header class="sticky top-0 z-50 bg-white dark:bg-[#0F0F0F] border-b-2 border-ink dark:border-[#444]">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-3 sm:py-4 flex items-center justify-between gap-4">

        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-2 shrink-0" aria-label="gikomba.app home">
          <div class="w-8 h-8 bg-primary border-2 border-ink flex items-center justify-center">
            <span class="material-symbols-outlined text-ink" style="font-size:18px">local_mall</span>
          </div>
          <span style="font-family:'Syne',sans-serif; font-weight:800; font-size:1.1rem;" class="text-ink dark:text-ink-dark tracking-tight">
            gikomba<span style="color:#7B4FC4">.app</span>
          </span>
        </a>

        <!-- Desktop nav (hidden below lg) -->
        <nav class="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          ${desktopLinks}
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center gap-2">

          <!-- Dark mode toggle -->
          <button
            onclick="toggleDarkMode()"
            aria-label="Toggle dark mode"
            class="p-2 border-2 border-ink dark:border-[#444] bg-white dark:bg-[#1A1A1A] text-ink dark:text-ink-dark hover:bg-primary dark:hover:bg-primary dark:hover:text-ink transition-colors"
          >
            <span class="material-symbols-outlined dark-toggle-icon" style="font-size:18px">dark_mode</span>
          </button>

          <!-- Join CTA (hidden on xs, visible from sm) -->
          <a
            href="registration.html"
            class="hidden sm:inline-flex items-center gap-1 bg-primary text-ink border-2 border-ink font-bold text-sm px-4 py-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:[box-shadow:none] transition-all"
            style="box-shadow:3px 3px 0 #111"
          >
            Join Free
          </a>

          <!-- Hamburger (visible below lg) -->
          <button
            id="mobile-menu-btn"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
            onclick="toggleMobileMenu()"
            class="lg:hidden p-2 border-2 border-ink dark:border-[#444] bg-white dark:bg-[#1A1A1A] text-ink dark:text-ink-dark"
          >
            <span class="material-symbols-outlined" style="font-size:20px" id="hamburger-icon">menu</span>
          </button>
        </div>
      </div>

      <!-- Mobile drawer -->
      <div
        id="mobile-menu"
        class="hidden lg:hidden border-t-2 border-ink dark:border-[#444] bg-white dark:bg-[#0F0F0F] px-5 py-2"
        role="navigation"
        aria-label="Mobile navigation"
      >
        ${mobileLinks}
        <a
          href="registration.html"
          class="mt-3 mb-1 flex items-center justify-center gap-2 bg-primary text-ink border-2 border-ink font-bold py-3 text-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:[box-shadow:none] transition-all"
          style="box-shadow:3px 3px 0 #111"
        >
          Join Free
          <span class="material-symbols-outlined" style="font-size:16px">arrow_forward</span>
        </a>
      </div>
    </header>
  `;

  updateDarkToggleIcon();
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const btn  = document.getElementById("mobile-menu-btn");
  const icon = document.getElementById("hamburger-icon");
  const isOpen = !menu.classList.contains("hidden");

  menu.classList.toggle("hidden");
  btn.setAttribute("aria-expanded", String(!isOpen));
  icon.textContent = isOpen ? "menu" : "close";
}

/* ─── Close mobile menu on outside click ───────────────────── */
document.addEventListener("click", (e) => {
  const menu = document.getElementById("mobile-menu");
  const btn  = document.getElementById("mobile-menu-btn");
  if (!menu || menu.classList.contains("hidden")) return;
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.add("hidden");
    btn.setAttribute("aria-expanded", "false");
    const icon = document.getElementById("hamburger-icon");
    if (icon) icon.textContent = "menu";
  }
});

document.addEventListener("DOMContentLoaded", injectNavbar);