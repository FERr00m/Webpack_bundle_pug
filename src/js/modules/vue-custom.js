const vueCustom = () => {
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        message: 'With Vue!',
        counter: 0,
        visible: true,
      };
    },
    methods: {
      vueClick() {
        this.counter++;
        if (this.counter === 3) {
          let t1 = gsap.timeline();
          t1.to('.fa-thumbs-up', {
            duration: 3,
            rotation: 360,
            x: 300,
            ease: 'expo',
            transform: 'scale(.5)',
          });
          t1.to('.fa-thumbs-up', {
            duration: 2,
            rotation: 360,
            color: '#00807aba',
            transform: 'scale(3.5)',
            y: -200,
          });
          let t2 = gsap.timeline({ repeat: 2 });
          t2.to('body', {
            duration: 5,
            background: `radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)`,
          });
          t2.to('body', {
            duration: 5,
            background: `radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)`,
          });
          this.message += ' & GSAP';
        }
      },
      vueClick2() {
        this.counter++;
        if (this.counter === 3) {
          myFunctions.findGoodPicture(
            'https://picsum.photos/2000/3000',
            '#progress',
            'img'
          );
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
