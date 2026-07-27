const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40));
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.service-card, .about-copy, .about-visual, .steps article').forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const text = [
    'Assalam-o-Alaikum, I want a quote from AS Interior Works.',
    '',
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Service: ${data.get('service')}`,
    `Project details: ${data.get('message') || 'Not provided'}`
  ].join('\n');
  window.open(`https://wa.me/923206857809?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
