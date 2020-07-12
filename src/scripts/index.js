import { Card } from './Card.js';
import FormValidator from './FormValidator.js'
import '../pages/index.css';

const initialCards = [
  {
    name: 'Онежское озеро',
    link: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80'
  },
  {
    name: 'Тулиновка',
    link: 'https://images.unsplash.com/photo-1516128935666-9742cf27e24c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
  },
  {
    name: 'Выборг',
    link: 'https://images.unsplash.com/photo-1536012354193-8bb300dc3ce6?ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80'
  },
  {
    name: 'Хийденсельга',
    link: 'https://images.unsplash.com/photo-1559029884-e95924923629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Самарская лука',
    link: 'https://images.unsplash.com/photo-1579987801223-f3823e4f536b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'
  },
  {
    name: 'Ладога',
    link: 'https://images.unsplash.com/photo-1547846218-c982107d30f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1286&q=80'
  }
];

const validObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const container = document.querySelector('.page');
const popupPreviewTuggle = container.querySelector('.popup_preview');
const popupCreateTuggle = container.querySelector('.popup_add');
const popupProfileTuggle = container.querySelector('.popup_info');
const popupEditExitBtn = container.querySelector('.popup__close_edit');
const popupCreateExitBtn = container.querySelector('.popup__close_add');
const popupPreviewExitBtn = container.querySelector('.popup__close_preview');

const formAdd = document.forms['popup_add'];
const formProfile = document.forms['form_profile_name'];
const nameInput = formProfile.name;
const jobInput = formProfile.job;
const linkValue = formAdd.link;
const placenameValue = formAdd.placename;

const profileBtn = container.querySelector('.profile__edit');
const profileTitle = container.querySelector('.profile__title');
const profileSubitle = container.querySelector('.profile__subtitle');
const createBtn = container.querySelector('.profile__button');
const cardElementTemplate = document.querySelector('.template__item');


//Заполняем поля профиля из попапа
function fillTheProfileFields() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubitle.textContent;
}

//Сбрасываем поля с ошибками при закрытии окна
function resetFormFields(popup) {
  const inputs = popup.querySelectorAll('.popup__input');
  inputs.forEach(input => {
    input.value = '';
    input.classList.remove('popup__input_type_error');
    const error = popup.querySelector(`#${input.name}-error`);
    error.textContent = '';
    error.classList.remove('popup__error_visible');
    const button = popup.querySelector('.popup__button');
    button.classList.add('popup__button_disabled');
    button.disabled = true;
  })
}

//Открываем попап и назначаем слушатели на закрытие по оверлею и Esc
export function openPopup(popup) {
  formAdd.reset();
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', clickEscToClose);
  document.addEventListener('mousedown', clickOverlayToClose);
}

//Закрываем попап и снимаем слушатели на закрытие по оверлею и Esc
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', clickEscToClose);
  document.removeEventListener('mousedown', clickOverlayToClose);
}

//Закрываем попап по клику на оверлей
function clickOverlayToClose(evt) {
  if (evt.target.matches('.popup')) {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup),
        resetFormFields(openedPopup);
    }
  }
}

//Закрываем попап по клику на Esc
function clickEscToClose(evt) {
  if (evt.keyCode === 27) {
    const opened = document.querySelector('.popup_opened');
    if (opened) {
      resetFormFields(opened),
        closePopup(opened);
    }
  }
}

//объявляем функцию для сохранения изменений в попапе
function profileSubmitHander(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubitle.textContent = jobInput.value;
  closePopup(popupProfileTuggle);
}

//Рендерим элементы шаблона
initialCards.forEach((item) => {
  const card = new Card(item, cardElementTemplate);
  const cardElement = card.renderCard();
  const elements = document.querySelector('.elements');
  elements.append(cardElement);
});

//Добавляем элементы на страницу
function addCardOnPage() {
  const card = new Card(
    placenameValue.value, linkValue.value, cardElementTemplate
  );
  const cardElement = card.renderCard();
  const elements = document.querySelector('.elements');
  elements.prepend(cardElement);
}

//Сохраненяем новую карточку
function createCardSaver(evt) {
  evt.preventDefault();
  addCardOnPage();
  closePopup(popupCreateTuggle);
  resetFormFields(popupCreateTuggle);
}

//объявляем события по нажатию кнопок
formProfile.addEventListener('submit', profileSubmitHander);
formAdd.addEventListener('submit', createCardSaver);
popupPreviewExitBtn.addEventListener('click', () => { closePopup(popupPreviewTuggle) });

popupCreateExitBtn.addEventListener('click', () => {
  closePopup(popupCreateTuggle),
    resetFormFields(popupCreateTuggle);
});

popupEditExitBtn.addEventListener('click', () => {
  resetFormFields(popupProfileTuggle),
    closePopup(popupProfileTuggle)
});

//Вызываем валидатор для формы профиля
profileBtn.addEventListener('click', () => {
  const editFormValidator = new FormValidator(validObject, popupProfileTuggle);
  editFormValidator.enableValidation();
  openPopup(popupProfileTuggle),
    fillTheProfileFields()
});

//Вызываем валидатор для формы добавления
createBtn.addEventListener('click', () => {
  const addFormValidator = new FormValidator(validObject, popupCreateTuggle);
  addFormValidator.enableValidation();
  openPopup(popupCreateTuggle)
});

