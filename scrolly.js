console.log('scrolly loaded')
const main = document.querySelector('main');
let scrollTimer = -1;

if (document.location.hash) {
  const currentSlide = document.querySelector(document.location.hash);
  if (currentSlide) {
    currentSlide.focus();
  }
}


main.addEventListener('scroll', () => {
  if (scrollTimer !== -1) { 
    clearTimeout(scrollTimer);
  }
  scrollTimer = setTimeout(() => {
    scrollTimer = -1;
    const slides = [...document.querySelectorAll('.slide')];
    const visible = slides.filter(item => {
      const r = item.getBoundingClientRect()
      return r.y === 0;
    });
    if (visible.length > 0) {
      const lastId = (document.location.hash || '#').slice(1);
      const id = visible[0].getAttribute('id');
      if (lastId !== id) {
        document.location.hash = id;
      }
    }
  }, 100);
});

window.addEventListener('hashchange', (e) => {
  console.log('hash-change', e);
  const currentSlide = document.querySelector(document.location.hash);
  if (currentSlide) {
    currentSlide.focus();
  }
})