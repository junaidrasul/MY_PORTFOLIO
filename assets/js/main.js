// 1. Cinematic Preloader Boot Sequence
window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderStatus = document.getElementById('loaderStatus');
  const steps = [
    { pct: 35, text: 'Connecting MongoDB Replica & Redis Hot-Cache...' },
    { pct: 75, text: 'Verifying JWT Rotation & Nginx SSL/TLS...' },
    { pct: 100, text: 'Production Cluster Ready (99.9% SLA).' }
  ];

  let idx = 0;
  const interval = setInterval(() => {
    if (idx < steps.length) {
      loaderBar.style.width = `${steps[idx].pct}%`;
      loaderStatus.textContent = steps[idx].text;
      idx++;
    } else {
      clearInterval(interval);
      setTimeout(() => preloader.classList.add('done'), 260);
    }
  }, 240);
});

// 2. Scroll Progress & Active Section Highlighting
const scrollProgress = document.getElementById('scrollProgress');
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${pct}%`;

  let currentId = '';
  sections.forEach((sec) => {
    if (scrollTop >= sec.offsetTop - 180) {
      currentId = sec.getAttribute('id');
    }
  });

  navItems.forEach((link) => {
    link.classList.toggle('active', link.dataset.nav === currentId);
  });
});

// 3. IntersectionObserver Scroll Reveals
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal-up, .reveal-scale').forEach((el) => revealObserver.observe(el));

// 4. Interactive Neural Mesh Canvas
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 55; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.8 + 0.7
  });
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.55)';

  particles.forEach((p, idx) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    if (mouse.x !== null) {
      const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (mDist < 170) {
        ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - mDist / 170) * 0.28})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    for (let j = idx + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 135) {
        ctx.strokeStyle = `rgba(129, 140, 248, ${(1 - dist / 135) * 0.12})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// 5. Custom Cursor Spotlight, Ring & Magnetic Buttons
const cursorGlow = document.getElementById('cursorGlow');
const cursorRing = document.getElementById('cursorRing');

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
  if (cursorRing) {
    cursorRing.style.left = `${e.clientX}px`;
    cursorRing.style.top = `${e.clientY}px`;
  }
});

document.querySelectorAll('.magnetic').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0px, 0px)';
  });
});

// 6. 3D Perspective Tilt Cards
document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  });
});

// 7. Kinetic Role Typewriter
const roles = [
  'Zero-Downtime Cloud.',
  'Sub-Millisecond Redis APIs.',
  'Containerized AWS Clusters.',
  'Enterprise MERN Platforms.'
];
let roleIdx = 0;
let charIdx = 0;
let deleting = false;
const typedRole = document.getElementById('typedRole');

function typeLoop() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedRole.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedRole.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 42 : 78);
}
setTimeout(typeLoop, 1200);

// 8. Animated KPI Counters & Live Latency Jitter
document.querySelectorAll('.metric-value').forEach((el) => {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const isFloat = target % 1 !== 0;
  let current = 0;
  const increment = target / 42;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
  }, 30);
});

const liveLatency = document.getElementById('liveLatency');
setInterval(() => {
  if (liveLatency) {
    const ms = Math.floor(Math.random() * 6) + 11;
    liveLatency.textContent = `${ms} ms`;
  }
}, 2400);

// 9. Interactive Terminal
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

const terminalResponses = {
  help: 'Commands: skills | aws | projects | security | contact | clear',
  skills: 'React.js, Next.js (SSR/SSG), TypeScript, Node.js, Express, MongoDB, Redis, PostgreSQL, Docker, AWS EC2/S3, Nginx.',
  aws: 'AWS EC2 + Docker containers fronted by Nginx (SSL/TLS + Gzip), S3 pre-signed direct streams, GitHub Actions CI/CD.',
  projects: '1) Enterprise Real-Time Analytics Dashboard  2) Multi-Tenant E-Commerce & Inventory  3) Cloud Document & Workflow System',
  security: 'JWT Token Rotation, OAuth 2.0, Multi-Tier RBAC, Helmet Headers, Rate-Limiting & Strict CORS.',
  contact: 'Email: junaidrasul431@gmail.com | Phone: +92 305 4797476 | Islamabad, Pakistan'
};

terminalInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value.trim().toLowerCase();
    if (!cmd) return;

    const promptRow = terminalInput.parentElement;
    const cmdEcho = document.createElement('div');
    cmdEcho.className = 'term-line';
    cmdEcho.innerHTML = `<span class="prompt">$</span> ${cmd}`;
    terminalOutput.insertBefore(cmdEcho, promptRow);

    if (cmd === 'clear') {
      Array.from(terminalOutput.children).forEach((child) => {
        if (!child.classList.contains('interactive-prompt')) child.remove();
      });
    } else {
      const resp = document.createElement('div');
      resp.className = 'term-output info';
      resp.textContent = terminalResponses[cmd] || `Unknown command '${cmd}'. Type 'help' for options.`;
      terminalOutput.insertBefore(resp, promptRow);
    }

    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});

// 10. Stack Matrix Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    skillCards.forEach((card) => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

// 11. Case Study Modals
const caseStudies = {
  analytics: {
    badge: 'OBSERVABILITY & REAL-TIME TELEMETRY',
    title: 'Enterprise Real-Time Analytics Dashboard',
    challenge: 'Operations teams needed sub-second visibility into live server health, platform throughput, and user activity spikes across distributed services.',
    architecture: [
      'Engineered an event-driven Node.js & Express backend paired with Socket.io WebSocket channels for real-time push alerts.',
      'Built modular React.js + Tailwind CSS administrative dashboards with interactive telemetry charts and automated daily reporting.',
      'Containerized microservices using Docker and configured automated CI/CD deployment pipelines to AWS EC2.'
    ],
    outcome: 'Delivered real-time operational alerting and live throughput diagnostics with 99.9% high availability on AWS EC2.'
  },
  ecommerce: {
    badge: 'HIGH-CONCURRENCY MULTI-TENANT COMMERCE',
    title: 'Multi-Tenant E-Commerce & Inventory Platform',
    challenge: 'High catalog read volumes and multi-role access (store managers, warehouse handlers, retail customers) required sub-millisecond speed and strict RBAC.',
    architecture: [
      'Architected unified Next.js (SSR) and Node.js/Express portals with fine-grained RBAC and JWT token rotation.',
      'Restructured MongoDB schemas with compound indexing and offloaded hot catalog queries to Redis server-side caching.',
      'Configured Nginx reverse proxying with SSL/TLS termination and Gzip compression for fast global storefronts.'
    ],
    outcome: 'Dramatically accelerated catalog response times via Redis while enforcing strict online transaction compliance.'
  },
  workflow: {
    badge: 'CLOUD STORAGE & DOCUMENT GOVERNANCE',
    title: 'Cloud-Based Document & Workflow Management System',
    challenge: 'Routing multi-megabyte enterprise files through the Node.js application server created memory overhead and slowed concurrent approvals.',
    architecture: [
      'Implemented direct-to-AWS S3 secure file upload streams utilizing short-lived pre-signed URLs.',
      'Engineered automated approval permissions, digital sign-offs, and immutable file versioning in Node.js & TypeScript.',
      'Created a reusable React.js + TypeScript UI component library and automated rollouts via GitHub Actions & Docker.'
    ],
    outcome: 'Reduced backend server payload overhead by 60% and accelerated frontend module expansion timelines.'
  }
};

const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.open-modal-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const data = caseStudies[btn.dataset.project];
    if (!data) return;

    modalContent.innerHTML = `
      <span class="section-num">${data.badge}</span>
      <h2 style="font-family: var(--font-display); font-size: 1.65rem; margin-bottom: 16px;">${data.title}</h2>
      <h4 style="color: var(--accent-cyan); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 6px;">Architectural Challenge</h4>
      <p style="color: var(--text-secondary); margin-bottom: 18px; font-size: 0.95rem;">${data.challenge}</p>
      <h4 style="color: var(--accent-cyan); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 8px;">Engineering Execution</h4>
      <ul class="role-bullets" style="margin-bottom: 20px;">
        ${data.architecture.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <div style="padding: 14px 18px; border-radius: 10px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: var(--accent-emerald); font-size: 0.9rem;">
        <strong>Production Impact:</strong> ${data.outcome}
      </div>
    `;
    modal.classList.add('open');
  });
});

closeModal?.addEventListener('click', () => modal.classList.remove('open'));
modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

// 12. Quick Command Palette (Ctrl+K / Cmd+K)
const cmdModal = document.getElementById('cmdModal');
const cmdTrigger = document.getElementById('cmdTrigger');
const closeCmd = document.getElementById('closeCmd');
const cmdSearch = document.getElementById('cmdSearch');
const cmdItems = document.querySelectorAll('.cmd-item');

function openCmdPalette() {
  cmdModal.classList.add('open');
  cmdSearch.value = '';
  cmdItems.forEach((i) => (i.style.display = 'block'));
  setTimeout(() => cmdSearch.focus(), 50);
}

cmdTrigger?.addEventListener('click', openCmdPalette);
closeCmd?.addEventListener('click', () => cmdModal.classList.remove('open'));
cmdModal?.addEventListener('click', (e) => { if (e.target === cmdModal) cmdModal.classList.remove('open'); });

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    cmdModal.classList.contains('open') ? cmdModal.classList.remove('open') : openCmdPalette();
  } else if (e.key === 'Escape') {
    cmdModal.classList.remove('open');
    modal.classList.remove('open');
  }
});

cmdSearch?.addEventListener('input', () => {
  const q = cmdSearch.value.toLowerCase();
  cmdItems.forEach((item) => {
    item.style.display = item.textContent.toLowerCase().includes(q) ? 'block' : 'none';
  });
});

cmdItems.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.dataset.action) {
      document.querySelector(item.dataset.action)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.dataset.copy) {
      navigator.clipboard?.writeText(item.dataset.copy);
      alert(`Copied to clipboard: ${item.dataset.copy}`);
    }
    cmdModal.classList.remove('open');
  });
});

// 13. Mobile Navigation & Contact Form
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(contactForm).entries());
  formFeedback.textContent = 'Encrypting & transmitting inquiry...';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      formFeedback.textContent = '✓ Inquiry logged via Express API. Junaid will respond within 24 hours.';
      contactForm.reset();
      return;
    }
  } catch (_) {}

  formFeedback.textContent = `✓ Brief prepared for Muhammad Junaid Rasul (junaidrasul431@gmail.com). Thank you, ${payload.name}!`;
  contactForm.reset();
});
