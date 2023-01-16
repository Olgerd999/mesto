import { selectors } from "../utils/data.js";
export default class Card {
  constructor(
    data,
    template,
    handleCardClick,
    handleCardDelete,
    userId,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._id = data._id; // id карточки
    this._ownerId = data.owner._id; //id студента
    this._handleCardDelete = handleCardDelete;
    this._userId = userId; // мой id
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._template)
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  // удаляет карточку
  _handleRemoveCard() {
    this._element.remove();
    this._element = null;
  }

  // ставит лукас
  _handleLikeCard() {
    this._element
      .querySelector(selectors.buttonHeart)
      .classList.toggle("element__logo_active");
  }
  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  isLiked() {
    const userLikedActive = this._likes.find(
      (user) => user._id === this._userId
    );
    return userLikedActive;
  }

  setLikeCountCard(newLikes) {
    this._likes = newLikes;
    this._likeCountCard.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("elements__like_active");
      this._likeButton.classList.remove("elements__like");
    } else {
      this._likeButton.classList.remove("elements__like_active");
      this._likeButton.classList.add("elements__like");
    }
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".elements__like");
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this._id)
    );

    this._deleteButton = this._element.querySelector(".elements__delete");
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleCardDelete(this);
      });
    }

    this._imageCard.addEventListener("click", () => this._handleImageClick());
  }

  createCard() {
    //функция для заполнения контейнера содержимым из template
    this._element = this._getTemplate();
    this.titleCard = this._element.querySelector(".elements__title");
    this.titleCard.textContent = this._name;
    this._imageCard = this._element.querySelector(".elements__image");
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._element.id = this._id;
    this._deleteCard = this._element.querySelector(".elements__delete");
    this._likeCountCard = this._element.querySelector(".elements__like_count");
    this._isOwner();
    this._setEventListeners();
    this.setLikeCountCard(this._likes);
    return this._element;
  }

  _isOwner() {
    if (this._ownerId !== this._userId) {
      this._deleteCard.remove();
      this._deleteButton = null;
    }
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }
}
