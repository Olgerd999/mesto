import { cards } from "../data.js";
import Card from "../сomponents/Card.js";
import FormValidator from "../сomponents/FormValidator.js";
import { selectors } from "../data.js";
import { validationConfig } from "../data.js";
import Section from "../сomponents/Section.js";
import PopupWithImage from "../сomponents/PopupWithImage.js";
import PopupWithForm from "../сomponents/PopupWithForm.js";
import UserInfo from "../сomponents/UserInfo.js";
import Api from "../сomponents/Api.js";
import PopupDelete from "../сomponents/PopupDelete.js";
import './index.css';
import {
  buttonEditName,
  firstnameValue,
  professionValue,
  formName,
  buttonCardAdd,
  formAddCard,
  popupEditName,
  configApi,
  buttonUpdateAvatar,
  formAvatar,
} from "../data.js";

const api = new Api(configApi);
let userId;
function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      likes: cardData.likes,
      _id: cardData._id,
      owner: cardData.owner,
    },
    "#template",
    popupImageZoom.open.bind(popupImageZoom),
    popupDelete.open.bind(popupDelete),
    userId,
    (id) => {
      if (card.isLiked()) {
        api
          .deleteLike(id)
          .then((res) => {
            card.setLikeCountCard(res.likes);
          })
          .catch((error) => console.error(error));
      } else {
        api
          .addLike(id)
          .then((res) => {
            card.setLikeCountCard(res.likes);
          })
          .catch((error) => console.error(error));
      }
    }
  );
  return card.createCard(); //элемент для вставки в контейнер
}

function handleEditProfileButtonClick() {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
}

function handleAddCardClick() {
  popupCardAddValidator.clearInputs(); // переделал чистку (убирает только css стиль)
  popupCardAddValidator.clearErrors();
  popupCardAddValidator.setSubmitButtonState();
  popupAdd.open();
}

function handleProfileFormSubmit(formValue) {
  api
    .editProfile({ name: formValue.firstname, about: formValue.profession })
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((error) => console.error(error))
    .finally(() => popupEdit.renderLoading(false));
}
const handleAvatarFormSubmit = (formValue) => {
  api
    .updateAvatar(formValue.link)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch((error) => console.error(error))
    .finally(() => popupAvatar.renderLoading(false));
};
const handleCardFormSubmit = (formValue) => {
  ///////пр9
  api
    .addNewCard(formValue)
    .then((data) => {
      section.addItem(createCard(data), true);
      popupAdd.close();
    })
    .catch((error) => console.error(error))
    .finally(() => popupAdd.renderLoading(false));
};
const cardContainer = ".elements";
const popupImageZoom = new PopupWithImage(".popup_type_zoom");
// const section = new Section({items: cards, renderer: renderCard}, selectors.cardsContainer);
const section = new Section(
  {
    renderer: (item) => section.addItem(createCard(item), false), //renderer: функция которая описывает логику
    // создания новой карточки
  },
  cardContainer
);

function handleUpdateAvatarButtonClick() {
  popupAvatar.open();
}

const handleDeleteCard = (formValue) => {
  api
    .deleteCard(formValue)
    .then((data) => {
      // console.log(data);
      const elem = document.getElementById(formValue);
      elem.remove();
      popupDelete.close();
    })
    .catch((error) => console.error(error));
};

const popupEdit = new PopupWithForm(
  ".popup_type_edit-name",
  handleProfileFormSubmit
);
const popupAdd = new PopupWithForm(
  ".popup_type_add-card",
  handleCardFormSubmit
);
const popupAvatar = new PopupWithForm(
  ".popup_type_avatar",
  handleAvatarFormSubmit
);
// const userInfo = new UserInfo({nameField: '.profile__title', job: '.profile__subtitle', avatarSelector: '.avatarSelector'});
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__job",
  ".profile__avatar-img"
);
const popupDelete = new PopupDelete(".popup_delete", handleDeleteCard); //pr9
//СЛУШАТЕЛИ

//Слушатели открытия popup
buttonEditName.addEventListener("click", handleEditProfileButtonClick); // открытие popup редактирования имени
buttonCardAdd.addEventListener("click", handleAddCardClick); //слушатель кнопки добавления карточки +
buttonUpdateAvatar.addEventListener("click", handleUpdateAvatarButtonClick);
//запускаем валидацию
const popupNameValidator = new FormValidator(validationConfig, formName);

const popupCardAddValidator = new FormValidator(validationConfig, formAddCard);
const formValidatorAvatar = new FormValidator(validationConfig, formAvatar);
api
  .getData() //pr9
  .then(([userData, cardsData]) => {
    userId = userData._id;
    section.renderItems(cardsData);
    userInfo.renderUserInfo(userData);
  })
  .catch((error) => console.error(error));

popupCardAddValidator.enableValidation();
popupNameValidator.enableValidation();
formValidatorAvatar.enableValidation();

popupImageZoom.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();
