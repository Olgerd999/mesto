import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popup.querySelector(".popup__content");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._popupButton = this._popup.querySelector(".popup__button-save"); //пр9
  }

  _getInputValues() {
    return this._inputList.reduce(
      (formValue, input) => {
        formValue[input.name] = input.value;
        return formValue;
      },
      { likes: 0 }
    );
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._submitFormCallback(this._getInputValues());
    });
  }
  setInputValues(data) {
    ////пр9
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading) {
    ///пр9
    if (isLoading) {
      this._popupButton.textContent = "Сохранение...";
    } else {
      this._popupButton.textContent = "Сохранить";
    }
  }
  close() {
    super.close();
    this._form.reset();
  }
}
