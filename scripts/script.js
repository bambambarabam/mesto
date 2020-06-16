const container = document.querySelector('.page');
const popupPreviewTuggle = container.querySelector('.popup_preview');
const popupCreateTuggle = container.querySelector('.popup_add');
const popupProfileTuggle = container.querySelector('.popup_info');
const popupCreateBtn = container.querySelector('.popup__create');
const popupEditExitBtn = container.querySelector('.popup__close_edit');
const popupCreateExitBtn = container.querySelector('.popup__close_add');
const popupPreviewExitBtn = container.querySelector('.popup__close_preview');
const popupSubtitle = container.querySelector('.popup__subtitle');
const popupImg = container.querySelector('.popup__image');
const popup = document.querySelector('.popup');

//объявляем константы для полей ввода
const formAdd = document.forms['popup_add'];
const profileInput = document.forms['popup'];
const nameInput = profileInput.name;
const jobInput = profileInput.job;
const linkValue = formAdd.link;
const placenameValue = formAdd.placename;

const profileBtn = container.querySelector('.profile__edit');
const profileTitle = container.querySelector('.profile__title');
const profileSubitle = container.querySelector('.profile__subtitle');
const createBtn = container.querySelector('.profile__button');
const elements = document.querySelector('.elements');
const cardElementTemplate = document.querySelector('.template__item').content;

//Заполняем поля профиля из попапа
function fillTheProfileFields() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubitle.textContent;
}

//Сбрасываем поля по закрытию формы
function resetFormFields() {
  formAdd.reset();
}

//Открываем попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addClickOverlayListener();
}

//Закрываем попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Слушатель для Esc на попап добавления карточки
function addEscapeCreateListener() {
  document.addEventListener('keydown', escapeCreate);
}

//Слушатель для Esc на попап редактирования профиля
function addEscapeProfileListener() {
  document.addEventListener('keydown', escapeProfile);
}

//Слушатель для Esc на попап превью
function addEscapePreviewListener() {
  document.addEventListener('keydown', escapePreview);
}

//Закрываем превью по Esc
function escapePreview(evt) {
  if (evt.keyCode === 27) {
    closePopup(popupPreviewTuggle);
  }
}

//Закрываем попап профиля по Esc
function escapeProfile(evt) {
  if (evt.keyCode === 27) {
    closePopup(popup);
  }
}

//Закрываем попап добавления по Esc
function escapeCreate(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    resetFormFields();
    closePopup(popupCreateTuggle);
  }
}

//Закрываем попап по клику на оверлей
function clickOverlayToClose(evt) {
  if (evt.target.matches('.popup')) {
    resetFormFields();
    closePopup(evt.target.closest('.popup'));
  }
}

//Слушатель для клика по оверлею
function addClickOverlayListener() {
  document.addEventListener('mousedown', clickOverlayToClose);
}

//объявляем функцию для сохранения изменений в попапе
function profileSubmitHander(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubitle.textContent = jobInput.value;
  closePopup(popupProfileTuggle);
}

//Создаем карточку из шаблона
function createCard(name, link) {
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
    popupPreviewTuggle.classList.toggle('popup_opened');
    popupImg.src = evt.target.closest('.element__img').src;
    popupImg.alt = evt.target.closest('.element__img').alt;
    popupSubtitle.textContent = evt.target.closest('.element__img').alt;
    addEscapePreviewListener();
    addClickOverlayListener();
  });

  //Кнопка удаления карточки
  const delButton = cardElement.querySelector('.element__del');
  delButton.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
  return cardElement;
}

//Создаем новую карточку по данным из формы
function addCardOnPage() {
  elements.prepend(createCard(placenameValue.value, linkValue.value));
}

//Сохраненяем новую карточку
function createCardSaver(evt) {
  evt.preventDefault();
  addCardOnPage();
  resetFormFields();
  closePopup(popupCreateTuggle);
}

//Загружаем в карточки данные из массива
initialCards.forEach((card) => elements.append(createCard(card.name, card.link)));

//объявляем события по нажатию кнопок
profileInput.addEventListener('submit', profileSubmitHander);
popupCreateBtn.addEventListener('click', createCardSaver);
popupCreateExitBtn.addEventListener('click', () => {resetFormFields(), closePopup(popupCreateTuggle)});
popupEditExitBtn.addEventListener('click', () => {fillTheProfileFields(), closePopup(popupProfileTuggle)});
profileBtn.addEventListener('click', () => {openPopup(popupProfileTuggle), fillTheProfileFields(), addEscapeProfileListener()});
createBtn.addEventListener('click', () => {openPopup(popupCreateTuggle), addEscapeCreateListener()});
popupPreviewExitBtn.addEventListener('click', () => {closePopup(popupPreviewTuggle)});
