export default class FormValidator {
  constructor(config, form) {
    //классы для валидации
    this._formElementSelector = config.formElement;
    this._button = config.button;
    this._buttonInvalid = config.buttonInvalid;
    this._buttonValid = config.buttonValid;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._formError = config.formError;
    //валидируемая форма
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    ); //находим все input и собираем из в массив.
    this._errorFormList = Array.from(
      this._form.querySelectorAll(this._formError)
    ); //находим все поля span Error

  }
  //показывает сообщение с ошибкой
  _showInputError(inputElement) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    // errorElement.classList.add(config.errorClass);
  }
  //прячет сообщение с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    // errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  }
  //проверяет все поля на валидность метод some
  _hasInvalidInput(inputList) {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //чистка полей ошибок
  clearErrors() {
    this._errorFormList.forEach((errorElement) => {
      errorElement.textContent = "";
    });
  }

  //проверяет поле Input на валидность
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  //чистка полей инпут
  clearInputs() {
    this._inputList.forEach((inputElement) => {
      // inputElement.value = "";
      inputElement.classList.remove(this._inputErrorClass);
    });
  }

  ////устанавливаем статус кнопки (активна или неактивна)
  _setSubmitButtonState(inputList) {
    const buttonElement = this._form.querySelector(this._button);
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._buttonInvalid);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._buttonInvalid);
      buttonElement.removeAttribute("disabled");
    }
  }
  //установка слушателей
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._setSubmitButtonState();
      });
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
}
