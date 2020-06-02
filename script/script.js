const container = document.querySelector('.page');
const popup = container.querySelector('.popup');
const popupExit = container.querySelector('.popup__close');
const popupPreview = container.querySelector('.popup_preview');
const popupImg = container.querySelector('.popup__image');
const popupAdd = container.querySelector('.popup_add');
const popupCreate = container.querySelector('.popup__create');
const popupEditExit = container.querySelector('.popup__close_edit');
const popupInfoTuggle = container.querySelector('.popup_info');
const popupExitAdd = container.querySelector('.popup__close_add');
const popupSubtitle = container.querySelector('.popup__subtitle');
const popupExitPreview = container.querySelector('.popup__close_preview');

//объявляем константы для полей ввода
const formAdd = document.forms['popup_add'];
const formElement = document.forms['popup'];
const nameInput = formElement.name;
const jobInput = formElement.job;
const linkValue = formAdd.link;
const placenameValue = formAdd.placename;

const editButton = container.querySelector('.profile__edit');
const formTitle = container.querySelector('.profile__title');
const formSubtitle = container.querySelector('.profile__subtitle');
const addButton = container.querySelector('.profile__button');
const elements = document.querySelector('.elements');
const cardElementTemplate = document.querySelector('.template__item').content;

//Открываем/закрываем все попапы / сбрасываем/заполняем поля
function toggleProfilePopup(popup) {
  popup.classList.toggle('popup_opened');
  linkValue.value = "";
  placenameValue.value = "";
  nameInput.value = formTitle.textContent;
  jobInput.value = formSubtitle.textContent;
}

//объявляем функцию для сохранения изменений в попапе
function profileSubmitHander(evt) {
  evt.preventDefault();
  formTitle.textContent = nameInput.value;
  formSubtitle.textContent = jobInput.value;
  toggleProfilePopup(popupInfoTuggle);
}

//Создаем карточку из шаблона
function addCard(name, link) {
  const cardElement = cardElementTemplate.cloneNode(true);
  const linkInput = cardElement.querySelector('.element__img_add');
  const titleInput = cardElement.querySelector('.element__header_add');
  linkInput.src = link;
  linkInput.alt = name;
  titleInput.textContent = name;

  //Добавляем в избранное
  const favButton = cardElement.querySelector('.element__fav');
  favButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__fav_active');
  });

  //Открываем превью
  const elPreview = cardElement.querySelector('.element__img_preview');
  elPreview.addEventListener('click', (evt) => {
    popupPreview.classList.toggle('popup_opened');
    popupImg.src = evt.target.closest('.element__img').src;
    popupImg.alt = evt.target.closest('.element__img').alt;
    popupSubtitle.textContent = evt.target.closest('.element__img').alt;
  });

  //Кнопка удаления карточки
  const delButton = cardElement.querySelector('.element__del');
  delButton.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
  return cardElement;
}

//Создаем новую карточку по данным из формы
function addItem() {
  elements.prepend(addCard(placenameValue.value, linkValue.value));
}

//Сохраненяем новую карточку
function formAddSaver(evt) {
  evt.preventDefault();
  addItem();
  addCard();
  toggleProfilePopup(popupAdd);
}

//Загружаем в карточки данные из массива
initialCards.forEach((card) => elements.append(addCard(card.name, card.link)));

//объявляем события по нажатию кнопок
formElement.addEventListener('submit', profileSubmitHander);
popupCreate.addEventListener('click', formAddSaver);
popupEditExit.addEventListener('click', () => toggleProfilePopup(popupInfoTuggle));
editButton.addEventListener('click', () => toggleProfilePopup(popupInfoTuggle));
popupExitAdd.addEventListener('click', () => toggleProfilePopup(popupAdd));
addButton.addEventListener('click', () => toggleProfilePopup(popupAdd));
popupExitPreview.addEventListener('click', () => toggleProfilePopup(popupPreview));
