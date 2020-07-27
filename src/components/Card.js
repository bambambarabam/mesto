export default class Card {
  constructor(cardSelector, userId, { data, handleCardClick, handleAddLike, handleDelLike, handleConfirmClick }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardId = data.owner._id;
    this._userId = userId._id;
    this._handleAddLike = handleAddLike;
    this._handleDelLike = handleDelLike;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmClick = handleConfirmClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    this._element = cardElement;
  }

  _containsLike() {
    this._element.querySelector('.element__fav').classList.contains('element__fav_active')
      ? this._handleDelLike()
      : this._handleAddLike();
  }

  countLike(like) {
    this._element.querySelector('.element__fav-count').textContent = like.length;
  }

  favHandler() {
    this._element.querySelector('.element__fav').classList.toggle('element__fav_active');
  }

  delCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__img_preview').addEventListener('mousedown', () => {
      this._handleCardClick(this._name, this._link);
    })
    this._element.querySelector('.element__fav').addEventListener('mousedown', () => {
      this._containsLike();
    })
    this._element.querySelector('.element__del').addEventListener('mousedown', () => {
      this._handleConfirmClick();
    })
  }

  renderCard() {
    this._getTemplate();
    this._setEventListeners();
    const elementImg = this._element.querySelector('.element__img_preview');
    elementImg.src = this._link;
    elementImg.alt = this._name;
    this._element.querySelector('.element__header_add').textContent = this._name;
    this._element.querySelector('.element__fav-count').textContent = this._likes.length;
    if (this._cardId !== this._userId) {
      this._element.querySelector('.element__del').style.display = 'none';
    }
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._element.querySelector('.element__fav').classList.add('element__fav_active');
      }
    })
    return this._element;
  }
}
