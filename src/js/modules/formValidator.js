const formValidator = function (formSelector) {
  /* ----------------------------
    CustomValidation prototype
    - Keeps track of the list of invalidity messages for this input
    - Keeps track of what validity checks need to be performed for this input
    - Performs the validity checks and sends feedback to the front end
  ---------------------------- */
  try {
    const form = document.querySelector(formSelector);
    if (form) {
      function CustomValidation(input) {
        this.invalidities = [];
        this.validityChecks = [];

        //add reference to the input node
        this.inputNode = input;

        //trigger method to attach the listener
        this.registerListener();
      }

      CustomValidation.prototype = {
        addInvalidity: function (message) {
          this.invalidities.push(message);
        },
        getInvalidities: function () {
          return this.invalidities.join('. \n');
        },
        checkValidity: function (input) {
          for (let i = 0; i < this.validityChecks.length; i++) {
            let isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
              this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }

            let requirementElement = this.validityChecks[i].element;

            if (requirementElement) {
              if (isInvalid) {
                requirementElement.classList.add('invalid');
                requirementElement.classList.remove('valid');
              } else {
                requirementElement.classList.remove('invalid');
                requirementElement.classList.add('valid');
              }
            } // end if requirementElement
          } // end for
        },
        checkInput: function () {
          // checkInput now encapsulated

          this.inputNode.CustomValidation.invalidities = [];
          this.checkValidity(this.inputNode);

          if (
            this.inputNode.CustomValidation.invalidities.length === 0 &&
            this.inputNode.value !== ''
          ) {
            this.inputNode.setCustomValidity('');
          } else {
            let message = this.inputNode.CustomValidation.getInvalidities();
            this.inputNode.setCustomValidity(message);
          }
        },
        registerListener: function () {
          //register the listener here

          let CustomValidation = this;

          this.inputNode.addEventListener('input', function () {
            CustomValidation.checkInput();
          });
        },
      };

      /* ----------------------------
          Validity Checks
          The arrays of validity checks for each input
          Comprised of three things
            1. isInvalid() - the function to determine if the input fulfills a particular requirement
            2. invalidityMessage - the error message to display if the field is invalid
            3. element - The element that states the requirement
        ---------------------------- */

      let textValidityChecks = [
        {
          isInvalid: function (input) {
            return input.value.trim(' ').length < 3;
          },
          invalidityMessage: 'Это поле должно содержать не менее 3 символов',
          element: document.querySelector('.input-requirements'),
        },
        {
          isInvalid: function (input) {
            let illegalCharacters = input.value.match(/[^a-zA-Z0-9а-яА-ЯеЁ ]/g);
            return illegalCharacters ? true : false;
          },
          invalidityMessage: 'Допустимы только буквы и цифры',
          element: document.querySelector('.input-requirements'),
        },
      ];

      let emailValidityChecks = [
        {
          isInvalid: function () {
            return passwordRepeatInput.value !== passwordInput.value;
          },
          invalidityMessage: 'This password needs to match the first one',
        },
      ];

      let telValidityChecks = [
        {
          isInvalid: function () {
            return passwordRepeatInput.value !== passwordInput.value;
          },
          invalidityMessage: 'This password needs to match the first one',
        },
      ];

      let textareaValidityChecks = [
        {
          isInvalid: function () {
            return passwordRepeatInput.value !== passwordInput.value;
          },
          invalidityMessage: 'This password needs to match the first one',
        },
      ];

      let passwordValidityChecks = [
        {
          isInvalid: function (input) {
            return input.value.length < 8 || input.value.length > 100;
          },
          invalidityMessage:
            'This input needs to be between 8 and 100 characters',
          element: document.querySelector(
            'label[for="password"] .input-requirements li:nth-child(1)'
          ),
        },
        {
          isInvalid: function (input) {
            return !input.value.match(/[0-9]/g);
          },
          invalidityMessage: 'At least 1 number is required',
          element: document.querySelector(
            'label[for="password"] .input-requirements li:nth-child(2)'
          ),
        },
        {
          isInvalid: function (input) {
            return !input.value.match(/[a-z]/g);
          },
          invalidityMessage: 'At least 1 lowercase letter is required',
          element: document.querySelector(
            'label[for="password"] .input-requirements li:nth-child(3)'
          ),
        },
        {
          isInvalid: function (input) {
            return !input.value.match(/[A-Z]/g);
          },
          invalidityMessage: 'At least 1 uppercase letter is required',
          element: document.querySelector(
            'label[for="password"] .input-requirements li:nth-child(4)'
          ),
        },
        {
          isInvalid: function (input) {
            return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
          },
          invalidityMessage: 'You need one of the required special characters',
          element: document.querySelector(
            'label[for="password"] .input-requirements li:nth-child(5)'
          ),
        },
      ];

      let passwordRepeatValidityChecks = [
        {
          isInvalid: function () {
            return passwordRepeatInput.value !== passwordInput.value;
          },
          invalidityMessage: 'This password needs to match the first one',
        },
      ];

      let checkboxValidityChecks = [
        {
          isInvalid: function () {
            return passwordRepeatInput.value !== passwordInput.value;
          },
          invalidityMessage: 'This password needs to match the first one',
        },
      ];

      /* ----------------------------
          Setup CustomValidation
          Setup the CustomValidation prototype for each input
          Also sets which array of validity checks to use for that input
        ---------------------------- */

      const fields = form.querySelectorAll('.need-validation');

      function validate() {
        for (let i = 0; i < fields.length; i++) {
          fields[i].CustomValidation.checkInput();
        }
      }

      fields.forEach((field) => {
        switch (field.type) {
          case 'text':
            field.CustomValidation = new CustomValidation(field);
            field.CustomValidation.validityChecks = textValidityChecks;
            break;
          case 'email':
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
      });
      //let usernameInput = form.getElementById('username');
      //let passwordInput = form.getElementById('password');
      //let passwordRepeatInput = document.getElementById('password_repeat');

      // passwordRepeatInput.CustomValidation = new CustomValidation(
      //   passwordRepeatInput
      // );
      // passwordRepeatInput.CustomValidation.validityChecks =
      //   passwordRepeatValidityChecks;

      /* ----------------------------
          Event Listeners
        ---------------------------- */

      form.addEventListener('submit', validate);
    }
  } catch (error) {
    console.warn('Ошибка в модуле formValidator ', error);
  }
};

export default formValidator;
