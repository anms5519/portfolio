/* Initialize EmailJS with your public API key */
emailjs.init("QCLwAOKe38NGkZrCE");

/* Preloader Animation */
window.addEventListener('load', () => {
  gsap.to('#preloader', {
    opacity: 0,
    duration: 1,
    onComplete: () => { document.getElementById('preloader').style.display = 'none'; }
  });
});

/* Hamburger Menu Toggle with a slight rotation animation */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  gsap.fromTo(navLinks, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
});

/* Theme Toggle */
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); });

/* GSAP Animations for Sections */
document.addEventListener('DOMContentLoaded', () => {
  // Advanced hero timeline animation
  const heroTimeline = gsap.timeline();
  heroTimeline.from('.hero-content h1', { duration: 1, opacity: 0, y: -50, ease: 'power2.out' })
              .from('#typed', { duration: 1, opacity: 0, y: 50, ease: 'power2.out' }, "-=0.5")
              .from('.btn', { duration: 1, opacity: 0, scale: 0.8, ease: 'back.out(1.7)' }, "-=0.5");

  // Animate each section on scroll with staggered effect
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: { trigger: section, start: 'top 80%' },
      opacity: 0, y: 50, duration: 1, ease: 'power2.out'
    });
  });

  // Hover effects for project and certificate cards with scaling and shadow
  document.querySelectorAll('.project-card, .certificate-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: 'power1.out' });
    });
  });
});

/* Typed.js for typewriter effect */
document.addEventListener('DOMContentLoaded', () => {
  new Typed('#typed', {
    strings: ['AI Enthusiast', '3D Explorer', 'Web Innovator', 'Game Developer'],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
  });
});

/* Certificate Modal Functionality */
const certificateModal = document.getElementById('certificate-modal');
const certificateImage = document.getElementById('certificate-image');
document.querySelectorAll('.certificate-card').forEach(card => {
  card.addEventListener('click', () => {
    const imgSrc = card.getAttribute('data-img');
    certificateImage.src = imgSrc;
    certificateModal.style.display = 'flex';
    gsap.fromTo('.certificate-modal-content', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
  });
});
const closeCertificateModal = document.querySelector('#certificate-modal .close-btn');
closeCertificateModal.addEventListener('click', () => {
  gsap.to('.certificate-modal-content', { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in', onComplete: () => {
    certificateModal.style.display = 'none';
  }});
});
window.addEventListener('click', (e) => {
  if(e.target === certificateModal){
    gsap.to('.certificate-modal-content', { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in', onComplete: () => {
      certificateModal.style.display = 'none';
    }});
  }
});

/* Toast Notification Function */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.display = 'block';
  gsap.fromTo(toast, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
  setTimeout(() => {
    gsap.to(toast, { opacity: 0, duration: 0.5, onComplete: () => { toast.style.display = 'none'; }});
  }, 3000);
}

/* Contact Form Submission via EmailJS with error logging */
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  emailjs.sendForm('service_0ietc2e', 'template_jihmbkn', this)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      showToast('Message sent successfully!');
      document.getElementById('contact-form').reset();
    }, function(error) {
      console.error('FAILED...', error);
      showToast('Failed to send message. Please try again later.');
    });
});

/* Three.js Particle Background with subtle mouse parallax */
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for(let i = 0; i < particleCount; i++){
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
function animateParticles(){
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
// Add subtle parallax to the particle background based on mouse movement
document.addEventListener('mousemove', (e) => {
  const mouseX = (e.clientX / window.innerWidth) - 0.5;
  const mouseY = (e.clientY / window.innerHeight) - 0.5;
  gsap.to(camera.rotation, { x: mouseY * 0.2, y: mouseX * 0.2, duration: 0.5 });
});
