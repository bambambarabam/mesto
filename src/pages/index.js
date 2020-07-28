import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api';

import {
  container,
  validObject,
  popupCreateBtn,
  formAdd,
  formProfile,
  nameInput,
  jobInput,
  linkValue,
  placenameValue,
  profileBtn,
  createBtn,
  popupAvatarSelector,
  popupEditAvatar,
  submitButtonAvatar
} from '../utils/constants.js';

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: 'b39e5495-8618-4848-8d04-1de0d78a2b88',
    'Content-Type': 'application/json'
  }
}

const api = new Api(config);

const addFormValidator = new FormValidator(validObject, formAdd);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validObject, formProfile);
editFormValidator.enableValidation();

const formAvatarValidator = new FormValidator(validObject, popupAvatarSelector)
formAvatarValidator.enableValidation();

const popupImg = new PopupWithImage('.popup_preview');

const popupConfirm = new PopupWithConfirm('.popup_confirm');

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then((values) => {
    const [user, initialCards] = values;
    userInfo.getUserInfo(user.name, user.job, user.avatar);
    userInfo.setUserInfo(user);
    const userId = user;

    const cards = new Section({
      items: initialCards, renderer: (item) => {
        displayCards(item);
      }
    }, '.elements');
    cards.renderItems(initialCards);

    function displayCards(item) {
      const card = new Card('.template__item', userId, {
        handleAddLike: () => {
          api.addLike(item._id)
            .then((item) => {
              card.favHandler();
              card.countLike(item.likes);
            })
            .catch((err) => {
              console.log(err);
            })
        }, handleDelLike: () => {
          api.delLike(item._id)
            .then((item) => {
              card.favHandler();
              card.countLike(item.likes);
            })
            .catch((err) => {
              console.log(err);
            })
        },
        data: item,
        handleCardClick: (name, link) => {
          popupImg.open(name, link);
        },
        handleConfirmClick: () => {
          popupConfirm.open();
          popupConfirm.handleButton(() => {
            api.removeCard(item._id)
              .then(() => {
                card.delCard();
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                popupConfirm.close();
              })
            popupConfirm.setEventListeners();
          })
        }
      })
      const cardElement = card.renderCard();
      cards.addItem(cardElement);
    }

    const formImage = new PopupWithForm({
      popupSelector: '.popup_add',
      handleSubmit: () => {
        formImage.loading(true);
        api.addNewCard(placenameValue.value, linkValue.value)
          .then((item) => {
            displayCards(item);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            formImage.loading(false);
            formImage.close();
          })
      }
    })
    formImage.setEventListeners();

    createBtn.addEventListener('mousedown', () => {
      linkValue.value = "";
      placenameValue.value = "";
      addFormValidator.disableButton(popupCreateBtn);
      formImage.open();
    })
  })
  .catch((err) => {
    console.log(err);
  })

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const popupEdit = new PopupWithForm({
  popupSelector: '.popup_info',
  handleSubmit: (data) => {
    popupEdit.loading(true);
    api.editUserInfo(data.name, data.job)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.loading(false);
        popupEdit.close();
      })
  }
})

popupEdit.setEventListeners();

profileBtn.addEventListener('mousedown', () => {
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.job;
  popupEdit.open();
});

const formAvatar = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleSubmit: (data) => {
    formAvatar.loading(true);
    api.editAvatar(data.link)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formAvatar.loading(false);
        formAvatar.close();
      })
  }
})
formAvatar.setEventListeners();

popupEditAvatar.addEventListener('mousedown', () => {
  formAvatarValidator.disableButton(submitButtonAvatar);
  formAvatar.open();
})
