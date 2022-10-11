import {cards} from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {selectors} from "./utils.js";

//объект с переменными форм
const validationConfig = {
	formElement: '.popup__content',
	button: '.popup__button-save',
	buttonInvalid: 'popup__button-save_invalid',
	buttonValid: 'popup__button_valid',
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  // formError: "form__error",
  formError: ".popup__error",
  popupErrorSpanClass:'.popup__error',
  // errorClass: "popup__input-error_visible",
  }
//задаем переменные
const buttonEditName = document.querySelector(".profile__edit-button"); //кнопка с карандашом редактировать имя
const popupEditName = document.querySelector(".popup_type_edit-name");// popup редактирования имени
const buttonCloseEditName = popupEditName.querySelector(".popup__icon");
const firstnameValue = document.getElementById("popup-firstname");
const professionValue = document.getElementById("popup-professional");
const name = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__subtitle");
const formName = document.querySelector(".popup__content_type_editname"); //  форма popup редактировать имя
const buttonCardAdd = document.querySelector(".profile__add-button"); //кнопка +
const popupAddCard = document.querySelector(".popup_type_add-card");//popup добавления карточек
const formAddCard = document.querySelector(".popup__content_type_addcard");//форма popup добавления карточек 
const buttonPopupAddCardClose = document.querySelector(".popup__icon_type_addcard");//кнопка создания(с созданием карточки)попапа добавления карточек
const buttonPopupZoomClose = document.querySelector(".popup__icon_type_zoom");//кнопка закрытия попап Zoom
const popupTypeZoom = document.querySelector(".popup_type_zoom");
const classForm = document.querySelector(validationConfig.formElement);
const placeNameInput = document.getElementById(selectors.placeNameInput);
const imgSrc = document.getElementById(selectors.imgSrc);
const cardsContainer = document.querySelector(selectors.cardsContainer);
const popupCaption = document.querySelector(selectors.popupCaption);
const popupZoomImage = document.querySelector(selectors.popupZoomImage);
const popupErrorText = document.querySelectorAll('.popup__error');
//функция отправки формы с именем
function submitProfileForm(event) {
  event.preventDefault(); // отменяем стандартную отправку формы.
  name.textContent = firstnameValue.value; // вносим введенное значение в Html
  profession.textContent = professionValue.value;
  closePopup(popupEditName);
}

//открытие любого попапа + ставим слушатели оверлея и ESC
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener('mousedown', clickByOverlayPopupListener);
  document.addEventListener('keydown', clickOnEscPopupListener);
}

//открывает попап добавления карточек
function openPopupAddCard(popup) {
  const button = popup.querySelector('.popup__button-save')
  button.setAttribute('disabled', true);
  button.classList.add(validationConfig.buttonInvalid);
  // const popupCardAddValidator = new FormValidator(validationConfig, formAddCard);
  popupCardAddValidator.clearInputs();
  popupCardAddValidator.clearError();
}

//открывает popup редактирование имени
function openPopupEditName() {
  popupNameValidator.clearError(); //чистит ошибки
  popupNameValidator.clearInputs(); //чистит инпуты
  openPopup(popupEditName);
   firstnameValue.value = name.textContent; // вносим введенное значение в Html
   professionValue.value = profession.textContent;
}
//открывает попап зум(картинку)
function openPopupZoom(name, link){
    popupZoomImage.src = link; //добавляем картинке адрес SRC
    popupZoomImage.alt = name;
    popupCaption.textContent = name; //добавляем имя картинки под картинкой
    openPopup(popupTypeZoom);
}


// Фукция закрывает попап по клику на оверлей
function clickByOverlayPopupListener(evt){
  const popup = document.querySelector(".popup_opened");
  if (evt.target !== evt.currentTarget) {
    return;
  }
  closePopup(popup);
};

// Функция закрывает попап по клавише ESC
function clickOnEscPopupListener(evt){
  if (evt.key === 'Escape') {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
    return;
};

//закрывает любой popup + удаляет слушатели оверлея и ESC
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  deleteListenersFromPopup(popup);
}

//уаляет слушатели из попапа
function deleteListenersFromPopup(popup){
  document.removeEventListener('keydown', clickOnEscPopupListener); //удаляем листнер ESC
  popup.removeEventListener('click', clickByOverlayPopupListener);//удаляем листнер Overlay
}

//вставка первоначальных карточек
cards.forEach((item) => {
  // Создадим экземпляр карточки
  // const card = new Card(item, selectors.template, openPopupZoom);
  // // Создаём карточку и возвращаем наружу
  // const cardElement = card.generateCard();
  const cardElem = createCard(item);
  // Добавляем в DOM
  cardsContainer.append(cardElem);
  }); 

//генератор карточек
function createCard(item) {
  const initcard = new Card(item, selectors.template, openPopupZoom); 
  const cardElement = initcard.generateCard();
  return cardElement;
} 

//функция вставки карточки
function insertCard(card){ 
  //  const newCard = new Card(card, selectors.template, openPopupZoom);
  //  const cardElement = newCard.generateCard();
  const cardElement = createCard(card);
  cardsContainer.prepend(cardElement);
}

// добавляет  новую карточку из попапа
function submitPopupAddCardForm(event) { 
  event.preventDefault();
  const objectCard = { name: placeNameInput.value, link: imgSrc.value }; //создаем объект из введенных значений
  insertCard(objectCard); //передаем объект в функцию создания карточек
  closePopup(popupAddCard);
  formAddCard.reset(); //кнопка сабмита деактивируется при открытии попапа добавления карточки
}

//Слушатели открытия popup
buttonEditName.addEventListener("click", openPopupEditName);// открытие popup редактирования имени
buttonCardAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
  openPopupAddCard(popupAddCard);
}); //слушатель кнопки добавления карточки + 

//слушатели закрытия (крестиком)
buttonCloseEditName.addEventListener("click", () => closePopup(popupEditName)); //закрытие popup
buttonPopupAddCardClose.addEventListener("click", () => closePopup(popupAddCard));  //закрытие popup  addCard крестиком
buttonPopupZoomClose.addEventListener("click", ()=> closePopup(popupTypeZoom)); //слушатель закрытие popup Zoom с фотографией

//слушатели submit
formAddCard.addEventListener("submit", submitPopupAddCardForm); //создание карточки (сохранение, submit)
formName.addEventListener("submit", submitProfileForm);

//запускаем валидацию
const popupNameValidator = new FormValidator(validationConfig, formName);
popupNameValidator.enableValidation();
const popupCardAddValidator = new FormValidator(validationConfig, formAddCard);
popupCardAddValidator.enableValidation();