function enableValidation(config) {
	//1.находим форму
	const form = document.querySelector(config.form);
	
	form.addEventListener('input', (event) => handleFormInput(event, config));
	setSubmitButtonState(form, config);
  }
  function handleFormInput(event, config) { // отслеживаем поле input ввод и передаем другим функциям
	  const input = event.target; //выбираем поле Input в которой срабатывает событие
	  const form = event.currentTarget; //выбираем текущую форму
	  showFieldError(input);
	  //3. Включить или отключить кнопку отправки формы.
	  setSubmitButtonState(form, config);
  }
  function showFieldError(input){
	  const span = input.nextElementSibling; //находим спан с помощью метода next. выбирает следующий тег за собой.
	  span.textContent = input.validationMessage
  }
  function setSubmitButtonState(form, config) {
	  const button = form.querySelector(config.button);
	  const isValid = form.checkValidity();
	  if (isValid) {
		  button.removeAttribute('disabled');
		  button.classList.remove(config.buttonInvalid);
		  button.classList.add(config.buttonValid);
	  } else {
		  button.setAttribute('disabled', true);
		  button.classList.remove(config.buttonValid);
		  button.classList.add(config.buttonInvalid);
	  }
  }