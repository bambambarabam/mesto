# Проект 4: Место

### Обзор

Проект фотохостинга Mesto на [Яндекс.Практикум](https://praktikum.yandex.ru/)

Работа посвящена размещению фотографий из путешествий по России. Сайт ориентирован на русскоговорящую аудиторию. Адаптирован для мобильных устройств.

**Функциональность**

* По кнопке "Редактировать" вызывается всплывающее окно с возможностью редактирования имени и профессии.
* По кнопке "+" вызывается форма для добавления новой карточки.
* Клик по карточке открывает превью.
* Есть возможность добавить карточку в избранное или удалить.
* Реализована валидация заполения форм ввода.
* Реализована функция закрытия всплывающих форм по клику на фон, по клавише Esc.

**Применяемые технологии**

* Всплывающие окна скрыты с помощью свойства visibility, которое переключается модификатором.
* Плавное открытие/закрытие окон реализовано через свойство transition.
* Шрифты на странице подключены через свойство @font-face.
* Карточки генерируются благодаря JS  - в файле скрипта задан массив с названиями мест и ссылками на фотографии, в HTML-разметке подготовлен template-шаблон, который заполняется также через кнопку добавления.
* В работе используется методология БЭМ с nested-файловой структурой.
* Для группировки карточек на странице используется технология Grid Layout.
* Для позиционирования элементов в секции профиля используется Flexbox.
* Для адаптации под разные разрешения экранов используются CSS-медиазапросы.
* Применяются классы
* Применяется импорт классов
* Применяется подключение скрипта черем модули
* Сборка проекта с помощью Webpack
* Подключение API

**Макет**

* [Ссылка на макет](https://www.figma.com/file/uyE0hmyYWC6NE9Lt8wgc0H/JavaScript.-Sprint-5?node-id=3%3A279)

<a href="https://bambambarabam.github.io/mesto/" target="_blank">Перейти на сайт</a>

Спасибо за внимание!
