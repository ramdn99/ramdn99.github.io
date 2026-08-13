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

// Pre-render glyphs onto tiny offscreen canvases for ultra-fast bitmap blits
function createGlyphCanvas(char: string, fillStyle: string, alpha: number): HTMLCanvasElement {
  const gCanvas = document.createElement('canvas');
  gCanvas.width = 16;
  gCanvas.height = 16;
  const gCtx = gCanvas.getContext('2d');
  if (gCtx) {
    gCtx.font = '11px "JetBrains Mono", monospace';
    gCtx.fillStyle = fillStyle;
    gCtx.globalAlpha = alpha;
    gCtx.fillText(char, 2, 12);
  }
  return gCanvas;
}

// AMBIENT BACKGROUND SYMBOLS GRID (Offscreen glyph pre-rendering + Scroll-paused RAF)
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

  const getSpacing = () => (window.innerWidth < 768 ? 24 : 16);
  let SPACING = getSpacing();
  const DECAY_DURATION = 1400;

  let cols = Math.ceil(width / SPACING) + 1;
  let rows = Math.ceil(height / SPACING) + 1;
  let grid: Float64Array = new Float64Array(cols * rows);

  // Pre-rendered offscreen glyph canvases
  const glyphs = {
    hash: createGlyphCanvas('#', '#6584a8', 0.85),
    dollar: createGlyphCanvas('$', '#2f4562', 0.55),
    starActive: createGlyphCanvas('*', '#1e2d42', 0.35),
    starIdle: createGlyphCanvas('*', '#121c29', 0.15),
  };

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
  }, { passive: true });

  // Scroll listener to pause background canvas draw during active scrolling
  let isScrolling = false;
  let scrollTimeout: number | undefined;

  window.addEventListener('scroll', () => {
    isScrolling = true;
    if (scrollTimeout !== undefined) clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(() => {
      isScrolling = false;
    }, 120);
  }, { passive: true });

  let lastRandomShuffle = 0;

  function render(now: number) {
    if (!ctx) return;

    // Skip canvas redraw when user is actively scrolling for 100% smooth scroll frames
    if (isScrolling) {
      requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Ambient background symbol random appearance (~300ms)
    if (now - lastRandomShuffle > 300) {
      lastRandomShuffle = now;
      const totalNodes = cols * rows;
      for (let k = 0; k < 2; k++) {
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
          if (progress < 0.30) {
            ctx.drawImage(glyphs.hash, px, py - 11);
          } else if (progress < 0.65) {
            ctx.drawImage(glyphs.dollar, px, py - 11);
          } else {
            ctx.drawImage(glyphs.starActive, px, py - 11);
          }
        } else {
          ctx.drawImage(glyphs.starIdle, px, py - 11);
        }
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// RAF-throttled spotlight tracking for CSS radial gradient
function initSpotlightTracking() {
  let pendingX: number | null = null;
  let pendingY: number | null = null;
  let rafId: number | null = null;

  const updateSpotlight = () => {
    if (pendingX !== null && pendingY !== null) {
      const gx = (pendingX / window.innerWidth) * 100;
      const gy = (pendingY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--gx', `${gx.toFixed(1)}%`);
      document.documentElement.style.setProperty('--gy', `${gy.toFixed(1)}%`);
      pendingX = null;
      pendingY = null;
    }
    rafId = null;
  };

  const handlePointer = (clientX: number, clientY: number) => {
    pendingX = clientX;
    pendingY = clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(updateSpotlight);
    }
  };

  window.addEventListener('pointermove', (e) => handlePointer(e.clientX, e.clientY), { passive: true });
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
