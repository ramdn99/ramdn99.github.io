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

// AMBIENT BACKGROUND SYMBOLS GRID (No cursor tracking)
function initAmbientAsteriskOcean() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

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

  const getSpacing = () => (window.innerWidth < 640 ? 18 : 14);
  let SPACING = getSpacing();
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

  let lastRandomShuffle = 0;

  function render(now: number) {
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.font = '11px "JetBrains Mono", monospace';

    // Ambient background symbol random appearance (~250ms)
    if (now - lastRandomShuffle > 250) {
      lastRandomShuffle = now;
      const totalNodes = cols * rows;
      for (let k = 0; k < 3; k++) {
        const randIdx = Math.floor(Math.random() * totalNodes);
        grid[randIdx] = now;
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
}

// Lightweight spotlight tracking for CSS radial gradient
function initSpotlightTracking() {
  const handlePointer = (clientX: number, clientY: number) => {
    const gx = (clientX / window.innerWidth) * 100;
    const gy = (clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--gx', `${gx}%`);
    document.documentElement.style.setProperty('--gy', `${gy}%`);
  };

  window.addEventListener('pointermove', (e) => handlePointer(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
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

  initAmbientAsteriskOcean();
  initSpotlightTracking();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
