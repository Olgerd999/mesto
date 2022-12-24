import { selectors } from "../data.js";
export default class Card {
	constructor (data, template, handleCardClick) {
	// в конструкторе будут динамические данные,
    // для каждого экземпляра свои
		this._name = data.name;
		this._link = data.link;
		this._template = template;
		this._handleCardClick = handleCardClick;
		
	}

	_getTemplate() {
	// забираем разметку из HTML и клонируем элемент
		const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
	// вернём DOM-элемент карточки
		return cardElement;
	}
	 
	// удаляет карточку
	_handleRemoveCard() {
		this._element.remove();
		this._element = null;
	}
	
	// ставит лукас
	_handleLikeCard() {
		this._element.querySelector(selectors.buttonHeart).classList.toggle('element__logo_active');
	}
	_handleImageClick() {
		this._handleCardClick(this._name, this._link);
	  }

	// метод установки слушателей в карточки
	_setEventListeners() {
	this._element.querySelector(selectors.buttonRemove).addEventListener('click', ()=> {
		this._handleRemoveCard()});
	this._element.querySelector(selectors.buttonHeart).addEventListener('click', ()=> {
		this._handleLikeCard()});
	this._element.querySelector(selectors.img).addEventListener('click', () => {
		this._handleImageClick(this._name, this._link)});
	}

	generateCard() {
	// Запишем разметку в приватное поле _element. 
	// Так у других элементов появится доступ к ней.
		this._element = this._getTemplate();
	//обработчик событий
		this._setEventListeners();

	// Добавим данные (текст карточки и ссылка на img)
		this._element.querySelector('.element__title').textContent = this._name;
		this._imageCard = this._element.querySelector('.element__image');
		this._imageCard.src = this._link;
		this._imageCard.alt = this._name;
		// this._element.querySelector('.element__image').src = this._link;
		// this._element.querySelector('.element__image').alt = this._name;
		// console.log(this._element.querySelector('.element__image'));
		
	// Вернём элемент наружу
		return this._element;
	}
}
