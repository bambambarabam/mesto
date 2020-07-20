export const initialCards = [
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

export const validObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const container = document.querySelector('.page');
export const popupCreateBtn = container.querySelector('.popup__create');
export const profileBtn = container.querySelector('.profile__edit');
export const createBtn = container.querySelector('.profile__button');

export const formAdd = document.forms['popup_add'];
export const formProfile = document.forms['form_profile_name'];
export const nameInput = formProfile.name;
export const jobInput = formProfile.job;
export const linkValue = formAdd.link;
export const placenameValue = formAdd.placename;
