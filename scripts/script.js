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
const formProfile = document.forms['form_profile_name'];
const nameInput = formProfile.name;
const jobInput = formProfile.job;
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
function openPopup(popup) {
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
    const opened_popup = document.querySelector('.popup_opened');
    if (opened_popup) {
      closePopup(opened_popup),
        resetFormFields(opened_popup);
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
    popupImg.src = evt.target.closest('.element__img').src;
    popupImg.alt = evt.target.closest('.element__img').alt;
    popupSubtitle.textContent = evt.target.closest('.element__img').alt;
    openPopup(popupPreviewTuggle);
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
  closePopup(popupCreateTuggle);
  resetFormFields(popupCreateTuggle);
}

//Загружаем в карточки данные из массива
initialCards.forEach((card) => elements.append(createCard(card.name, card.link)));

//объявляем события по нажатию кнопок
formProfile.addEventListener('submit', profileSubmitHander);
formAdd.addEventListener('submit', createCardSaver);
popupCreateExitBtn.addEventListener('click', () => { closePopup(popupCreateTuggle), resetFormFields(popupCreateTuggle) });
popupEditExitBtn.addEventListener('click', () => { resetFormFields(popupProfileTuggle), closePopup(popupProfileTuggle) });
profileBtn.addEventListener('click', () => { openPopup(popupProfileTuggle), fillTheProfileFields() });
createBtn.addEventListener('click', () => { openPopup(popupCreateTuggle) });
popupPreviewExitBtn.addEventListener('click', () => { closePopup(popupPreviewTuggle) });
