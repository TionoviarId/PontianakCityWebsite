// Inject nav
function renderNav() {
  const pages = [
    { href: 'index.html', label: 'Beranda' },
    { href: 'regions.html', label: 'Kawasan' },
    { href: 'activities.html', label: 'Aktivitas' },
    { href: 'culinary.html', label: 'Kuliner' },
    { href: 'planning.html', label: 'Perencanaan' },
    { href: 'itineraries.html', label: 'Itinerari' },
    { href: 'culture.html', label: 'Budaya' },
    { href: 'responsible.html', label: 'Responsibel' },
    { href: 'stays.html', label: 'Menginap' },
    { href: 'support.html', label: 'Bantuan' },
  ];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navHTML = `
  <nav id="mainNav">
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-icon">🦅</div>
      <div>
        <span>Pontianak</span>
        <small>Kota Khatulistiwa</small>
      </div>
    </a>
    <ul class="nav-links" id="navLinks">
      ${pages.map(p => `<li><a href="${p.href}" ${p.href===currentPage?'class="active"':''}>${p.label}</a></li>`).join('')}
      <li class="nav-cta"><a href="visit.html">Kunjungi</a></li>
    </ul>
    <button class="nav-hamburger" id="navHam" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="nav-overlay" id="navOverlay"></div>`;
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // Wire up hamburger IMMEDIATELY after injecting — no DOMContentLoaded needed
  const ham  = document.getElementById('navHam');
  const nl   = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  function openMenu() {
    nl.classList.add('open');
    ham.classList.add('is-active');
    ham.setAttribute('aria-expanded', 'true');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    nl.classList.remove('open');
    ham.classList.remove('is-active');
    ham.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  ham.addEventListener('click', () => nl.classList.contains('open') ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);

  // Close on nav link tap (mobile UX)
  nl.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Active link
  const cur = window.location.pathname.split('/').pop() || 'index.html';
  nl.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href') === cur) a.classList.add('active');
  });
}

function renderFooter() {
  const footerHTML = `
  <footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="nav-logo" style="text-decoration:none;">
          <div class="nav-logo-icon">🦅</div>
          <div><span>Pontianak</span><small>Kota Khatulistiwa</small></div>
        </a>
        <p>Panduan resmi pariwisata Kota Pontianak, Kalimantan Barat. Menjelajahi kekayaan budaya Melayu, Dayak, Tionghoa di tepian Sungai Kapuas.</p>
      </div>
      <div>
        <h4>Jelajahi</h4>
        <ul>
          <li><a href="regions.html">Kawasan Wisata</a></li>
          <li><a href="culinary.html">Kuliner Khas</a></li>
          <li><a href="activities.html">Aktivitas</a></li>
          <li><a href="stays.html">Penginapan</a></li>
        </ul>
      </div>
      <div>
        <h4>Info Perjalanan</h4>
        <ul>
          <li><a href="planning.html">Cara ke Pontianak</a></li>
          <li><a href="planning.html">Transportasi Lokal</a></li>
          <li><a href="itineraries.html">Itinerari</a></li>
          <li><a href="support.html">Bantuan</a></li>
        </ul>
      </div>
      <div>
        <h4>Tentang</h4>
        <ul>
          <li><a href="culture.html">Budaya & Sejarah</a></li>
          <li><a href="responsible.html">Wisata Bertanggung Jawab</a></li>
          <li><a href="#">Kebijakan Privasi</a></li>
          <li><a href="#">Syarat & Ketentuan</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Dinas Pariwisata Kota Pontianak</span>
      <span><a href="#">Privasi</a> · <a href="#">Ketentuan</a></span>
    </div>
  </footer>`;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

renderNav();
renderFooter();

// Nav scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.style.background = window.scrollY > 60 ? 'rgba(15,26,20,0.98)' : 'rgba(15,26,20,0.92)';
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

setTimeout(() => {
  document.querySelectorAll('.card, .info-box, .reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    revealObserver.observe(el);
  });
}, 150);
