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

export const popupAvatarSelector = document.querySelector('.popup_avatar');
export const popupEditAvatar = document.querySelector('.profile__avatar-edit');
export const submitButtonAvatar = document.querySelector('.popup__create_avatar');
