export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClosePopup = this._popup.querySelector(".popup__icon");
  }
  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }
  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_opened");
  }
  //закрывает попав клавишей ESC
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  //добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target !== evt.currentTarget) {
        return;
      }
      this.close();
    });
    this._buttonClosePopup.addEventListener("click", this.close.bind(this));
  }
}
