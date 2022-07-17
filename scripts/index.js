//задаем переменные
const openButton = document.querySelector(".profile__edit-button"); //кнопка с карандашом редактировать имя
const popupEditName = document.querySelector(".popup_type_edit-name");// popup редактирования имени
const closeButton = document.querySelector(".popup__icon");
const firstnameValue = document.getElementById("popup-firstname");
const professionValue = document.getElementById("popup-professional");
const fio = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__subtitle");
const form = document.querySelector(".popup__content_type_editname"); //  форма popup редактировать имя
//5 проектная переменные
const addButtonCard = document.querySelector(".profile__add-button"); //кнопка +
const addCardPopup = document.querySelector(".popup_type_add-card");//popup добавления карточек
const formAddCard = document.querySelector(".popup__content_type_addcard");//форма popup добавления карточек 
const closeButtonPopupAddCard = document.querySelector(".popup__icon_type_addcard");//кнопка создания(с созданием карточки)попапа добавления карточек
const closeButtonPopupZoom = document.querySelector(".popup__icon_type_zoom");//кнопка закрытия попап Zoom
const popupTypeZoom = document.querySelector(".popup_type_zoom");

const selectors = {
  list: '.elements',
  template: '.card',
  element: '.element',
  name: '.element__title',
  buttonHeart: '.element__logo',
  buttonRemove: '.element__remove',
  img: '.element__image',
  placeNameInput: 'placename',
  imgSrc: 'imgsrc',
  popupZoomImage: '.popup__image',
  popupCaption: '.popup__caption'
}

const placeNameInput = document.getElementById(selectors.placeNameInput);
const imgSrc = document.getElementById(selectors.imgSrc);
const list = document.querySelector(selectors.list);
const popupCaption = document.querySelector(selectors.popupCaption);
const popupZoomImage = document.querySelector(selectors.popupZoomImage);

function addPopup() {  // функция открытия popup
  popupEditName.classList.add("popup_opened"); // добавляет + класс
  firstnameValue.value = fio.textContent; // добавляем в форму Input значение value="fio"
  professionValue.value = profession.textContent; // добавляем в форму Input значение value="profession"
}
function closePopup() {  // функция закрытия popup редактирования имени
  popupEditName.classList.remove("popup_opened"); // удаляем класс со свойством display:flex
}
function formSubmitHandler(evt) { //функция отправки формы с именем
  evt.preventDefault(); // отменяем стандартную отправку формы.
  fio.textContent = firstnameValue.value; // вносим введенное значение в Html
  profession.textContent = professionValue.value;
  closePopup(); //вызываем функцию закрывающую popup
}

//5 проектная функции
function openPopapPlusCard() {
  addCardPopup.classList.add("popup_opened"); //открывает popup addcard
}
function closePopapPlusCard() {
  addCardPopup.classList.remove("popup_opened"); //закрывает Popup добавления карточек
}
function closePopapZoom() {
  popupTypeZoom.classList.remove("popup_opened"); //закрывает Popup Zoom
}
function formSubmitPopupAddCard(evt) { // добавляет  новую карточку из попапа
  evt.preventDefault();
  const object = { name: placeNameInput.value, link: imgSrc.value }; //создаем объект из введенных значений
  createCard(object); //передаем объект в функцию создания карточек
  closePopapPlusCard();
  formAddCard.reset();
}

function createCard({ name, link }) { //создаем карточку
  const template = document.querySelector(selectors.template).content.querySelector(selectors.element).cloneNode(true); // делаем копию шаблона в DOM
  template.querySelector(selectors.name).textContent = name; //задаем карточке имя из переменной
  template.querySelector(selectors.img).src = link; //задаем картинке SRC из переменной
  template.querySelector(selectors.img).alt = name;//задаем картинке ALT из переменной

  const buttonHeart = template.querySelector(selectors.buttonHeart);
  buttonHeart.addEventListener('click', () => { //функция лайк сердечка
    buttonHeart.classList.toggle("element__logo_active"); //меняем класс для черного сердца
  });

  template.querySelector(selectors.buttonRemove).addEventListener('click', () => {
    template.remove(); //удаление карточки
  });

  const image = template.querySelector(selectors.img).addEventListener('click', () => { // отркываем картинку попап
    popupZoomImage.src = link; //добавляем картинке адрес SRC
    popupZoomImage.alt = name;
    popupTypeZoom.classList.add("popup_opened");
    popupCaption.textContent = name; //добавляем имя картинки под картинкой
  });
  list.prepend(template); //вставляем готовый шаблон в верстку
}

function createInitialCards() { //добавляем первоначальные карточки
  const cards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }];
  cards.forEach(createCard); //запускаем перебор массива в объекте с передачей значений (name, link) в функцию создания карточек.
}
createInitialCards(); // вызываем функцию первоначального создания карточек.

// ставим слушателей на события нажатия кнопок
openButton.addEventListener("click", addPopup);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", formSubmitHandler);

//5 проектная слушатели
addButtonCard.addEventListener("click", openPopapPlusCard); //слушатель кнопки добавления карточки +
formAddCard.addEventListener("submit", formSubmitPopupAddCard); //создание карточки (сохранение, submit)
closeButtonPopupAddCard.addEventListener("click", closePopapPlusCard);  //закрытие попапа  addCard крестиком
closeButtonPopupZoom.addEventListener("click", closePopapZoom); //слушатель закрытие попапа Zoom с фотографией