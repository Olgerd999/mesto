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
  setSubmitButtonState(inputList, buttonElement, validationConfig); //!!!!!! вызвать не забыть проверить
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