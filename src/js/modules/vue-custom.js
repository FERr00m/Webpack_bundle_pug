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
      },
      mainFontSizeMin() {
        var style = getComputedStyle(document.querySelector('html')).fontSize;
        style = parseFloat(style) - 1;
        console.log(parseFloat(style));
        document.querySelector('html').style.fontSize = style + 'px';
      },
      mainFontSizeMax() {
        var style = getComputedStyle(document.querySelector('html')).fontSize;
        style = parseFloat(style) + 1;
        console.log(parseFloat(style));
        document.querySelector('html').style.fontSize = style + 'px';
      },
    },
  }).mount('#app');
};

export default vueCustom;
