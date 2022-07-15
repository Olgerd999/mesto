//задаем переменные
const openButton = document.querySelector(".profile__edit-button"); //кнопка с карандашом редактировать имя
const popupEditName = document.querySelector(".popup__type_edit-name");// popup редактирования имени
const closeButton = document.querySelector(".popup__icon");
const firstnameValue = document.getElementById("popup-firstname");
const professionValue = document.getElementById("popup-professional");
const fio = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__subtitle");
const form = document.querySelector(".popup__content_type_editname"); //  форма popup редактировать имя
//5 проектная переменные
const addButtonCard = document.querySelector(".profile__add-button"); //кнопка +
const addCardPopup = document.querySelector(".popup__type_add-card");//popup добавления карточек
const formAddCard = document.querySelector(".popup__content_type_addcard");//форма popup добавления карточек 
const closeButtonPopupAddCard = document.querySelector(".popup__icon_type_addcard");//кнопка закрытия(с созданием карточки)попапа добавления карточек

const selectors = {
	form: '.',
	input: '.',
	list: '.elements',
	template: '.card',
	element: '.element',
	name: '.element__title',
	buttonHeart: '.element__logo',
	buttonRemove: '.',
  img: '.element__image',
  placeNameInput: 'placename',
  imgSrc: 'imgsrc'
}
const placeNameInput = document.getElementById(selectors.placeNameInput);
const imgSrc = document.getElementById(selectors.imgSrc);
const list = document.querySelector(selectors.list);
// const form = document.querySelector(selectors.form);

function addPopup() {  // функция открытия popup
  popupEditName.classList.add("popup_opened"); // добавляет + класс
  firstnameValue.value = fio.textContent; // добавляем в форму Input значение value="fio"
  professionValue.value = profession.textContent; // добавляем в форму Input значение value="profession"
}
function closePopup() {  // функция закрытия popup
  popupEditName.classList.remove("popup_opened"); // удаляем класс со свойством display:flex
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

//5 проектная слушатели
addButtonCard.addEventListener("click", openPopapPlusCard);
formAddCard.addEventListener("submit", formSubmitPopupAddCard);//функция создания карточки (сохранение)
closeButtonPopupAddCard.addEventListener("click", closePopapPlusCard);  //закрытие попапа  addCard крестиком

//5 проектная функции
function openPopapPlusCard() {
  addCardPopup.classList.add("popup_opened"); //открывает popup addcard
}
function closePopapPlusCard () {
  addCardPopup.classList.remove("popup_opened"); //закрывает Popup добавления карточек
}

 function formSubmitPopupAddCard (event) {
    event.preventDefault();
    createCard(placeNameInput.value, imgSrc.value);
    // console.log(placeNameInput.value, imgSrc.value);
}

function createCard({name, link}) { //создаем карточку из шаблона
	const template = document.querySelector(selectors.template).content.querySelector(selectors.element).cloneNode(true); // делаем копию шаблона в DOM
	template.querySelector(selectors.name).textContent = name;
  template.querySelector(selectors.img).src = link;

	// template.querySelector(selectors.buttonCopy).addEventListener('click',() => { createCard(name);});
	// template.querySelector(selectors.buttonRemove).addEventListener('click',() => { template.remove();});
	
	list.appendChild(template);
}

function createInitialCards() { //добавляем первоначальные карточки
	const cards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }];
	cards.forEach(createCard);
}

createInitialCards();
