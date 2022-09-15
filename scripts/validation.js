//объект с переменными форм
const validationConfig = {
	formElement: '.popup__content',
	button: '.popup__button-save',
	buttonInvalid: 'popup__button-save_invalid',
	buttonValid: 'popup__button_valid',
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  // errorClass: "popup__input-error_visible",
  }

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
	// Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  // errorElement.classList.add(config.errorClass);
};

// функция hideInputError — скрывает элемент ошибки; (Функция, которая удаляет класс с ошибкой)
const hideInputError = (formElement, inputElement, config) => {
	// Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  // errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// функция checkInputValidity — проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
	// Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
	// Если проходит, скроем
    hideInputError(formElement, inputElement, validationConfig);
  }
};

//функция проверки всех инпутов на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//устанавливаем статус кнопки (активна или неактивна)
function setSubmitButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.add(config.buttonInvalid);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.buttonInvalid);
    buttonElement.removeAttribute('disabled');
  }
}

//функция Добавления обработчиков всем полям формы
const setEventListeners = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.button);
	// Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  setSubmitButtonState(inputList, buttonElement, validationConfig);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
	// каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
		// Внутри колбэка вызовем checkInputValidity,
        // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);
      setSubmitButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

function enableValidation(config) {
	// Найдём все формы с указанным классом в DOM,
 	// сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formElement));
    // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
		// У каждой формы отменим стандартное поведение
    evt.preventDefault();
  });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
  setEventListeners(formElement, validationConfig);
});
}