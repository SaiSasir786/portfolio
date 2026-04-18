(function () {
  'use strict';

  /* ============================================================
     Scroll Progress Bar
     ============================================================ */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = docHeight > 0 ? (scrollTop / docHeight) * 100 + '%' : '0%';
  }, { passive: true });


  /* ============================================================
     Custom Cursor — Anti-gravity glowing dot (desktop only)
     ============================================================ */
  if (window.matchMedia('(pointer: fine)').matches) {
    // Hide native cursor site-wide
    document.documentElement.style.cursor = 'none';

    // Main ring (follows with elastic lag)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';

    // Small precise dot — snaps to exact cursor position
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';

    // Trailing glow blob — lags even more, creates depth
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'custom-cursor-glow';

    document.body.appendChild(cursorGlow);
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = -200;
    let mouseY = -200;
    let cx = mouseX, cy = mouseY;
    let gx = mouseX, gy = mouseY;

    // Set initial off-screen position so cursor isn't visible until mouse moves
    cursor.style.left    = mouseX + 'px';
    cursor.style.top     = mouseY + 'px';
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top  = mouseY + 'px';

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot snaps immediately to exact cursor
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    });

    (function animateCursor() {
      // Ring follows with 12% lerp (elastic lag)
      cx += (mouseX - cx) * 0.12;
      cy += (mouseY - cy) * 0.12;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';

      // Glow blob follows with 5% lerp (heavier lag = anti-gravity feel)
      gx += (mouseX - gx) * 0.05;
      gy += (mouseY - gy) * 0.05;
      cursorGlow.style.left = gx + 'px';
      cursorGlow.style.top  = gy + 'px';

      requestAnimationFrame(animateCursor);
    })();

    const hoverTargets = 'a, button, .portfolio-wrap, .skill-tag, .contact-card, #portfolio-flters li, .expertise-card';
    document.querySelectorAll(hoverTargets).forEach(addHoverCursor);

    const mo = new MutationObserver(() => {
      document.querySelectorAll(hoverTargets).forEach(addHoverCursor);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    function addHoverCursor(el) {
      if (el._cursorBound) return;
      el._cursorBound = true;
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
        cursorGlow.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
        cursorGlow.classList.remove('cursor-hover');
      });
    }
  }


  /* ============================================================
     Full-Page Antigravity Particle Field
     Covers entire page, sits BEHIND all content.
     Dots scatter away from cursor like antigravity.google
     ============================================================ */
  {
    const canvas = document.createElement('canvas');
    canvas.id = 'antigravity-canvas';
    // Fixed behind everything, never blocks clicks/text
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    document.body.insertBefore(canvas, document.body.firstChild);

    // Make sure all main content sits ABOVE the canvas (z-index: 0)
    const main = document.getElementById('main');
    if (main) { main.style.position = 'relative'; main.style.zIndex = '1'; }
    const hero = document.getElementById('hero');
    if (hero) { hero.style.position = 'relative'; hero.style.zIndex = '1'; }
    const header = document.getElementById('header');
    if (header) { header.style.position = 'fixed'; header.style.zIndex = '9997'; }
    // Footer above canvas too
    const footer = document.querySelector('footer');
    if (footer) { footer.style.position = 'relative'; footer.style.zIndex = '1'; }

    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H;
    let mouseX = -9999, mouseY = -9999;
    const MOUSE_RADIUS = 150;
    const REPULSION_FORCE = 6;

    function getThemeColors() {
      const rootStyle = getComputedStyle(document.documentElement);
      // Fallback to sunset if variables aren't set
      const main = rootStyle.getPropertyValue('--main-color').trim() || '#f97316';
      const lighter = rootStyle.getPropertyValue('--lighter-color').trim() || '#fb923c';
      const accent = rootStyle.getPropertyValue('--accent-color').trim() || '#ec4899';
      return { main, lighter, accent };
    }

    function resizeCanvas() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); }, { passive: true });

    // Track mouse globally (viewport coords match fixed canvas)
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    document.addEventListener('mouseleave', () => {
      mouseX = -9999;
      mouseY = -9999;
    });

    class Particle {
      constructor() { this.reset(true); }
      reset(initial) {
        this.x = Math.random() * W;
        this.y = initial ? Math.random() * H : (Math.random() > 0.5 ? -5 : H + 5);
        this.r = Math.random() * 1.4 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.alpha = Math.random() * 0.28 + 0.07; // more subtle — won't compete with text
        // 0 = main, 1 = lighter, 2 = accent
        this.colorType = Math.floor(Math.random() * 3);
        this.angle = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.015;
        this.length = this.r * (2 + Math.random() * 2);
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotSpeed;

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * REPULSION_FORCE;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }

        if (this.x < -20) this.x = W + 20;
        else if (this.x > W + 20) this.x = -20;
        if (this.y < -20) this.y = H + 20;
        else if (this.y > H + 20) this.y = -20;
      }
      draw(theme, mx, my) {
        const dx = this.x - mx;
        const dy = this.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const LIT_RADIUS = 130;
        const proximity = dist < LIT_RADIUS ? (1 - dist / LIT_RADIUS) : 0;
        const alpha = Math.min(this.alpha + proximity * 0.65, 0.95);
        const lineW = this.r * (1 + proximity * 2.2);
        const len = this.length * (1 + proximity * 1.4);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(-len / 2, 0);
        ctx.lineTo(len / 2, 0);
        if (this.colorType === 0) ctx.strokeStyle = theme.main;
        else if (this.colorType === 1) ctx.strokeStyle = theme.lighter;
        else ctx.strokeStyle = theme.accent;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lineW;
        ctx.lineCap = 'round';
        // Add glow on lit particles
        if (proximity > 0.15) {
          ctx.shadowColor = this.colorType === 0 ? theme.main : this.colorType === 1 ? theme.lighter : theme.accent;
          ctx.shadowBlur = proximity * 14;
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    function initParticles() {
      const count = Math.min(220, Math.floor((W * H) / 4500));
      particles = Array.from({ length: count }, () => new Particle());
    }
    initParticles();

    // Helper to extract RGB numbers from hex to make rgba strings
    function hexToRgb(hex) {
      if (!hex) return '249, 115, 22';
      let cleanHex = hex.replace('#', '');
      if (cleanHex.length === 3) cleanHex = cleanHex.split('').map(c => c + c).join('');
      if (cleanHex.length !== 6) return '249, 115, 22';
      let bigint = parseInt(cleanHex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    }

    (function animate() {
      ctx.clearRect(0, 0, W, H);

      const theme = getThemeColors();
      const rgbMain = hexToRgb(theme.main);
      const rgbAccent = hexToRgb(theme.accent);

      // Radial base glows matching the current theme
      const grd1 = ctx.createRadialGradient(W * 0.25, H * 0.45, 0, W * 0.25, H * 0.45, W * 0.5);
      grd1.addColorStop(0, `rgba(${rgbMain}, 0.05)`);
      grd1.addColorStop(1, 'transparent');
      ctx.fillStyle = grd1;
      ctx.fillRect(0, 0, W, H);

      const grd2 = ctx.createRadialGradient(W * 0.75, H * 0.55, 0, W * 0.75, H * 0.55, W * 0.45);
      grd2.addColorStop(0, `rgba(${rgbAccent}, 0.04)`);
      grd2.addColorStop(1, 'transparent');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, W, H);

      ctx.globalAlpha = 1;
      particles.forEach(p => { p.update(); p.draw(theme, mouseX, mouseY); });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    })();
  }


  /* ============================================================
     3D Card Tilt on Project Cards
     ============================================================ */
  document.querySelectorAll('.portfolio-item').forEach(card => {
    const wrap = card.querySelector('.portfolio-wrap');
    if (!wrap) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y - rect.height / 2) / (rect.height / 2)) * -7;
      const ry = ((x - rect.width / 2) / (rect.width / 2)) * 7;
      wrap.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`;
    });

    card.addEventListener('mouseleave', () => {
      wrap.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  });


  /* ============================================================
     Dark Mode Toggle
     ============================================================ */
  const darkBtn = document.createElement('button');
  darkBtn.id = 'dark-mode-toggle';
  darkBtn.title = 'Toggle dark mode';
  document.body.appendChild(darkBtn);

  function applyDark(on) {
    document.body.classList.toggle('dark-mode', on);
    darkBtn.innerHTML = on
      ? '<i class="bx bx-sun"></i>'
      : '<i class="bx bx-moon"></i>';
  }

  // Always start dark — body already has class="dark-mode" from HTML.
  // JS toggle overrides on click; localStorage persists the choice.
  const saved = localStorage.getItem('dm');
  // If user never toggled, keep dark (body already has the class).
  // If they explicitly chose light (saved === '0'), honour that.
  if (saved === '0') applyDark(false);
  // else dark-mode class already on body from HTML, applyDark just syncs icon.
  else applyDark(true);

  darkBtn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyDark(isDark);
    localStorage.setItem('dm', isDark ? '1' : '0');
  });


  /* ============================================================
     Skill Tags — staggered entrance via IntersectionObserver
     ============================================================ */
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.skill-tag').forEach((tag, i) => {
          setTimeout(() => tag.classList.add('visible'), i * 55);
        });
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    io.observe(skillsGrid);
  }


  /* ============================================================
     Section headings — subtle underline grow on scroll-in
     ============================================================ */
  const sectionTitles = document.querySelectorAll('.section-title h2');
  if ('IntersectionObserver' in window && sectionTitles.length) {
    const titleIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.setProperty('--underline-scale', '1');
          titleIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    sectionTitles.forEach(t => titleIO.observe(t));
  }


  /* ============================================================
     Lazy-load images that aren't already loaded
     ============================================================ */
  if ('IntersectionObserver' in window) {
    const imgIO = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(img => imgIO.observe(img));
  }

})();
