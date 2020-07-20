import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  container,
  validObject,
  initialCards,
  popupCreateBtn,
  formAdd,
  formProfile,
  nameInput,
  jobInput,
  linkValue,
  placenameValue,
  profileBtn,
  createBtn
 } from '../utils/constants.js';


const addFormValidator = new FormValidator(validObject, formAdd);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validObject, formProfile);
editFormValidator.enableValidation();

const popupImg = new PopupWithImage('.popup_preview');

const cards = new Section({
  items: initialCards, renderer: (item) => {
    displayCards(item);
  }
}, '.elements');

cards.renderItems();

function displayCards(item) {
  const card = new Card('.template__item', {
    data: item, handleCardClick: (name, link) => {
      popupImg.open(name, link);
    }
  })

  const cardElement = card.renderCard();
  cards.addItem(cardElement);
}

const popupCreate = new PopupWithForm({
  popupSelector: '.popup_add', handleSubmit: (item) => {
    displayCards(item);
  }
});

popupCreate.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupEdit = new PopupWithForm({
  popupSelector: '.popup_info', handleSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});
popupEdit.setEventListeners();

profileBtn.addEventListener('mousedown', () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  popupEdit.open();
});

createBtn.addEventListener('mousedown', () => {
  linkValue.value = "";
  placenameValue.value = "";
  addFormValidator.disableButton(popupCreateBtn);
  popupCreate.open();
});
