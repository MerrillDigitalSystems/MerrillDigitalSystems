/* ══════════════════════════════════════════════════
   MERRILL DIGITAL SYSTEMS | MAIN SCRIPT
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── PARTICLE NETWORK ── */
  (function () {
    const c = document.getElementById('pc');
    if (!c) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      c.style.display = 'none';
      return;
    }
    const ctx = c.getContext('2d');
    let W, H, pts = [];
    const N = 90, CD = 145, MD = 170;
    const G = 'rgba(91,155,213,', B = 'rgba(74,111,165,';
    let mx = -9999, my = -9999;

    function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }

    function Pt() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.vx = (Math.random() - .5) * .38; this.vy = (Math.random() - .5) * .38;
      this.r = Math.random() * 1.8 + .5;
      this.col = Math.random() > .6 ? G : B;
    }

    function init() { pts = []; for (let i = 0; i < N; i++) pts.push(new Pt()); }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < N; i++) {
        const a = pts[i];
        for (let j = i + 1; j < N; j++) {
          const b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < CD) {
            const op = (1 - d / CD) * .35;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = G + op + ')'; ctx.lineWidth = .55; ctx.stroke();
          }
        }
        const ddx = a.x - mx, ddy = a.y - my, dd = Math.hypot(ddx, ddy);
        if (dd < MD) {
          const op = (1 - dd / MD) * .6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my);
          ctx.strokeStyle = G + op + ')'; ctx.lineWidth = .8; ctx.stroke();
        }
      }
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + '.65)'; ctx.fill();
      }
    }

    function update() {
      for (let i = 0; i < N; i++) {
        const p = pts[i], dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < 85) { p.vx += (dx / d) * .045; p.vy += (dy / d) * .045; }
        const s = Math.hypot(p.vx, p.vy);
        if (s > .85) { p.vx *= .85 / s; p.vy *= .85 / s; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }
    }

    function loop() { update(); draw(); requestAnimationFrame(loop); }

    window.addEventListener('resize', () => { resize(); init(); });
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    window.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });
    resize(); init(); loop();
  })();

  /* ── SCROLL REVEAL (.rv, .rl, .rr → .up) ── */
  (function () {
    const els = document.querySelectorAll('.rv, .rl, .rr');
    if (!els.length) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(x => {
          if (x.isIntersecting) { x.target.classList.add('up'); io.unobserve(x.target); }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
  })();

  /* ── PROCESS LINE FILL ── */
  (function () {
    const f = document.getElementById('plf');
    if (!f) return;
    const io = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { f.style.width = '100%'; io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(f.parentElement);
  })();

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.fitem').forEach(item => {
    item.addEventListener('click', () => {
      const was = item.classList.contains('open');
      document.querySelectorAll('.fitem.open').forEach(i => i.classList.remove('open'));
      if (!was) item.classList.add('open');
    });
  });

  /* ── SERVICES DROPDOWN ── */
  document.querySelectorAll('.nav-has-dropdown').forEach(container => {
    const menu = container.querySelector('.nav-dropdown-menu');
    if (!menu) return;
    let closeTimer = null;

    function openMenu() {
      clearTimeout(closeTimer);
      container.classList.add('open');
      menu.classList.add('open');
    }

    function scheduleClose() {
      closeTimer = setTimeout(() => {
        container.classList.remove('open');
        menu.classList.remove('open');
      }, 180);
    }

    container.addEventListener('mouseenter', openMenu);
    container.addEventListener('mouseleave', scheduleClose);
    menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    menu.addEventListener('mouseleave', scheduleClose);

    // Close on click outside (touch devices)
    document.addEventListener('click', e => {
      if (!container.contains(e.target)) {
        container.classList.remove('open');
        menu.classList.remove('open');
      }
    });
  });

  /* ── MOBILE NAV TOGGLE ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', e => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── ACTIVE NAV HIGHLIGHT ── */
  (function () {
    const secs = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nl a');
    if (!secs.length || !links.length) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(x => {
          if (x.isIntersecting) {
            links.forEach(l => l.classList.remove('active'));
            const a = document.querySelector(`.nl a[href="#${x.target.id}"]`);
            if (a) a.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    secs.forEach(s => io.observe(s));
  })();

  /* ── ROI CALCULATOR ── */
  const calcEmp = document.getElementById('calc-employees');
  const calcHrs = document.getElementById('calc-hours');
  const calcRt  = document.getElementById('calc-rate');
  const roiMo   = document.getElementById('roi-monthly');
  const roiAn   = document.getElementById('roi-annual');
  const roiPb   = document.getElementById('roi-payback');

  if (calcEmp && calcHrs && calcRt && roiMo && roiAn && roiPb) {
    const fmt = n => new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0
    }).format(n);

    function updateROI() {
      const emp     = parseFloat(calcEmp.value) || 0;
      const hrs     = parseFloat(calcHrs.value) || 0;
      const rt      = parseFloat(calcRt.value)  || 0;
      const monthly = emp * hrs * rt * 4.33;
      const annual  = emp * hrs * rt * 52;

      roiMo.textContent = fmt(monthly);
      roiAn.textContent = fmt(annual);

      if (monthly > 0) {
        const pb = 15000 / monthly;
        roiPb.textContent = pb < 1 ? '< 1 Month' : pb > 24 ? '24+ Months' : `${pb.toFixed(1)} Months`;
      } else {
        roiPb.textContent = 'N/A';
      }
    }

    [calcEmp, calcHrs, calcRt].forEach(inp => {
      inp.addEventListener('input', updateROI);
      inp.addEventListener('change', updateROI);
    });
    updateROI();
  }

  /* ── CONTACT FORM (FORMSPREE) ── */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const formAction = contactForm.getAttribute('action');

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const sbtn = this.querySelector('.sbtn, button[type="submit"]');
      if (!sbtn) return;
      const orig = sbtn.innerHTML;
      sbtn.disabled = true;
      sbtn.innerHTML = 'Sending...';

      try {
        const res = await fetch(formAction, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          sbtn.innerHTML = 'Message Sent! ✓';
          sbtn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
          contactForm.reset();
          setTimeout(() => {
            sbtn.innerHTML = orig;
            sbtn.style.background = '';
            sbtn.disabled = false;
          }, 4000);
        } else {
          throw new Error('Submit failed');
        }
      } catch (err) {
        sbtn.innerHTML = 'Failed  -  email us directly';
        sbtn.style.background = 'linear-gradient(135deg,#dc2626,#b91c1c)';
        setTimeout(() => {
          sbtn.innerHTML = orig;
          sbtn.style.background = '';
          sbtn.disabled = false;
        }, 4000);
      }
    });
  }

  /* ── SHIMMER EFFECT ON FEATURED SERVICE CARD BARS ── */
  const ftCard = document.querySelector('.sc.ft');
  if (ftCard) {
    ftCard.addEventListener('mouseenter', () => {
      ftCard.querySelectorAll('.bar').forEach(b => {
        b.style.background = 'rgba(91,155,213,.5)';
      });
    });
    ftCard.addEventListener('mouseleave', () => {
      ftCard.querySelectorAll('.bar').forEach(b => {
        b.style.background = '';
      });
    });
  }

})();
