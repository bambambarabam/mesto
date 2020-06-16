const validObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//Присваеваем инпутам значения ошибок
function handleInput(evt, options) {
  const input = evt.target;
  const error = document.querySelector(`#${input.name}-error`)
  if (input.checkValidity()) {
    input.classList.remove(options.inputErrorClass);
    error.textContent = "";
    error.classList.remove(options.errorClass);
  } else {
    input.classList.add(options.inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(options.errorClass);
  }
}

//Валидация
function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );

  formElements.forEach((formElement) => {
    const inputElements = Array.from(
      formElement.querySelectorAll(options.inputSelector)
    );
    inputElements.forEach((input) => {
      input.addEventListener('input', (evt) =>
        handleInput(evt, options)
      );
    })

    const submitButton = formElement.querySelector(options.submitButtonSelector);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    formElement.addEventListener('input', () => {
      const isFormValid = formElement.checkValidity();
      submitButton.disabled = !isFormValid;
      submitButton.classList.toggle(options.inactiveButtonClass, !isFormValid);
    })
  })
}

enableValidation(validObject);
