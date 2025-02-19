/* Theme Toggle */
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

/* Preloader */
window.addEventListener('load', () => {
  gsap.to('#preloader', { opacity: 0, duration: 1, onComplete: () => {
    document.getElementById('preloader').style.display = 'none';
  }});
});

/* Hamburger Menu Toggle */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

/* GSAP Animations */
document.addEventListener('DOMContentLoaded', () => {
  // Hero Section Animation
  gsap.from('.hero-content h1', { duration: 1, opacity: 0, y: -50, ease: 'power2.out' });
  gsap.from('.btn', { duration: 1, opacity: 0, scale: 0.8, delay: 1, ease: 'back.out(1.7)' });
  
  // Scroll-triggered animations for sections
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    });
  });
  
  // Hover animations for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: 'power1.out' });
    });
  });
});

/* Typed.js Initialization */
document.addEventListener('DOMContentLoaded', () => {
  new Typed('#typed', {
    strings: ['AI Enthusiast', '3D Explorer', 'Web Innovator', 'Game Developer'],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
  });
});

/* Project Modal Functionality */
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.getAttribute('data-title');
    modalDescription.textContent = card.getAttribute('data-description');
    modal.style.display = 'flex';
    gsap.fromTo('.modal-content', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  });
});

closeBtn.addEventListener('click', () => {
  gsap.to('.modal-content', { opacity: 0, y: 50, duration: 0.3, ease: 'power2.in', onComplete: () => {
    modal.style.display = 'none';
  }});
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    gsap.to('.modal-content', { opacity: 0, y: 50, duration: 0.3, ease: 'power2.in', onComplete: () => {
      modal.style.display = 'none';
    }});
  }
});

/* Three.js Particle Background */
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 50;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
}
particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({
  color: 0xff6f61,
  size: 0.15,
  transparent: true,
  opacity: 0.7
});
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

function animateParticles() {
  requestAnimationFrame(animateParticles);
  particleSystem.rotation.y += 0.0008;
  renderer.render(scene, camera);
}
animateParticles();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});
