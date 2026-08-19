// E-Prognos Engenharia & Laudos - Main Client Application Logic (Hardened Security Edition)

const WHATSAPP_NUMBER = '5541999094170';

document.addEventListener('DOMContentLoaded', () => {
  initShader();
  initHeaderScroll();
  initWhatsAppModal();
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

      vec3 col1 = vec3(0.07, 0.07, 0.09);
      vec3 col2 = vec3(1.0, 0.37, 0.12);
      vec3 col3 = vec3(0.0, 0.89, 0.99);

      float n = network(uv, t);
      vec3 color = mix(col1, col2 * 0.5, n * 0.6);

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

// 3. WhatsApp topic picker (no name/phone form)
function initWhatsAppModal() {
  const modal = document.getElementById('whatsapp-modal');
  if (!modal) return;

  const openBtns = document.querySelectorAll('[data-open-whatsapp]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const options = document.querySelectorAll('[data-wa-topic]');

  function openModal() {
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  function openWhatsApp(topic) {
    const safeTopic = String(topic || 'Atendimento').slice(0, 120);
    const message = `Olá! Gostaria de falar com o especialista da E-Prognus sobre: ${safeTopic}.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    closeModal();
  }

  openBtns.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  options.forEach((btn) => {
    btn.addEventListener('click', () => {
      const topic = btn.getAttribute('data-wa-topic');
      openWhatsApp(topic);
    });
  });
}

// 4. Smooth Scroll Navigation
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
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
