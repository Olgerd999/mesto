//задаем переменные
const openButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__icon");
const firstnameValue = document.getElementById("popup-firstname");
const professionValue = document.getElementById("popup-professional");
const fio = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__subtitle");
const form = document.querySelector(".popup__content");

function addPopup() {
  // функция открытия popup
  popup.classList.add("popup_opened"); // добавляет + класс
  firstnameValue.value = fio.textContent; // добавляем в форму Input значение value="fio"
  professionValue.value = profession.textContent; // добавляем в форму Input значение value="profession"
}

function closePopup() {
  // функция закрытия popup
  popup.classList.remove("popup_opened"); // удаляем класс со свойством display:flex
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // отменяем стандартную отправку формы.
  fio.textContent = firstnameValue.value; // вносим введенное значение в Html
  profession.textContent = professionValue.value;
  closePopup(); //вызываем функцию закрывающую popup
}
// ставим слушателей на события нажатия кнопок
openButton.addEventListener("click", addPopup);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", formSubmitHandler);
