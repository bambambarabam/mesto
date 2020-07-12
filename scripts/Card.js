import { openPopup } from './index.js';

export class Card {
  constructor(data, cardElementTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._cardElementTemplate = cardElementTemplate;
  }

  _getTemplate() {
    const cardElement = this._cardElementTemplate
    .content
    .cloneNode(true)
    .children[0];
    return cardElement;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__img_add').src = this._link;
    this._element.querySelector('.element__img_add').alt = this._name;
    this._element.querySelector('.element__header_add').textContent = this._name;
    return this._element;
  }

  _delCard(evt) {
    evt.target.closest('.element').remove();
   }

  _favHandler(evt) {
    evt.target.classList.toggle('element__fav_active');
  }

  _getPreview() {
    const elPreview = document.querySelector('.popup_preview');
    const popupSubtitle = elPreview.querySelector('.popup__subtitle');
    const popupImg = elPreview.querySelector('.popup__image');
    popupImg.src = this._link;
    popupImg.alt = this._name;
    popupSubtitle.textContent = this._name;
    openPopup(elPreview);
  }

  _setEventListeners() {
    const imgPreview = this._element.querySelector('.element__img_add');
    imgPreview.addEventListener('mousedown', () => {
      this._getPreview(this._link, this._name);
    });

    this._element.querySelector('.element__fav').addEventListener('mousedown', this._favHandler);
    this._element.querySelector('.element__del').addEventListener('mousedown', this._delCard);
  }
}

