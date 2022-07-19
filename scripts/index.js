//задаем переменные
const buttonEditName = document.querySelector(".profile__edit-button"); //кнопка с карандашом редактировать имя
const popupEditName = document.querySelector(".popup_type_edit-name");// popup редактирования имени
const buttonCloseEditName = document.querySelector(".popup__icon");
const firstnameValue = document.getElementById("popup-firstname");
const professionValue = document.getElementById("popup-professional");
const fio = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__subtitle");
const form = document.querySelector(".popup__content_type_editname"); //  форма popup редактировать имя
//5 проектная переменные
const buttonCardAdd = document.querySelector(".profile__add-button"); //кнопка +
const popupAddCard = document.querySelector(".popup_type_add-card");//popup добавления карточек
const formAddCard = document.querySelector(".popup__content_type_addcard");//форма popup добавления карточек 
const buttonPopupAddCardClose = document.querySelector(".popup__icon_type_addcard");//кнопка создания(с созданием карточки)попапа добавления карточек
const buttonPopupZoomClose = document.querySelector(".popup__icon_type_zoom");//кнопка закрытия попап Zoom
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

function SubmitHandlerForm(evt) { //функция отправки формы с именем
  evt.preventDefault(); // отменяем стандартную отправку формы.
  fio.textContent = firstnameValue.value; // вносим введенное значение в Html
  profession.textContent = professionValue.value;
  closePopup(popupEditName); //вызываем функцию закрывающую popup
}

//5 проектная функции
//после исправлений функции
function openPopup(popup) { //открытие любого попапа
  popup.classList.add("popup_opened");
}
function openPopupEditName() {  //открывает popup редактирование имени
  firstnameValue.value = fio.textContent; // берем значение value ИЗ html и вставляем в форму input
  professionValue.value = profession.textContent;
  openPopup(popupEditName);
}
// function openPopupPlusCard() { //открывает popup addcard +
//   openPopup(popupAddCard);
// }
// function openPopupZoom() { //открывает popup Zoom (картинка)
//   openPopup(popupTypeZoom);
// }

function closePopup(popup) {//закрывает любой popup
  popup.classList.remove("popup_opened");
}

// function closePopupEditName() { //закрывает Popup edit name
//   closePopup(popupEditName);
// }

// function closePopupPlusCard() {
//   closePopup(popupAddCard); //закрывает Popup добавления карточек
// }
function closePopupZoom() {
  closePopup(popupTypeZoom); //закрывает Popup Zoom
}
function SubmitPopupAddCardForm(evt) { // добавляет  новую карточку из попапа
  evt.preventDefault();
  const object = { name: placeNameInput.value, link: imgSrc.value }; //создаем объект из введенных значений
  incertCard(object); //передаем объект в функцию создания карточек
  closePopupPlusCard();
  formAddCard.reset();
}

function createCard(card) { //создаем карточку
  const template = document.querySelector(selectors.template).content.querySelector(selectors.element).cloneNode(true); // делаем копию шаблона в DOM
  const templateImg = template.querySelector(selectors.img);
  template.querySelector(selectors.name).textContent = card.name; //задаем карточке имя из переменной
  templateImg.src = card.link; //задаем картинке SRC из переменной
  templateImg.alt = card.name;//задаем картинке ALT из переменной

  const buttonHeart = template.querySelector(selectors.buttonHeart);
  buttonHeart.addEventListener('click', () => { //функция лайк сердечка
    buttonHeart.classList.toggle("element__logo_active"); //меняем класс для черного сердца
  });

  template.querySelector(selectors.buttonRemove).addEventListener('click', () => {
    template.remove(); //удаление карточки
  });

  const image = template.querySelector(selectors.img).addEventListener('click', () => { // отркываем картинку попап
    popupZoomImage.src = card.link; //добавляем картинке адрес SRC
    popupZoomImage.alt = card.name;
    popupCaption.textContent = card.name; //добавляем имя картинки под картинкой
    openPopup(popupTypeZoom);
  });

  return template;
}

function incertCard(card){ //функция вставки карточки в верстку
  const template = createCard(card);
  list.prepend(template);
}
cards.forEach(function (card) {
  //перебор заданного массива
  incertCard(card); //вызов функции для заполнения контейнера содержимым из template
});

// ставим слушателей на события нажатия кнопок
buttonEditName.addEventListener("click", openPopupEditName);
buttonCloseEditName.addEventListener("click", () => closePopup(popupEditName));
form.addEventListener("submit", SubmitHandlerForm);

//5 проектная слушатели
buttonCardAdd.addEventListener("click", () => openPopup(popupAddCard)); //слушатель кнопки добавления карточки + 
formAddCard.addEventListener("submit", SubmitPopupAddCardForm); //создание карточки (сохранение, submit)
buttonPopupAddCardClose.addEventListener("click", () => closePopup(popupAddCard));  //закрытие попапа  addCard крестиком
buttonPopupZoomClose.addEventListener("click", ()=> closePopup(popupTypeZoom)); //слушатель закрытие попапа Zoom с фотографией
