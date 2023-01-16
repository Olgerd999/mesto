export const cards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const selectors = {
  cardsContainer: ".elements",
  template: ".card",
  element: ".element",
  name: ".element__title",
  buttonHeart: ".element__logo",
  buttonRemove: ".element__remove",
  img: ".element__image",
  placeNameInput: "placeName",
  imgSrc: "imgSrc",
  popupZoomImage: ".popup__image",
  popupCaption: ".popup__caption",
};

export const validationConfig = {
  formElement: ".popup__content",
  button: ".popup__button-save",
  buttonInvalid: "popup__button-save_invalid",
  buttonValid: "popup__button_valid",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  // formError: "form__error",
  formError: ".popup__error",
  popupErrorSpanClass: ".popup__error",
  // errorClass: "popup__input-error_visible",
};
const formAvatar = document.querySelector(".popup__content_type_avatar");
const buttonUpdateAvatar = document.querySelector(".profile__avatar");
const buttonEditName = document.querySelector(".profile__edit-button"); //кнопка с карандашом редактировать имя
const popupEditName = document.querySelector(".popup_type_edit-name");
const firstnameValue = document.getElementById("popup-firstname");
const professionValue = document.getElementById("popup-professional");
const formName = document.querySelector(".popup__content_type_editname"); //  форма popup редактировать имя
const buttonCardAdd = document.querySelector(".profile__add-button"); //кнопка +
const formAddCard = document.querySelector(".popup__content_type_addcard"); //форма popup добавления карточек
const configApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-56/",
  headers: {
    "content-type": "application/json",
    authorization: "9414cb6a-0ee9-44b2-b2a5-191d2a72e309",
  },
};

export {
  popupEditName,
  buttonEditName,
  firstnameValue,
  professionValue,
  formName,
  buttonCardAdd,
  formAddCard,
  configApi,
  buttonUpdateAvatar,
  formAvatar,
};
