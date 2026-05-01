// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  navOverlay.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu on overlay click
navOverlay.addEventListener('click', () => {
  navToggle.classList.remove('active');
  navLinks.classList.remove('active');
  navOverlay.classList.remove('active');
  document.body.style.overflow = '';
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve after animation to save resources
        // revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// ========================================
// SKILL RING ANIMATION
// ========================================

const skillRings = document.querySelectorAll('.ring-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const percent = ring.dataset.percent;
        const circumference = 175.93; // 2 * PI * 28
        const offset = circumference - (circumference * percent) / 100;
        ring.style.strokeDashoffset = offset;
        skillObserver.unobserve(ring);
      }
    });
  },
  { threshold: 0.3 }
);

skillRings.forEach(ring => skillObserver.observe(ring));

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--text-primary)';
          }
        });
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: '-80px 0px -50% 0px',
  }
);

sections.forEach(section => sectionObserver.observe(section));

// ========================================
// TILT EFFECT ON PROJECT CARDS
// ========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `translateY(-8px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ========================================
// TYPED TEXT EFFECT FOR HERO
// ========================================

const typedElement = document.getElementById('typedRole');
if (typedElement) {
  const roles = ['Frontend Developer', 'UI Designer', 'Web Developer', 'Dashboard Builder'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Brief pause before next word
    }

    setTimeout(typeRole, typeSpeed);
  }

  // Start typing after initial animation
  setTimeout(typeRole, 1200);
}

// ========================================
// CURSOR GLOW EFFECT (DESKTOP ONLY)
// ========================================

if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(108, 92, 231, 0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.3s ease-out, top 0.3s ease-out;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ========================================
// COUNTER ANIMATION FOR STATS (FUTURE USE)
// ========================================

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function step() {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      return;
    }
    element.textContent = Math.floor(start);
    requestAnimationFrame(step);
  }

  step();
}
