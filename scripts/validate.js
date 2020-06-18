const validObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function enableError(input, errorElement, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorClass);
}

function disableError(input, errorElement, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function handleInput(input, inputErrorClass, errorClass) {
  const errorElement = document.querySelector(`#${input.name}-error`);
  !input.checkValidity() ? enableError(input, errorElement, inputErrorClass, errorClass) : disableError(input, errorElement, inputErrorClass, errorClass);
}

function handleFormInput(formElement, submitButton, inactiveButtonClass) {
  const isFormValid = formElement.checkValidity();

  submitButton.disabled = !isFormValid;
  submitButton.classList.toggle(inactiveButtonClass, !isFormValid);
}

function enableValidation(options) {
  const formElements = Array.from(document.querySelectorAll(options.formSelector));
  formElements.forEach(formElement => {
    const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
    const submitButton = formElement.querySelector(options.submitButtonSelector);

    formElement.addEventListener('input', () => handleFormInput(formElement, submitButton, options.inactiveButtonClass));
    inputElements.forEach(input => {
      input.addEventListener('input', () => handleInput(input, options.inputErrorClass, options.errorClass));
    });
  });
}

enableValidation(validObject);
