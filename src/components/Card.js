export default class Card {
  constructor(cardSelector, { data, handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    this._element = cardElement;
  }

  _favHandler() {
    this._element.querySelector('.element__fav').classList.toggle('element__fav_active');
  }

  _delCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__img_preview').addEventListener('mousedown', () => {
      this._handleCardClick(this._name, this._link);
    })

    this._element.querySelector('.element__fav').addEventListener('mousedown', () => {
      this._favHandler()
    })

    this._element.querySelector('.element__del').addEventListener('mousedown', () => {
      this._delCard()
    })
  }

  renderCard() {
    this._getTemplate();
    this._setEventListeners();
    const elementImg = this._element.querySelector('.element__img_preview');
    elementImg.src = this._link;
    elementImg.alt = this._name;
    this._element.querySelector('.element__header_add').textContent = this._name;
    return this._element;
  }
}

