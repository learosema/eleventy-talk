const wrapSlides = (str) =>
  str
    .split('<hr>')
    .map((slide, idx) => `<section class="slide" id="slide_${idx+1}" tabindex="-1">${slide}</section>`)
    .join('');
const anchors = (str) =>
  str.replace(/\<a\shref/g, '<a target="_blank" rel="noopener noreferer" href');

module.exports = {
  filters: {
    slides: (str) => anchors(wrapSlides(str)),
  },
};
