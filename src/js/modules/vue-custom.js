const vueCustom = () => {
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        message: 'With Vue!',
        counter: 0,
        visible: true,
        number: 0,
        tweened: 0,
        errors: [],
        x: 0,
        forms: {
          contacts: {
            NAME: '',
            EMAIL: '',
            PHONE: '',
            PASSWORD: '',
            MESSAGE: '',
            AGREE: '',
            ERRORS: [],
          },
          person: {
            NAME: '',
            EMAIL: '',
            MESSAGE: '',
            AGREE: '',
            ERRORS: [],
          },
        },
      };
    },
    mounted() {
      //
    },
    watch: {
      number(n) {
        gsap.to(this, { duration: 1, tweened: Number(n) || 0 });
      },
    },
    computed: {
      formErrors: {
        get() {
          console.log(2);
          //console.log(this.forms[formName]);
          return true;
        },
      },
    },
    methods: {
      onMousemove(e) {
        this.x = e.clientX;
      },
      isFieldValid(
        field,
        rules = {
          required: false,
          minLength: false,
          withoutSymbols: false,
          onlyDigits: false,
          email: false,
          phone: false,
          checkbox: false,
        }
      ) {
        const errors = [];

        let fieldValue = field.value.trim(' ');

        if (rules.required) {
          let isEmpty = fieldValue.length === 0;
          if (isEmpty) errors.push(`Поле обязательно для заполнения`);
        }

        if (rules.checkbox) {
          let isChecked = field.checked;
          if (!isChecked) errors.push(`Необходимо согласие`);
        }

        if (rules.minLength) {
          let minLength = fieldValue.length < rules.minLength;
          if (minLength)
            errors.push(
              `Поле должно содержать не менее ${rules.minLength} символов`
            );
        }

        if (rules.withoutSymbols) {
          let withoutSymbols = /[^a-zA-Z0-9а-яА-ЯеЁ ]/.test(fieldValue);
          if (withoutSymbols) errors.push('Допустимы только буквы или цифры');
        }

        if (rules.onlyDigits) {
          let isOnlyDigit = /^[0-9]$/.test(fieldValue);
          if (!isOnlyDigit) errors.push('Допустимы только цифры');
        }

        if (rules.email) {
          let isEmail =
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/.test(
              fieldValue
            );
          if (!isEmail) errors.push('Неправильный формат электронной почты');
        }

        if (rules.phone) {
          let isPhone =
            /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(
              fieldValue
            );
          if (!isPhone) errors.push('Неправильный формат телефона');
        }

        if (errors.length > 0) return { error: true, errors };

        return true;
      },
      checkForm(e) {
        try {
          let form = e.target;
          let fields = form.querySelectorAll('[data-validation-rules]');
          this.forms[form.dataset.formName].ERRORS = [];
          fields.forEach((field) => {
            field.classList.remove('has-error');
            field.classList.remove('is-valid');

            let fieldErrors = {
              [field.name]: [],
            };
            const rules = JSON.parse(field.dataset.validationRules);
            let result = this.isFieldValid(field, rules);

            if (result.error) {
              fieldErrors[field.name] = result.errors;
            }

            if (fieldErrors[field.name].length > 0) {
              this.forms[form.dataset.formName].ERRORS.push(fieldErrors);
              field.classList.add('has-error');
            } else {
              field.classList.add('is-valid');
            }
          });
          console.log(this.forms[form.dataset.formName].ERRORS);
          if (!this.forms[form.dataset.formName].ERRORS.length)
            this.sendForm(form);
          else form.scrollIntoView();
        } catch (e) {
          console.warn('Error in checkForm func ', e);
        }
      },
      async sendForm(form) {
        let body = {};
        let fields = form.querySelectorAll('[data-validation-rules]');

        fields.forEach((field) => {
          body[field.name] = field.value;
        });

        let response = await fetch(form.action, {
          method: 'POST',
          body: JSON.stringify(body),
        })
          .then((response) => {
            if (!response.ok) throw new Error('Problem on request');
            return response.json();
          })
          .catch((e) => console.warn('Error in fetch ', e));
        alert(`Ответ с сервера: ${JSON.stringify(response)}`);

        console.log(response);
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
