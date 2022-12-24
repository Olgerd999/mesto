import {cards} from "../data.js";
import Card from "../сomponents/Card.js";
import FormValidator from "../сomponents/FormValidator.js";
import {selectors} from "../data.js";
import {validationConfig} from "../data.js";
import Section from "../сomponents/Section.js";
import PopupWithImage from "../сomponents/PopupWithImage.js";
import PopupWithForm from "../сomponents/PopupWithForm.js";
import UserInfo from "../сomponents/UserInfo.js";
import './index.css'; 
import {
  buttonEditName,
	firstnameValue,
	professionValue,
	formName,
	buttonCardAdd,
	formAddCard,
  popupEditName,
} from '../data.js';

function handleEditProfileButtonClick() {
  popupNameValidator.clearInputs();
  popupNameValidator.clearErrors();
  popupNameValidator.setSubmitButtonState();
  popupEdit.open();
  const userInfoObj = userInfo.getUserInfo();
  firstnameValue.value = userInfoObj.name;
  professionValue.value = userInfoObj.job;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
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
  popupCardAddValidator.clearErrors();
  popupCardAddValidator.setSubmitButtonState();
  popupAdd.open();
}

function handleProfileFormSubmit (formValue){
  userInfo.setUserInfo(formValue.firstname, formValue.profession);
  popupEdit.close();
}
const handleCardFormSubmit = (formValue) => {

  section.addItem(renderCard(formValue));//когда тут create Card, все работает. но ревью хочет чтобы тут была render card
  popupAdd.close();
}

const popupImageZoom = new PopupWithImage('.popup_type_zoom');
const section = new Section({items: cards, renderer: renderCard}, selectors.cardsContainer);
section.renderItems();
const popupEdit = new PopupWithForm('.popup_type_edit-name', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
const userInfo = new UserInfo({nameField: '.profile__title', job: '.profile__subtitle'});
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