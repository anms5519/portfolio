// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// GSAP animations once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Animate the hero section content
  gsap.from('.hero-content h1', { duration: 1, opacity: 0, y: -50, ease: 'power2.out' });
  gsap.from('.hero-content p', { duration: 1, opacity: 0, y: 50, delay: 0.5, ease: 'power2.out' });
  gsap.from('.btn', { duration: 1, opacity: 0, scale: 0.8, delay: 1, ease: 'back.out(1.7)' });
  
  // Animate each section as it scrolls into view
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
  
  // Add hover animations for project cards
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

