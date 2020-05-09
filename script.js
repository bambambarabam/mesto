const container = document.querySelector('.page');
const editButton = container.querySelector('.profile__edit');
const popupInput = container.querySelector('.popup_opened');
const popupExit = container.querySelector('.popup__toggle');
const formTitle = container.querySelector('.profile__title');
const formSubtitle = container.querySelector('.profile__subtitle');
const formElement = container.querySelector('.popup__container');
const saveButton = container.querySelector('.popup__button');

function editTitle() {
  popupInput.classList.remove('popup_opened');
}

function exitToggle() {
  popupInput.classList.add('popup_opened');
}

function formSubmitHander(evt) {
  evt.preventDefault();

  const nameInput = document.querySelectorAll('input');
  formTitle.textContent = nameInput[0].value;
  formSubtitle.textContent = nameInput[1].value;
}

formElement.addEventListener('submit', formSubmitHander);
saveButton.addEventListener('click', exitToggle);
editButton.addEventListener('click', editTitle);
popupExit.addEventListener('click', exitToggle);
