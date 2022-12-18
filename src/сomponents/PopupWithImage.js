import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
	constructor(popupSelector){
		super(popupSelector);
		this._popupImageZoom = this._popup.querySelector('.popup__image');
		this._popupCaption = this._popup.querySelector('.popup__caption'); 
	}
	open(name, link){
		super.open();
		this._popupImageZoom.src = link; //добавляем картинке адрес SRC
    	this._popupImageZoom.alt = name;
    	this._popupCaption.textContent = name; //добавляем имя картинки под картинкой
	}
}