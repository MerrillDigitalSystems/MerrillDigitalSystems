/* ══════════════════════════════════════════════════
   MERRILL DIGITAL SYSTEMS | MAIN SCRIPT
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── CANVAS CIRCUIT BOARD ── */
  (function () {
    const cv = document.getElementById('pc');
    if (!cv) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = cv.getContext('2d');
    const R = 91, G = 155, B = 213;

    function rgba(a) { return `rgba(${R},${G},${B},${a})`; }
    function rand(lo, hi) { return lo + Math.random() * (hi - lo); }
    function snap(v, g) { return Math.round(v / g) * g; }
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function cell() { return window.innerWidth < 768 ? 68 : 56; }

    let W, H, routes, sparks, raf;

    /* Build PCB-style orthogonal routes via right-angle walks on a snapped grid */
    function buildRoutes() {
      routes = [];
      const g = cell();
      const target = Math.round((W * H) / (g * g * 2.8));

      for (let i = 0; i < target; i++) {
        const pts = [];
        let x = snap(rand(g, W - g), g);
        let y = snap(rand(g, H - g), g);
        pts.push({ x, y });

        const turns = Math.floor(rand(2, 7));
        let horiz = Math.random() > 0.5;

        for (let t = 0; t < turns; t++) {
          const steps = Math.ceil(rand(1, 4));
          const sign  = Math.random() > 0.5 ? 1 : -1;
          if (horiz) x = clamp(x + sign * steps * g, 0, W);
          else       y = clamp(y + sign * steps * g, 0, H);
          pts.push({ x, y });
          horiz = !horiz;
        }

        /* Remove consecutive duplicate points (zero-length segments) */
        const clean = pts.filter((p, i) =>
          i === 0 || p.x !== pts[i - 1].x || p.y !== pts[i - 1].y
        );
        if (clean.length >= 2) routes.push(clean);
      }
    }

    /* Sparks: small electrons that travel along a route then jump to a new one */
    function newSpark() {
      if (!routes.length) return null;
      const route = routes[Math.floor(Math.random() * routes.length)];
      const fwd   = Math.random() > 0.5;
      return {
        route,
        seg: fwd ? 0 : route.length - 2,
        t:   Math.random(),
        spd: rand(0.004, 0.010),
        fwd,
      };
    }

    function resize() {
      cancelAnimationFrame(raf);
      W = cv.width  = window.innerWidth;
      H = cv.height = window.innerHeight;
      buildRoutes();
      const count = Math.min(Math.floor(routes.length * 0.48), 90);
      sparks = Array.from({ length: count }, newSpark).filter(Boolean);
      tick();
    }

    function tick() {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);

      /* ── Traces — one batched stroke call ── */
      ctx.beginPath();
      routes.forEach(route => {
        ctx.moveTo(route[0].x, route[0].y);
        for (let i = 1; i < route.length; i++) ctx.lineTo(route[i].x, route[i].y);
      });
      ctx.strokeStyle = rgba(0.07);
      ctx.lineWidth   = 1;
      ctx.stroke();

      /* ── Junction pads — one batched fill call ── */
      ctx.fillStyle = rgba(0.14);
      ctx.beginPath();
      routes.forEach(route =>
        route.forEach(pt => {
          ctx.moveTo(pt.x + 2.5, pt.y);          // move before arc to start new subpath
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        })
      );
      ctx.fill();

      /* ── Sparks ── */
      const targetCount = Math.min(Math.floor(routes.length * 0.48), 90);
      sparks = sparks.map(s => {
        if (!s) return newSpark();
        s.t += s.spd;

        if (s.t > 1) {
          s.t   = 0;
          s.seg += s.fwd ? 1 : -1;
          if (s.seg < 0 || s.seg >= s.route.length - 1) return newSpark(); // reached end → new route
        }

        const a = s.route[s.seg], b = s.route[s.seg + 1];
        if (!a || !b) return newSpark();

        const x = a.x + (b.x - a.x) * s.t;
        const y = a.y + (b.y - a.y) * s.t;

        /* Small soft glow — intentionally subtle so it reads as background */
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 7);
        grd.addColorStop(0, rgba(0.55));
        grd.addColorStop(1, rgba(0));
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        /* Bright core dot (small) */
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(208,235,255,0.95)';
        ctx.fill();

        return s;
      }).filter(Boolean);

      /* Top up if any sparks were culled */
      while (sparks.length < targetCount) {
        const s = newSpark();
        if (s) sparks.push(s); else break;
      }
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
  })();

  /* ── STICKY MOBILE CTA ── */
  (function () {
    const bar = document.getElementById('stickyCta');
    if (!bar) return;
    const hero = document.querySelector('.hero');
    const contact = document.getElementById('contact');
    let heroBottom = 0;

    function measure() {
      heroBottom = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 400;
    }

    function onScroll() {
      const y = window.scrollY;
      const nearContact = contact && (window.scrollY + window.innerHeight >= contact.offsetTop - 80);
      if (y > heroBottom && !nearContact) {
        bar.classList.add('visible');
        bar.setAttribute('aria-hidden', 'false');
      } else {
        bar.classList.remove('visible');
        bar.setAttribute('aria-hidden', 'true');
      }
    }

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { measure(); onScroll(); });
    onScroll();
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
    const trigger = container.querySelector('.nav-dropdown-trigger');
    if (!menu || !trigger) return;
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
      }, 420);
    }

    // Track trigger and menu directly to avoid flaky wrapper mouseleave behavior.
    trigger.addEventListener('mouseenter', openMenu);
    trigger.addEventListener('mouseleave', scheduleClose);
    menu.addEventListener('mouseenter', openMenu);
    menu.addEventListener('mouseleave', scheduleClose);

    trigger.addEventListener('click', e => {
      if (window.innerWidth > 640) {
        e.preventDefault();
        const isOpen = menu.classList.contains('open');
        document.querySelectorAll('.nav-dropdown-menu.open').forEach(openMenuEl => {
          openMenuEl.classList.remove('open');
          openMenuEl.closest('.nav-has-dropdown')?.classList.remove('open');
        });
        if (!isOpen) openMenu();
      }
    });

    // Close on click outside (touch devices)
    document.addEventListener('click', e => {
      if (!container.contains(e.target)) {
        clearTimeout(closeTimer);
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
  const roiCta  = document.getElementById('roi-cta');

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
        if (roiCta) roiCta.innerHTML = `Save ${fmt(monthly)}/mo on Admin Work <span class="arr">→</span>`;
      } else {
        roiPb.textContent = 'N/A';
        if (roiCta) roiCta.innerHTML = `Stop Burning Money on Busywork <span class="arr">→</span>`;
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
          sbtn.innerHTML = 'Message Sent';
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
