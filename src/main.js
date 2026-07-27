// FCV Segurança Elétrica - Main Client Application Logic (Hardened Security Edition)

document.addEventListener('DOMContentLoaded', () => {
  initShader();
  initHeaderScroll();
  initModals();
  initFormHandler();
  initSmoothScroll();
});

// 1. WebGL Canvas Shader Background Animation
function initShader() {
  const canvas = document.getElementById('shader-canvas');
  if (!canvas) return;

  function syncSize() {
    const w = canvas.parentElement?.clientWidth || window.innerWidth;
    const h = canvas.parentElement?.clientHeight || window.innerHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(syncSize).observe(canvas);
  }
  syncSize();

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  const vs = `
    attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fs = `
    precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    float network(vec2 p, float t) {
      p *= 3.0;
      vec2 i = floor(p);
      vec2 f = fract(p);
      float dist = 1.0;
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec2 g = vec2(float(x), float(y));
          vec2 o = sin(t + (i + g) * 6.2831) * 0.5 + 0.5;
          float d = distance(g + o, f);
          dist = min(dist, d);
        }
      }
      return 1.0 - smoothstep(0.0, 0.45, dist);
    }

    void main() {
      vec2 uv = v_texCoord;
      float t = u_time * 0.4;

      vec3 col1 = vec3(0.07, 0.07, 0.09); // Deep dark surface
      vec3 col2 = vec3(1.0, 0.37, 0.12);  // Electric Orange accent
      vec3 col3 = vec3(0.0, 0.89, 0.99);  // Cyan Arc Flash accent

      float n = network(uv, t);
      vec3 color = mix(col1, col2 * 0.5, n * 0.6);

      // Subtle mouse interaction grid pulse
      vec2 m = u_mouse / u_resolution;
      float mDist = distance(uv, m);
      float mGlow = smoothstep(0.4, 0.0, mDist) * 0.15;
      color += col3 * mGlow;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function createShader(type, src) {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  const vertShader = createShader(gl.VERTEX_SHADER, vs);
  const fragShader = createShader(gl.FRAGMENT_SHADER, fs);
  if (!vertShader || !fragShader) return;

  const prog = gl.createProgram();
  if (!prog) return;
  gl.attachShader(prog, vertShader);
  gl.attachShader(prog, fragShader);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

  const pos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_resolution');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');

  let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      mouse.x = event.clientX - rect.left;
      mouse.y = canvas.height - (event.clientY - rect.top);
    }
  });

  function render(t) {
    syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, t * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// 2. Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-surface-container/95', 'shadow-lg');
    } else {
      header.classList.remove('bg-surface-container/95', 'shadow-lg');
    }
  });
}

// 3. Modal Controllers
function initModals() {
  const quoteModal = document.getElementById('quote-modal');
  const portfolioModal = document.getElementById('portfolio-modal');

  const openQuoteBtns = document.querySelectorAll('[data-open-quote]');
  const openPortfolioBtns = document.querySelectorAll('[data-open-portfolio]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');

  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quoteModal?.classList.add('active');
    });
  });

  openPortfolioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      portfolioModal?.classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quoteModal?.classList.remove('active');
      portfolioModal?.classList.remove('active');
    });
  });

  [quoteModal, portfolioModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

// 4. Contact & Quote Form Handling (Hardened against Injection)
function initFormHandler() {
  const form = document.getElementById('quote-form');
  const feedbackEl = document.getElementById('form-feedback');
  if (!form || !feedbackEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('client-name');
    const phoneInput = document.getElementById('client-phone');
    const serviceInput = document.getElementById('client-service');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const service = serviceInput ? serviceInput.value : '';

    if (!name || !phone) {
      feedbackEl.textContent = 'Por favor, preencha o nome e telefone para contato.';
      feedbackEl.className = 'font-code text-sm text-red-400 mt-3';
      return;
    }

    // Safe rendering via textContent
    feedbackEl.textContent = `Obrigado, ${name}! Solicitação enviada com sucesso. Nossa equipe de engenharia entrará em contato via WhatsApp/Telefone (${phone}).`;
    feedbackEl.className = 'font-code text-sm text-emerald-400 mt-3 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded';

    form.reset();

    setTimeout(() => {
      const modal = document.getElementById('quote-modal');
      modal?.classList.remove('active');
      feedbackEl.textContent = '';
    }, 4000);
  });
}

// 5. Smooth Scroll Navigation
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}
