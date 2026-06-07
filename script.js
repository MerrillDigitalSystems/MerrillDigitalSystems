/* ══════════════════════════════════════════════════
   MERRILL DIGITAL SYSTEMS | MAIN SCRIPT
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── CANVAS FLOWING NETWORK ── */
  (function () {
    const cv = document.getElementById('pc');
    if (!cv) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = cv.getContext('2d');
    const R = 91, G = 155, B = 213; // --acc colour
    const isMobile = () => window.innerWidth < 768;

    let W, H, nodes, raf;
    const mouse = { x: -9999, y: -9999 };

    function rc(a) { return `rgba(${R},${G},${B},${a})`; }
    function rand(lo, hi) { return lo + Math.random() * (hi - lo); }

    /* Build a soft-grid of nodes so the layout feels architectural, not random */
    function buildNodes() {
      const count = isMobile() ? 90 : 180;
      const cols  = Math.ceil(Math.sqrt(count * W / H));
      const rows  = Math.ceil(count / cols);
      const cw = W / cols, ch = H / rows;
      nodes = [];
      for (let i = 0; i < count; i++) {
        const c = i % cols, r = Math.floor(i / cols);
        const bx = cw * (c + 0.5), by = ch * (r + 0.5);
        nodes.push({
          x:  bx + rand(-cw * 0.32, cw * 0.32),
          y:  by + rand(-ch * 0.32, ch * 0.32),
          bx, by,          // home position — nodes spring back here
          vx: rand(-0.25, 0.25),
          vy: rand(-0.25, 0.25),
          r:  rand(1.8, 3.2),
          ph: rand(0, Math.PI * 2),  // individual pulse phase
        });
      }
    }

    /* ── Data packets & arrival rings ── */
    let packets = [];
    let rings   = [];

    function neighbours(idx) {
      const n  = nodes[idx];
      const D2 = LINK * LINK;
      return nodes.reduce((a, m, j) => {
        if (j !== idx) {
          const dx = n.x - m.x, dy = n.y - m.y;
          if (dx * dx + dy * dy < D2) a.push(j);
        }
        return a;
      }, []);
    }

    const LINK       = 185;   // max edge length
    const MOUSE_R    = 195;   // cursor repulsion radius
    const MOUSE_F    = 5.8;   // repulsion strength

    function mkPacket() {
      const fi = Math.floor(Math.random() * nodes.length);
      const nb = neighbours(fi);
      if (!nb.length) return null;
      const ti = nb[Math.floor(Math.random() * nb.length)];
      return { fi, ti, t: rand(0, 0.6), spd: rand(0.005, 0.012) };
    }

    function resize() {
      cancelAnimationFrame(raf);
      W = cv.width  = window.innerWidth;
      H = cv.height = window.innerHeight;
      buildNodes();
      packets = [];
      rings   = [];
      const target = isMobile() ? 22 : 36;
      for (let i = 0; i < target; i++) {
        const p = mkPacket();
        if (p) packets.push(p);
      }
      tick();
    }

    function tick() {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);
      const now = performance.now() / 1000;

      /* ── Simulate nodes ── */
      nodes.forEach(n => {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_R * MOUSE_R && d2 > 4) {
          const d = Math.sqrt(d2);
          const f = MOUSE_F * (1 - d / MOUSE_R) / d;
          n.vx += dx * f;
          n.vy += dy * f;
        }
        // Spring back toward home
        n.vx += (n.bx - n.x) * 0.007;
        n.vy += (n.by - n.y) * 0.007;
        // Damping
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x  += n.vx;
        n.y  += n.vy;
      });

      /* ── Draw edges ── */
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b  = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = rc((1 - d / LINK) * 0.26);
            ctx.stroke();
          }
        }
      }

      /* ── Draw arrival pulse rings ── */
      rings = rings.filter(rg => {
        rg.age += 0.038;
        if (rg.age > 1) return false;
        const ease = 1 - (1 - rg.age) * (1 - rg.age); // ease-out
        ctx.beginPath();
        ctx.arc(rg.x, rg.y, ease * 24, 0, Math.PI * 2);
        ctx.strokeStyle = rc((1 - rg.age) * 0.55);
        ctx.lineWidth = 1.4;
        ctx.stroke();
        return true;
      });

      /* ── Update & draw packets ── */
      const target = isMobile() ? 22 : 36;
      packets.forEach((p, idx) => {
        p.t += p.spd;

        if (p.t >= 1) {
          // Emit arrival ring at destination
          const dest = nodes[p.ti];
          if (dest) rings.push({ x: dest.x, y: dest.y, age: 0 });

          // Chain the packet to a new neighbour from here
          const nb = neighbours(p.ti);
          if (nb.length) {
            p.fi  = p.ti;
            p.ti  = nb[Math.floor(Math.random() * nb.length)];
            p.t   = 0;
            p.spd = rand(0.005, 0.012);
          } else {
            packets[idx] = mkPacket();
          }
          return;
        }

        const a = nodes[p.fi], b = nodes[p.ti];
        if (!a || !b) { packets[idx] = mkPacket(); return; }

        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;

        // Glow halo
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 13);
        grd.addColorStop(0,   rc(0.88));
        grd.addColorStop(0.4, rc(0.28));
        grd.addColorStop(1,   rc(0));
        ctx.beginPath();
        ctx.arc(x, y, 13, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(215,238,255,0.97)';
        ctx.fill();
      });

      // Top up packets if any were replaced with null
      while (packets.filter(Boolean).length < target) {
        const p = mkPacket();
        if (p) packets.push(p);
        else break;
      }
      packets = packets.filter(Boolean);

      /* ── Draw nodes ── */
      nodes.forEach(n => {
        const pulse = 0.5 + 0.5 * Math.sin(now * 1.7 + n.ph);
        const alpha = 0.48 + 0.38 * pulse;

        // Soft glow halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3.8, 0, Math.PI * 2);
        ctx.fillStyle = rc(0.055 + 0.055 * pulse);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (0.82 + 0.18 * pulse), 0, Math.PI * 2);
        ctx.fillStyle = rc(alpha);
        ctx.fill();
      });
    }

    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
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
