class FormValidator {
	constructor (config, classForm){
		//классы для валидации
		this._formElement = config.formElement;
		this._button = config.button;
		this._buttonInvalid = config.buttonInvalid;
		this._buttonValid = config.buttonValid;
		this._inputSelector = config.inputSelector;
		this._inputErrorClass = config.inputErrorClass;
		this._formError = config.formError;
		//валидируемая форма
		this._classForm = classForm;
		
		this._inputList = Array.from(this._classForm.querySelectorAll(this._inputSelector));//находим все input и собираем из в массив.
		this._errorFormList = Array.from(this._classForm.querySelectorAll(this._formError));//находим все поля Error
	}
	//показывает сообщение с ошибкой
	_showInputError(inputElement){
		// Находим элемент ошибки внутри самой функции
		const errorElement = this._classForm.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(config.inputErrorClass);
		errorElement.textContent = errorMessage;
		// errorElement.classList.add(config.errorClass);
	}
	//прячет сообщение с ошибкой
	_hideInputError(){

	}
	//проверяет все поля на валидность метод some
	_hasInvalidInput(){

	}
	//проверяет поле Input на валидность
	_checkInputValidity(inputElement){
		if (!inputElement.validity.valid) {
			// Если поле не проходит валидацию, покажем ошибку
			this.__showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
		  } else {
			// Если проходит, скроем
			hideInputError(formElement, inputElement, validationConfig);
		  }
		};
	
	////устанавливаем статус кнопки (активна или неактивна)
	 _setSubmitButtonState(){

	 }
	_setEventListeners(){
		this._inputList.forEach((inputElement) => {
			input.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._setSubmitButtonState();
			});
		});
	}
	enableValidation(){
		this._setEventListeners();
	}

}