export default class FormValidator {
  constructor(validObject, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = validObject.inputSelector;
    this._submitButtonSelector = validObject.submitButtonSelector;
    this._inactiveButtonClass = validObject.inactiveButtonClass;
    this._inputErrorClass = validObject.inputErrorClass;
    this._errorClass = validObject.errorClass;
  }

  enableValidation() {
    const inputElements = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    const submitButton = this._formSelector.querySelector(this._submitButtonSelector);
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._handleButton(inputElements, submitButton, this._inactiveButtonClass);

    inputElements.forEach((input) => {
      input.addEventListener('input', () => {
        this._handleInput(input);
        this._handleButton(inputElements, submitButton, this._inactiveButtonClass);
      });
      this._disableError(input);
    });
  }

  _handleButton(inputElements, buttonElement, buttonError) {
    if (this._inputInvalid(inputElements)) {
      buttonElement.classList.add(buttonError);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(buttonError);
      buttonElement.removeAttribute('disabled');
    }
  }

  _disableError(input) {
    const errorElement = this._formSelector.querySelector(`#${input.name}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _enableError(input) {
    const error = this._formSelector.querySelector(`#${input.name}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
  }

  _handleInput(input, errorElement) {
    !input.checkValidity() ? this._enableError(input, errorElement, this._inputErrorClass, this._errorClass) : this._disableError(input, errorElement, this._inputErrorClass, this._errorClass);
  }

  _handleFormInput(formElement, submitButton) {
    const isFormValid = formElement.checkValidity();
    submitButton.disabled = !isFormValid;
    submitButton.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }

  _inputInvalid(inputElements) {
    return inputElements.some((input) => {
      return !input.checkValidity();
    });
  }
}
