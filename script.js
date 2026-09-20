document.getElementById('year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress span');
const heroArt = document.querySelector('.hero-art');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle('is-scrolled', scrollTop > 24);
  progress.style.transform = `scaleX(${scrollable ? scrollTop / scrollable : 0})`;
  if (heroArt && !reduceMotion) heroArt.style.setProperty('--parallax-y', `${Math.min(scrollTop * 0.08, 36)}px`);
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}, { passive: true });
updateScrollEffects();

if (!reduceMotion) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.15 });
  document.querySelectorAll('.project, .services article, .about-body, .contact > *').forEach((el) => observer.observe(el));

  document.querySelectorAll('.button, .contact-email').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) * 0.12;
      const y = (event.clientY - box.top - box.height / 2) * 0.16;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });
}
