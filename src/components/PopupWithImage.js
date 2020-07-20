import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popupSelector.querySelector('.popup__image');
    this._title = this._popupSelector.querySelector('.popup__subtitle');
  }

  open(name, link) {
    this._link.src = link;
    this._title.textContent = name;
    this._title.alt = name;
    super.open();
    super.setEventListeners();
  }
}
