const container = document.querySelector('.page');
const editButton = container.querySelector('.profile__edit');
const popup = container.querySelector('.popup');
const popupExit = container.querySelector('.popup__toggle');
const formTitle = container.querySelector('.profile__title');
const formSubtitle = container.querySelector('.profile__subtitle');
const formElement = container.querySelector('.popup__container');

//объявляем константы для полей ввода
const nameInput = container.querySelector('[name="Name"]');
const jobInput = container.querySelector('[name="Job"]');

//объявляем функцию для заполнения полей из профиля в попапе
function saveFields() {
  nameInput.value = formTitle.textContent;
  jobInput.value = formSubtitle.textContent;
}

//объявляем функцию для вызова попапа с заполненными полями
function editProfile() {
  popup.classList.add('popup_opened');
  saveFields();
}

//объявляем функцию для закрытия попапа без сохранения изменений
function closeForm() {
  popup.classList.remove('popup_opened');
  saveFields();
}

//объявляем функцию для сохранения изменений в попапе
function formSubmitHander(evt) {
  evt.preventDefault();

  formTitle.textContent = nameInput.value;
  formSubtitle.textContent = jobInput.value;

  closeForm();
}

//объявляем события по нажатию кнопок
formElement.addEventListener('submit', formSubmitHander);
editButton.addEventListener('click', editProfile);
popupExit.addEventListener('click', closeForm);
