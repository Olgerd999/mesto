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

	
}