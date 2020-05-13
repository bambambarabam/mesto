const container = document.querySelector('.page');
const editButton = container.querySelector('.profile__edit');
const popup = container.querySelector('.popup');
const popupExit = container.querySelector('.popup__close');
const formTitle = container.querySelector('.profile__title');
const formSubtitle = container.querySelector('.profile__subtitle');
const formElement = document.forms['popup'];

//объявляем константы для полей ввода
const nameInput = formElement.name;
const jobInput = formElement.job;

//объявляем функцию для заполнения полей из профиля в попапе
function saveFields() {
  nameInput.value = formTitle.textContent;
  jobInput.value = formSubtitle.textContent;
}

//условие: если попап открыт, то закрываем, если закрыт, то открываем
function clickButton() {
  if (popup.classList.contains('popup_opened') === true) {
    popup.classList.toggle('popup_opened');
  } else {
    popup.classList.toggle('popup_opened'); saveFields();
  }
}

//объявляем функцию для сохранения изменений в попапе
function formSubmitHander(evt) {
  evt.preventDefault();

  formTitle.textContent = nameInput.value;
  formSubtitle.textContent = jobInput.value;
  clickButton()
}

//объявляем события по нажатию кнопок
formElement.addEventListener('submit', formSubmitHander);
popupExit.addEventListener('click', clickButton);
editButton.addEventListener('click', clickButton);
