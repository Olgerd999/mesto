import {cards} from "./сomponents/data.js";
import Card from "./сomponents/Card.js";
import FormValidator from "./сomponents/FormValidator.js";
import {selectors} from "./сomponents/utils.js";
import {validationConfig} from "./сomponents/utils.js";
import Section from "./сomponents/Section.js";
import PopupWithImage from "./сomponents/PopupWithImage.js";
import PopupWithForm from "./сomponents/PopupWithForm.js";
import UserInfo from "./сomponents/UserInfo.js";
import './pages/index.css'; 
import {
  buttonEditName,
	firstnameValue,
	professionValue,
	formName,
	buttonCardAdd,
	formAddCard,
  popupEditName,
} from './сomponents/utils.js';

function handleEditProfileButtonClick() {
  popupEdit.open();
  const userInfoObj = userInfo.getUserInfo();
  firstnameValue.value = userInfoObj.name;
  professionValue.value = userInfoObj.job;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData); // подумайте как реализовать эту функцию, она просто создает карточку и возвращает её html представление
  section.addItem(cardElement);
}

//генератор карточек
function createCard(item) {
  const card = new Card(item,selectors.template,popupImageZoom.open.bind(popupImageZoom),); 
  const cardElement = card.generateCard();
  return cardElement;
} 

function handleAddCardClick() {
  popupCardAddValidator.clearInputs();
  popupCardAddValidator.clearError();
  popupAdd.open();
}

function handleProfileFormSubmit (formValue){
  userInfo.setUserInfo(formValue.firstname, formValue.profession);
  popupEdit.close();
}
const handleCardFormSubmit = (formValue) => {
  section.addItem(createCard(formValue));
  popupAdd.close();
}

const popupImageZoom = new PopupWithImage('.popup_type_zoom');
const section = new Section({items: cards, renderer: renderCard}, selectors.cardsContainer);
section.renderItems();
const popupEdit = new PopupWithForm('.popup_type_edit-name', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
const userInfo = new UserInfo({nameSelector: '.profile__title', job: '.profile__subtitle'});
//СЛУШАТЕЛИ

//Слушатели открытия popup
buttonEditName.addEventListener("click", handleEditProfileButtonClick);// открытие popup редактирования имени
buttonCardAdd.addEventListener("click", handleAddCardClick); //слушатель кнопки добавления карточки + 

//запускаем валидацию
const popupNameValidator = new FormValidator(validationConfig, formName);
popupNameValidator.enableValidation();
const popupCardAddValidator = new FormValidator(validationConfig, formAddCard);

popupCardAddValidator.enableValidation();
popupImageZoom.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();