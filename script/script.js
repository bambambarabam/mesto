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

const container = document.querySelector('.page');
const popup = container.querySelector('.popup');
const popupExit = container.querySelector('.popup__close');
const popupPreview = container.querySelector('.popup_preview');
const popupImg = container.querySelector('.popup__image');
const popupAdd = container.querySelector('.popup_add');
const popupCreate = container.querySelector('.popup__create');

const formAdd = document.forms['popup_add'];

const popupExitAdd = container.querySelector('.popup__close_add');
const popupSubtitle = container.querySelector('.popup__subtitle');
const popupExitPreview = container.querySelector('.popup__close_preview');
const formElement = document.forms['popup'];

const editButton = container.querySelector('.profile__edit');
const formTitle = container.querySelector('.profile__title');
const formSubtitle = container.querySelector('.profile__subtitle');
const addButton = container.querySelector('.profile__button');

const elements = document.querySelector('.elements');
const cardElementTemplate = document.querySelector('.template__item').content;

//объявляем константы для полей ввода
const nameInput = formElement.name;
const jobInput = formElement.job;

//объявляем функцию для заполнения полей из профиля в попапе
// function saveProfileFields() {
//   nameInput.value = formTitle.textContent;
//   jobInput.value = formSubtitle.textContent;
// }


//TODO: реализовать очистку полей формы "добавить" после нажатия кнопки закрыть




//объявляем функцию для сохранения изменений в попапе
function profileSubmitHander(evt) {
  evt.preventDefault();
  formTitle.textContent = nameInput.value;
  formSubtitle.textContent = jobInput.value;
  toggleProfilePopup();
}

//Добавляем новую карточку
function addCard() {
  const cardElement = cardElementTemplate.cloneNode(true);
  const linkInput = cardElement.querySelector('.element__img_add');
  const titleInput = cardElement.querySelector('.element__header_add');
  linkInput.src = formAdd.link.value;
  linkInput.alt = formAdd.placename.value;
  titleInput.textContent = formAdd.placename.value;

  //Добавление в избранное для новой карточки
  const favButton = cardElement.querySelector('.element__fav');
  favButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__fav_active');
  });

  //Удаление добавленной карточки
  const delButton = cardElement.querySelector('.element__del');
  delButton.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  //Вставляем новую карточку в начало контейнера
  elements.prepend(cardElement);
}

//Сохранение новой карточки
function formAddSaver(evt) {
  evt.preventDefault();
  addCard();

  //Задаем превью для добавленной карточки
  const elPreview = document.querySelector('.element__img_preview');
  elPreview.addEventListener('click', (evt) => {
    popupPreview.classList.toggle('popup_opened');
    popupImg.src = evt.target.closest('.element__img').src;
    popupImg.alt = evt.target.closest('.element__img').alt;
    popupSubtitle.textContent = evt.target.closest('.element__img').alt;
  });

  //Очищаем поля ввода формы добавления новой карточки
  formAdd.link.value = "";
  formAdd.placename.value = "";
  popupAddExit();
}

//Собираем карточку из шаблона
function renderCard(card) {
  const cardElement = cardElementTemplate.cloneNode(true);
  cardElement.querySelector('.element__img').src = card.link;
  cardElement.querySelector('.element__img').alt = card.name;
  cardElement.querySelector('.element__header').textContent = card.name;

  //Удаляем карточку по кнопке
  const delButton = cardElement.querySelector('.element__del');
  delButton.addEventListener('click', (evt) => {
  evt.target.closest('.element').remove();
  });

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

  //Добавляем в разметку
  elements.append(cardElement);
}

//Загружаем в карточки данные из массива
initialCards.forEach(renderCard);


//Вызываем попап добавления новой карточки
addButton.addEventListener('click', function () {
  popupAdd.classList.toggle('popup_opened');
});

//Закрываем превью
popupExitPreview.addEventListener('click', function () {
  popupPreview.classList.toggle('popup_opened');
});

//Закрытие попапа добавления без сохранения
function popupAddExit() {
  popupAdd.classList.remove('popup_opened');
}

//условие: если попап открыт, то закрываем, если закрыт, то открываем
function toggleProfilePopup() {
  if (popup.classList.contains('popup_opened') === true) {
    popup.classList.toggle('popup_opened');
  } else {
    popup.classList.toggle('popup_opened');
  }
  nameInput.value = "";
  jobInput.value = "";
}

//объявляем события по нажатию кнопок
formElement.addEventListener('submit', profileSubmitHander);
popupExit.addEventListener('click', toggleProfilePopup);
editButton.addEventListener('click', toggleProfilePopup);
popupCreate.addEventListener('click', formAddSaver);
popupExitAdd.addEventListener('click', popupAddExit);






