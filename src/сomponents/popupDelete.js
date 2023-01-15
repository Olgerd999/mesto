import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._currentCardId = null;
  }

  open(currentCardId) {
    super.open();
    this._currentCardId = currentCardId;
  }

  close() {
    super.close();
    this._currentCardId = null;
  }

  _handlerDeleteClick() {
    this._handleDeleteCard(this._currentCardId);
  }

  setEventListeners() {
    super.setEventListeners();
    const popupButtonDelete = document.querySelector(".popup__button-delete");
    popupButtonDelete.addEventListener("click", () => {
      this._handlerDeleteClick();
    });
  }
}
