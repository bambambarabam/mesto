import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._popupWithConfirm = this._popupWithConfirm.bind(this);
  }

  handleButton(removeCard) {
    this._handleSubmit = removeCard;
  }

  setEventListeners() {
    super.setEventListeners();
  }

  _popupWithConfirm(evt) {
    evt.preventDefault();
    this._handleSubmit();
  }

  open() {
    super.open();
    this._popupSelector.addEventListener('submit', this._popupWithConfirm);
  }

  close() {
    super.close();
    this._popupSelector.removeEventListener('submit', this._popupWithConfirm);
  }
}