/* ══════════════════════════════════════════════════
   MERRILL DIGITAL SYSTEMS | MAIN SCRIPT
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── CANVAS AMBIENT CIRCUIT ── */
  (function () {
    const cv = document.getElementById('pc');
    if (!cv) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = cv.getContext('2d');
    const [R, G, B] = [91, 155, 213];
    const rgba = a  => `rgba(${R},${G},${B},${a.toFixed(3)})`;
    const rand = (lo, hi) => lo + Math.random() * (hi - lo);

    let W, H, walkers, raf;

    const CELL  = 62;   // grid cell px — matches the dot-grid texture visually
    const SPEED = 1.4;  // px per frame (one cell ≈ 0.74s at 60fps)
    const TRAIL = 9;    // max trail nodes per walker
    const COUNT = 22;   // concurrent walker target
    const DIR   = [[1,0],[0,1],[-1,0],[0,-1]]; // R  D  L  U

    function mkWalker() {
      const dir = Math.floor(rand(0, 4));
      const gx  = Math.floor(rand(0, Math.ceil(W / CELL)));
      const gy  = Math.floor(rand(0, Math.ceil(H / CELL)));
      const x   = gx * CELL, y = gy * CELL;
      return {
        gx, gy, dir,
        x, y,
        nx: x + DIR[dir][0] * CELL,
        ny: y + DIR[dir][1] * CELL,
        trail:  [],                          // historical grid points [{x,y}]
        age:    0,
        maxAge: Math.floor(rand(6, TRAIL + 1)),
        spd:    rand(0.8, 1.6),              // per-walker speed variance
        done:   false,
        fadeT:  0,                           // frame counter for fade-out
      };
    }

    function turn(d) {
      const r = Math.random();
      return r < 0.52 ? d : r < 0.76 ? (d + 1) % 4 : (d + 3) % 4;
    }

    function resize() {
      cancelAnimationFrame(raf);
      W = cv.width  = window.innerWidth;
      H = cv.height = window.innerHeight;
      walkers = Array.from({ length: Math.floor(COUNT * 0.65) }, mkWalker);
      tick();
    }

    function tick() {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);

      /* Maintain target walker count */
      while (walkers.length < COUNT) walkers.push(mkWalker());
      walkers = walkers.filter(w => !(w.done && w.trail.length === 0));

      walkers.forEach(w => {

        /* ── Advance head ── */
        if (!w.done) {
          const dx = w.nx - w.x, dy = w.ny - w.y;
          const d  = Math.sqrt(dx * dx + dy * dy);

          if (d <= w.spd * SPEED) {
            /* Snapped to next grid point */
            w.x = w.nx; w.y = w.ny;
            w.gx += DIR[w.dir][0];
            w.gy += DIR[w.dir][1];
            w.trail.push({ x: w.x, y: w.y });
            while (w.trail.length > w.maxAge) w.trail.shift(); // sliding window
            w.age++;

            const cw = Math.ceil(W / CELL) + 1, ch = Math.ceil(H / CELL) + 1;
            if (w.gx < -1 || w.gx > cw || w.gy < -1 || w.gy > ch || w.age >= w.maxAge) {
              w.done = true;   // out of bounds or lifespan reached → start dying
            } else {
              w.dir = turn(w.dir);
              w.nx  = w.x + DIR[w.dir][0] * CELL;
              w.ny  = w.y + DIR[w.dir][1] * CELL;
            }
          } else {
            w.x += dx / d * w.spd * SPEED;
            w.y += dy / d * w.spd * SPEED;
          }

        } else {
          /* Dying: erode trail from the tail, one node every 4 frames */
          w.fadeT++;
          if (w.fadeT % 4 === 0 && w.trail.length > 0) w.trail.shift();
        }

        /* ── Draw ── */
        const pts = w.done
          ? w.trail
          : [...w.trail, { x: w.x, y: w.y }];
        const n = pts.length;
        if (n < 2) return;

        for (let i = 0; i < n - 1; i++) {
          const t = (i + 1) / n;        // 0 at tail → 1 at head
          const a = t * t * 0.25;       // quadratic fade, max ~0.25 — stays subtle

          /* Trace segment */
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
          ctx.strokeStyle = rgba(a);
          ctx.lineWidth   = 1;
          ctx.stroke();

          /* PCB junction pad at each waypoint */
          ctx.beginPath();
          ctx.arc(pts[i].x, pts[i].y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = rgba(a * 0.7);
          ctx.fill();
        }

        /* Bright lead dot — the only element that "moves" visibly */
        if (!w.done) {
          ctx.beginPath();
          ctx.arc(w.x, w.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = rgba(0.50);
          ctx.fill();
        }
      });
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
          // Fire GA4 conversion event
          if (typeof gtag !== 'undefined') {
            gtag('event', 'generate_lead', { event_category: 'Contact', event_label: 'Form Submission', value: 1 });
          }
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
