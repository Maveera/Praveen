// Nav border on scroll
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Highlight current section in nav
const navMap = {};
links.querySelectorAll('a[href^="#"]').forEach(a => { navMap[a.hash.slice(1)] = a; });
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting || !navMap[e.target.id]) return;
    Object.values(navMap).forEach(a => a.classList.remove('active'));
    navMap[e.target.id].classList.add('active');
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));

// Gentle reveal on scroll (staggered within each group)
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const group = [...e.target.parentElement.children].filter(c => c.classList.contains('reveal'));
    e.target.style.transitionDelay = Math.min(group.indexOf(e.target) * 70, 350) + 'ms';
    e.target.classList.add('in');
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
