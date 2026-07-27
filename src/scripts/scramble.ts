// Scramble text reveal & Ocean of Asterisks (*) Grid with Ultra-Fast Line-Interpolated Cursor & Touch Tracking

const HASH_CHARS = '01#$%&*!?/\\<>[]{}ABCDEF0123456789';

function scrambleChar(): string {
  return HASH_CHARS[Math.floor(Math.random() * HASH_CHARS.length)];
}

function prepare(el: HTMLElement) {
  if (el.dataset.scrambleReady) return;
  const text = el.textContent ?? '';
  el.dataset.scrambleOriginal = text;
  el.textContent = '';
  for (const ch of text) {
    const span = document.createElement('span');
    if (ch === ' ') {
      span.textContent = ' ';
    } else {
      span.textContent = scrambleChar();
      span.dataset.final = ch;
      span.classList.add('sc-char');
    }
    el.appendChild(span);
  }
  el.dataset.scrambleReady = '1';
}

function reveal(el: HTMLElement) {
  if (el.dataset.scrambleDone) return;
  el.dataset.scrambleDone = '1';
  const chars = Array.from(el.querySelectorAll<HTMLElement>('.sc-char'));
  const delayStep = Math.max(8, Math.min(20, 500 / Math.max(chars.length, 1)));

  chars.forEach((span, idx) => {
    const revealAt = idx * delayStep;
    let ticks = 0;
    const maxTicks = 5 + Math.floor(Math.random() * 5);
    
    setTimeout(() => {
      const scrambleInterval = setInterval(() => {
        ticks++;
        span.textContent = scrambleChar();
        if (ticks >= maxTicks) {
          clearInterval(scrambleInterval);
          span.textContent = span.dataset.final ?? '';
          span.classList.add('sc-locked');
        }
      }, 36);
    }, revealAt);
  });
}

// ULTRA-FAST LINE-INTERPOLATED CURSOR & TOUCH TRACKING
let isOceanFxEnabled = true;

function initAsteriskOcean() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const savedState = localStorage.getItem('fx_ocean_enabled');
  if (savedState !== null) {
    isOceanFxEnabled = savedState === 'true';
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'asterisk-ocean-canvas';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Dynamic spacing for mobile responsiveness vs desktop precision
  const getSpacing = () => (window.innerWidth < 640 ? 18 : 14);
  let SPACING = getSpacing();
  const DISTURB_RADIUS = window.innerWidth < 640 ? 22 : 16;
  const DECAY_DURATION = 1400;

  let cols = Math.ceil(width / SPACING) + 1;
  let rows = Math.ceil(height / SPACING) + 1;
  let grid: Float64Array = new Float64Array(cols * rows);

  function buildGrid() {
    SPACING = getSpacing();
    cols = Math.ceil(width / SPACING) + 1;
    rows = Math.ceil(height / SPACING) + 1;
    grid = new Float64Array(cols * rows);
  }

  buildGrid();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    buildGrid();
  });

  let prevX = -1000;
  let prevY = -1000;

  function disturbLine(x0: number, y0: number, x1: number, y1: number, now: number) {
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.max(1, Math.ceil(dist / 6));

    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const rx = x0 + (x1 - x0) * t;
      const ry = y0 + (y1 - y0) * t;

      const cMin = Math.max(0, Math.floor((rx - DISTURB_RADIUS) / SPACING));
      const cMax = Math.min(cols - 1, Math.ceil((rx + DISTURB_RADIUS) / SPACING));
      const rMin = Math.max(0, Math.floor((ry - DISTURB_RADIUS) / SPACING));
      const rMax = Math.min(rows - 1, Math.ceil((ry + DISTURB_RADIUS) / SPACING));

      const rSq = DISTURB_RADIUS * DISTURB_RADIUS;

      for (let r = rMin; r <= rMax; r++) {
        const ny = r * SPACING;
        const dy = ny - ry;
        const dy2 = dy * dy;
        const rowOffset = r * cols;
        for (let c = cMin; c <= cMax; c++) {
          const nx = c * SPACING;
          const dx = nx - rx;
          if (dx * dx + dy2 < rSq) {
            grid[rowOffset + c] = now;
          }
        }
      }
    }
  }

  function handleInteraction(clientX: number, clientY: number) {
    if (!isOceanFxEnabled) return;
    const now = performance.now();
    if (prevX < 0) {
      prevX = clientX;
      prevY = clientY;
    }
    disturbLine(prevX, prevY, clientX, clientY, now);
    prevX = clientX;
    prevY = clientY;

    // Update spotlight coordinates for touch & pointer
    const gx = (clientX / window.innerWidth) * 100;
    const gy = (clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--gx', `${gx}%`);
    document.documentElement.style.setProperty('--gy', `${gy}%`);
  }

  window.addEventListener('pointermove', (e) => handleInteraction(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
      handleInteraction(prevX, prevY);
    }
  }, { passive: true });

  let lastRandomShuffle = 0;

  function render(now: number) {
    if (!ctx) return;

    if (!isOceanFxEnabled) {
      canvas.style.display = 'none';
      requestAnimationFrame(render);
      return;
    }

    canvas.style.display = 'block';
    ctx.clearRect(0, 0, width, height);
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.font = '11px "JetBrains Mono", monospace';

    // Ambient background shuffle trigger every ~300ms
    if (now - lastRandomShuffle > 300) {
      lastRandomShuffle = now;
      const totalNodes = cols * rows;
      for (let k = 0; k < 2; k++) {
        const randIdx = Math.floor(Math.random() * totalNodes);
        grid[randIdx] = now - Math.floor(Math.random() * 600);
      }
    }

    for (let r = 0; r < rows; r++) {
      const py = r * SPACING;
      const rowOffset = r * cols;
      for (let c = 0; c < cols; c++) {
        const px = c * SPACING;
        const disturbedAt = grid[rowOffset + c];
        const elapsed = now - disturbedAt;

        if (disturbedAt > 0 && elapsed < DECAY_DURATION) {
          const progress = elapsed / DECAY_DURATION;
          const fadeAlpha = Math.sin(progress * Math.PI);

          if (progress < 0.30) {
            ctx.fillStyle = '#6584a8';
            ctx.globalAlpha = 0.7 + fadeAlpha * 0.3;
            ctx.fillText('#', px, py);
          } else if (progress < 0.65) {
            ctx.fillStyle = '#2f4562';
            ctx.globalAlpha = 0.45 + fadeAlpha * 0.25;
            ctx.fillText('$', px, py);
          } else {
            ctx.fillStyle = '#1e2d42';
            ctx.globalAlpha = 0.3 + fadeAlpha * 0.2;
            ctx.fillText('*', px, py);
          }
        } else {
          ctx.fillStyle = '#121c29';
          ctx.globalAlpha = 0.15;
          ctx.fillText('*', px, py);
        }
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  function updateToggleButtons() {
    const btns = document.querySelectorAll<HTMLElement>('[data-fx-toggle]');
    btns.forEach((btn) => {
      btn.textContent = isOceanFxEnabled ? 'FX: ON' : 'FX: OFF';
      btn.setAttribute('aria-pressed', String(isOceanFxEnabled));
      if (isOceanFxEnabled) {
        btn.classList.add('fx-active');
      } else {
        btn.classList.remove('fx-active');
      }
    });
  }

  updateToggleButtons();

  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-fx-toggle]');
    if (btn) {
      isOceanFxEnabled = !isOceanFxEnabled;
      localStorage.setItem('fx_ocean_enabled', String(isOceanFxEnabled));
      updateToggleButtons();
    }
  });
}

function init() {
  const targets = document.querySelectorAll<HTMLElement>('[data-scramble]');
  targets.forEach(prepare);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25, rootMargin: '0px 0px -5% 0px' }
  );

  targets.forEach((t) => io.observe(t));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    targets.forEach((t) => {
      t.textContent = t.dataset.scrambleOriginal ?? t.textContent ?? '';
      t.dataset.scrambleDone = '1';
    });
  }

  initAsteriskOcean();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
