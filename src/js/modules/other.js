const other = () => {
  console.log('I am Other module');

  const splideWrap = document.querySelector('.splide');
  if (splideWrap) {
    const splide = new Splide(splideWrap, {
      type: 'loop',
      autoHeight: true,
      autoplay: true,
    });
    splide.mount();
  }
};

export default other;
