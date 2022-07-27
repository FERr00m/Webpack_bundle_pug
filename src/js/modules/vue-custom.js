const vueCustom = () => {
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        message: 'With Vue! & GSAP',
        counter: 0,
        visible: true,
      };
    },
    methods: {
      vueClick() {
        this.counter++;
        if (this.counter == 3) {
          let t1 = gsap.timeline();
          t1.to('.title', {
            duration: 3,
            rotation: 360,
            x: 300,
            ease: 'expo',
            transform: 'scale(.5)',
          });
          t1.to('.title', { duration: 1, x: 0, color: 'green' });
          t1.to('.title', {
            duration: 1,
            rotation: 360,
            transform: 'scale(1.5)',
          });
          gsap.to('body', { duration: 1, backgroundColor: 'black', delay: 3 });
        }
      },
      mainFontSizeMin() {
        var style = getComputedStyle(document.querySelector('html')).fontSize;
        style = parseFloat(style) - 1;
        document.querySelector('html').style.fontSize = style + 'px';
      },
      mainFontSizeMax() {
        var style = getComputedStyle(document.querySelector('html')).fontSize;
        style = parseFloat(style) + 1;
        document.querySelector('html').style.fontSize = style + 'px';
      },
    },
  }).mount('#app');
};

export default vueCustom;
