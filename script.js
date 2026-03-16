/* ══════════════════════════════════════════════════
   MERRILL DIGITAL SYSTEMS | MAIN SCRIPT
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── NAVBAR SCROLL EFFECT ── */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    function handleNavScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
  }

  /* ── MOBILE NAV TOGGLE ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── CONTACT FORM HANDLER ── */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const formAction = contactForm.getAttribute('action');
    const isFormspreeConfigured = formAction && !formAction.includes('YOUR_FORMSPREE_ID');

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const btn = this.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;

      if (!isFormspreeConfigured) {
        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      try {
        const res = await fetch(formAction, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
          btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
          contactForm.reset();
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        } else {
          throw new Error('Submit failed');
        }
      } catch (err) {
        btn.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i> Send failed. Try emailing us.';
        btn.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      }
    });
  }

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');

  if (sections.length && navLinks) {
    function highlightNav() {
      const scrollY = window.scrollY + 200;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = navLinks.querySelector(`a[href="#${id}"]`);

        if (link && !link.classList.contains('nav-cta')) {
          const isActive = scrollY >= top && scrollY < top + height;
          link.classList.toggle('active', isActive);
        }
      });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
  }

  /* ══════════════════════════════════════════════════
     HERO CANVAS | FLOATING PARTICLES & CONNECTIONS
     ══════════════════════════════════════════════════ */
  const canvas = document.getElementById('heroCanvas');

  if (canvas) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      canvas.style.display = 'none';
    } else {
      const ctx = canvas.getContext('2d');
      let particles = [];
      let mouse = { x: null, y: null };
      let animId;

      function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
      });

      class Particle {
        constructor() {
          this.reset();
        }

        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 0.8;
          this.speedX = (Math.random() - 0.5) * 0.6;
          this.speedY = (Math.random() - 0.5) * 0.6;
          this.opacity = Math.random() * 0.5 + 0.15;
          this.hue = Math.random() > 0.5 ? 240 : 190;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (mouse.x !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              const force = (150 - dist) / 150;
              this.x -= dx * force * 0.01;
              this.y -= dy * force * 0.01;
            }
          }

          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
          ctx.fill();
        }
      }

      function initParticles() {
        const isNarrow = canvas.width < 768;
        const count = Math.min(
          Math.floor((canvas.width * canvas.height) / (isNarrow ? 18000 : 12000)),
          isNarrow ? 60 : 120
        );
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push(new Particle());
        }
      }

      function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {
              const opacity = (1 - dist / 140) * 0.15;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(74, 111, 165, ${opacity})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
          p.update();
          p.draw();
        });

        drawConnections();
        animId = requestAnimationFrame(animateCanvas);
      }

      initParticles();
      animateCanvas();

      window.addEventListener('resize', () => {
        cancelAnimationFrame(animId);
        initParticles();
        animateCanvas();
      });
    }
  }

  /* ── FAQ ACCORDION ── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(other => {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── TILT EFFECT ON SERVICE CARDS (desktop only to avoid squeezed layout on mobile) ── */
  const serviceCards = document.querySelectorAll('.service-card');
  const tiltEnabled = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    window.matchMedia('(min-width: 769px)').matches;

  if (serviceCards.length) {
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (!tiltEnabled()) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── MAGNETIC EFFECT ON CTA BUTTONS ── */
  const ctaButtons = document.querySelectorAll('.btn-primary');

  if (ctaButtons.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ctaButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── WORK CARDS: CODE & DEMO TOGGLES ── */
  document.querySelectorAll('.work-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.work-card');
      const kind = btn.getAttribute('data-work-toggle');
      const isCode = kind === 'code';
      const panel = card.querySelector(isCode ? '.work-code-wrap' : '.work-demo-wrap');
      const otherPanel = card.querySelector(isCode ? '.work-demo-wrap' : '.work-code-wrap');
      const otherBtn = card.querySelector(isCode ? '[data-work-toggle="demo"]' : '[data-work-toggle="code"]');
      const isOpen = !panel.hidden;

      if (isOpen) {
        panel.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        if (otherPanel && !otherPanel.hidden) {
          otherPanel.hidden = true;
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
        panel.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── PRIMIS DEMO: LOG SET ── */
  const primisLogBtn = document.getElementById('primis-log-btn');
  const primisWeight = document.getElementById('primis-weight');
  const primisReps = document.getElementById('primis-reps');
  const primisResult = document.getElementById('primis-result');

  if (primisLogBtn && primisWeight && primisReps && primisResult) {
    let primisStreak = 0;
    primisLogBtn.addEventListener('click', () => {
      const w = primisWeight.value || '0';
      const r = primisReps.value || '0';
      primisStreak += 1;
      primisResult.textContent = `Logged ${w} lb × ${r}. Streak: ${primisStreak} ${primisStreak === 1 ? 'day' : 'days'}.`;
    });
  }

  /* ── OPS DEMO: JOB STATUS (custom dropdown) ── */
  const opsStatusBtn = document.getElementById('ops-status-btn');
  const opsStatusList = document.getElementById('ops-status-list');
  const opsResult = document.getElementById('ops-result');

  if (opsStatusBtn && opsStatusList && opsResult) {
    const options = opsStatusList.querySelectorAll('.work-demo-select-option');

    function closeOpsDropdown() {
      opsStatusBtn.setAttribute('aria-expanded', 'false');
      opsStatusList.hidden = true;
      opsStatusList.removeAttribute('style');
    }

    function setStatus(label) {
      opsStatusBtn.querySelector('.work-demo-select-value').textContent = label;
      opsResult.textContent = `Status set to "${label}".`;
      options.forEach(opt => opt.setAttribute('aria-selected', opt.getAttribute('data-label') === label ? 'true' : 'false'));
    }

    opsStatusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = opsStatusList.hidden === false;
      if (isOpen) {
        closeOpsDropdown();
      } else {
        const rect = opsStatusBtn.getBoundingClientRect();
        opsStatusList.style.position = 'fixed';
        opsStatusList.style.top = rect.bottom + 'px';
        opsStatusList.style.left = rect.left + 'px';
        opsStatusList.style.width = rect.width + 'px';
        opsStatusList.style.minWidth = rect.width + 'px';
        opsStatusBtn.setAttribute('aria-expanded', 'true');
        opsStatusList.hidden = false;
      }
    });

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const label = opt.getAttribute('data-label');
        setStatus(label);
        closeOpsDropdown();
      });
    });

    document.addEventListener('click', (e) => {
      if (!opsStatusBtn.contains(e.target) && !opsStatusList.contains(e.target)) closeOpsDropdown();
    });

    window.addEventListener('scroll', () => { if (!opsStatusList.hidden) closeOpsDropdown(); }, true);
  }

  /* ── STRUCTURA DEMO: ADD CHECKLIST ── */
  const structuraValidateBtn = document.getElementById('structura-validate-btn');
  const structuraInput = document.getElementById('structura-input');
  const structuraResult = document.getElementById('structura-result');

  if (structuraValidateBtn && structuraInput && structuraResult) {
    structuraValidateBtn.addEventListener('click', () => {
      const title = structuraInput.value.trim();
      if (!title) {
        structuraResult.textContent = 'Enter a checklist title.';
        return;
      }
      structuraResult.textContent = `Checklist "${title}" added (mock).`;
    });
  }

  /* ── DIRECTORY DEMO: SEARCH ── */
  const directorySearch = document.getElementById('directory-search');
  const directorySearchBtn = document.getElementById('directory-search-btn');
  const directoryResult = document.getElementById('directory-result');
  const mockDirectory = ['Alex Chen', 'Jordan Lee', 'Sam Rivera', 'Morgan Taylor'];

  if (directorySearchBtn && directorySearch && directoryResult) {
    directorySearchBtn.addEventListener('click', () => {
      const q = directorySearch.value.trim().toLowerCase();
      if (!q) {
        directoryResult.textContent = 'Try searching for a name.';
        return;
      }
      const matches = mockDirectory.filter(name => name.toLowerCase().includes(q));
      directoryResult.textContent = matches.length
        ? `Found: ${matches.join(', ')}.`
        : 'No matches (mock list: Alex, Jordan, Sam, Morgan).';
    });
  }

})();
