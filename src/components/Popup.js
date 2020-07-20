export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._buttonClose = this._popupSelector.querySelector('.popup__close');
    this._clickEscToClose = (evt) => {
      if (evt.keyCode === 27) {
        this.close();
      }
    }
    this._clickOverlayToClose = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    }
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._clickEscToClose);
    document.removeEventListener('mousedown', this._clickOverlayToClose);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._clickEscToClose);
    document.addEventListener('mousedown', this._clickOverlayToClose);
  }

  setEventListeners() {
    this._buttonClose.addEventListener('mousedown', () => this.close());
  }
}
