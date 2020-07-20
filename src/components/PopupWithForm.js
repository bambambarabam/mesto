import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    const [name, link] = this._form.querySelectorAll('.popup__input');
    return {
      name: name.value,
      link: link.value
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });
  }
}
