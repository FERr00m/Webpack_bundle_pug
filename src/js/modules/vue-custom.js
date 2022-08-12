const vueCustom = () => {
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        message: 'With Vue!',
        counter: 0,
        visible: true,
        errors: [],
        form: {
          NAME: {
            value: '',
            rules: [
              {
                required: true,
                message: 'Это поле обязательно для заполнения',
              },
              {
                minLength: 3,
                message: 'Минимум 3 знака',
              },
            ],
          },
          EMAIL: null,
          PHONE: null,
          PASSWORD: null,
          MESSAGE: null,
          CHECKBOX: null,
        },
      };
    },
    mounted() {
      //
    },
    computed: {
      formErrors: function () {
        return this.errors;
      },
    },
    methods: {
      isValid(field, rules) {
        let result;
        rules.fo;
        console.log(field);
        console.log(rules);
        return [false];
      },
      checkForm(e) {
        let form = e.target;
        let fields = form.querySelectorAll('.need-validation');
        this.errors = [];
        fields.forEach((field) => {
          console.log(field.name);
          let fieldErrors = {
            name: field.previousSibling.textContent,
            message: null,
          };
          switch (field.type) {
            case 'text':
              fieldErrors.message = this.isValid(
                field,
                this.form[field.name].rules
              );
              if (fieldErrors.message.length) this.errors.push(fieldErrors);
              break;
            case 'email':
              // if (field.value.length < 3) {
              //   fieldErrors.message.push('Mail < 3');
              // }
              // if (field.value.length < 5) {
              //   fieldErrors.message.push('Mail < 5');
              // }
              // console.log('fieldErrors ', fieldErrors);
              // if (fieldErrors.message.length) this.errors.push(fieldErrors);
              break;
            case 'tel':
              break;
            case 'textarea':
              break;
            case 'checkbox':
              break;
            case 'password':
              break;
          }
          console.log(field);
        });
        console.log(this.errors);
      },
      vueClick() {
        this.counter++;
        if (this.counter === 3) {
          // let t1 = gsap.timeline();
          // t1.to('.fa-thumbs-up', {
          //   duration: 3,
          //   rotation: 360,
          //   x: 300,
          //   ease: 'expo',
          //   transform: 'scale(.5)',
          // });
          // t1.to('.fa-thumbs-up', {
          //   duration: 2,
          //   rotation: 360,
          //   color: '#00807aba',
          //   transform: 'scale(3.5)',
          //   y: -200,
          // });
          $('.eye').addClass('is-alive');
          gsap.to('.eye', { opacity: 1, duration: 5 });
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
      customEvent() {
        myFunctions.customEventDispatch('alex', { detail: [{ name: 'alex' }] });
      },
      vueClick2() {
        this.counter++;
        if (this.counter === 3) {
          $('#progress').removeAttr('value');
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
