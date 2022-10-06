import { selectors } from "./index.js";
export default class Card {
	constructor (data, template, openPopupZoom) {
	// в конструкторе будут динамические данные,
    // для каждого экземпляра свои
		this._name = data.name;
		this._link = data.link;
		this._template = template;
		this._openPopupZoom = openPopupZoom;
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
	}
	
	// ставит лукас
	_handleLikeCard() {
		this._element.querySelector(selectors.buttonHeart).classList.toggle('element__logo_active');
	}

	// метод установки слушателей в карточки
	_setEventListeners() {
	this._element.querySelector(selectors.buttonRemove).addEventListener('click', ()=> {
		this._handleRemoveCard()});
	this._element.querySelector(selectors.buttonHeart).addEventListener('click', ()=> {
		this._handleLikeCard()});
	this._element.querySelector(selectors.img).addEventListener('click', () => {
		this._openPopupZoom(this._name, this._link)});
	}

	generateCard() {
	// Запишем разметку в приватное поле _element. 
	// Так у других элементов появится доступ к ней.
		this._element = this._getTemplate();
	//обработчик событий
		this._setEventListeners();

	// Добавим данные (текст карточки и ссылка на img)
		this._element.querySelector('.element__title').textContent = this._name;
		this._element.querySelector('.element__image').src = this._link;
		
	// Вернём элемент наружу
		return this._element;
	}
}
