//задаем переменные
const buttonEditName = document.querySelector(".profile__edit-button"); //кнопка с карандашом редактировать имя
const popupEditName = document.querySelector(".popup_type_edit-name");// popup редактирования имени
const buttonCloseEditName = popupEditName.querySelector(".popup__icon");
const firstnameValue = document.getElementById("popup-firstname");
const professionValue = document.getElementById("popup-professional");
const name = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__subtitle");
const formName = document.querySelector(".popup__content_type_editname"); //  форма popup редактировать имя

const buttonCardAdd = document.querySelector(".profile__add-button"); //кнопка +
const popupAddCard = document.querySelector(".popup_type_add-card");//popup добавления карточек
const formAddCard = document.querySelector(".popup__content_type_addcard");//форма popup добавления карточек 
const buttonPopupAddCardClose = document.querySelector(".popup__icon_type_addcard");//кнопка создания(с созданием карточки)попапа добавления карточек
const buttonPopupZoomClose = document.querySelector(".popup__icon_type_zoom");//кнопка закрытия попап Zoom
const popupTypeZoom = document.querySelector(".popup_type_zoom");

const selectors = {
  list: '.elements',
  template: '.card',
  element: '.element',
  name: '.element__title',
  buttonHeart: '.element__logo',
  buttonRemove: '.element__remove',
  img: '.element__image',
  placeNameInput: 'placeName',
  imgSrc: 'imgSrc',
  popupZoomImage: '.popup__image',
  popupCaption: '.popup__caption'
}

const placeNameInput = document.getElementById(selectors.placeNameInput);
const imgSrc = document.getElementById(selectors.imgSrc);
const list = document.querySelector(selectors.list);
const popupCaption = document.querySelector(selectors.popupCaption);
const popupZoomImage = document.querySelector(selectors.popupZoomImage);

//функция отправки формы с именем
function submitHandlerForm(event) {
  event.preventDefault(); // отменяем стандартную отправку формы.
  name.textContent = firstnameValue.value; // вносим введенное значение в Html
  profession.textContent = professionValue.value;
  closePopup(popupEditName);
}

//открытие любого попапа
function openPopup(popup) { 
  popup.classList.add("popup_opened");
  popup.addEventListener('click', clickByOverlayPopupListener);
  document.addEventListener('keydown', clickOnEscPopupListener);
  function clickByOverlayPopupListener(evt){
    if (evt.target !== evt.currentTarget) {
      return;
    }
    popup.removeEventListener('click', clickByOverlayPopupListener);
    document.removeEventListener('keydown', clickOnEscPopupListener);
    closePopup(popup);
  };
  function clickOnEscPopupListener(evt){
    if (evt.key === 'Escape') {
      document.removeEventListener('keydown', clickOnEscPopupListener);
      popup.removeEventListener('click', clickByOverlayPopupListener);
      closePopup(popup);
    }
      return;
  };
}

//открывает popup редактирование имени
function openPopupEditName() {
  openPopup(popupEditName);
}

//закрывает любой popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popupErrorText = document.querySelectorAll('.popup__error');
  popupErrorText.forEach((errorElement) => {
    errorElement.textContent=''; 
    });
  }
  
  //закрывает Popup Zoom
function closePopupZoom() {
  closePopup(popupTypeZoom); 
}

//создает карточку
function createCard(card) { 
  const template = document.querySelector(selectors.template).content.querySelector(selectors.element).cloneNode(true); // делаем копию шаблона в DOM
  const templateImg = template.querySelector(selectors.img);
  template.querySelector(selectors.name).textContent = card.name; //задаем карточке имя из переменной
  templateImg.src = card.link; //задаем картинке SRC из переменной
  templateImg.alt = card.name;//задаем картинке ALT из переменной

  const buttonHeart = template.querySelector(selectors.buttonHeart);
  buttonHeart.addEventListener('click', () => { //функция лайк сердечка
    buttonHeart.classList.toggle("element__logo_active"); //меняем класс для черного сердца
  });
  template.querySelector(selectors.buttonRemove).addEventListener('click', () => {
    template.remove(); //удаление карточки
  });
  const image = template.querySelector(selectors.img).addEventListener('click', () => { // отркываем картинку попап
    popupZoomImage.src = card.link; //добавляем картинке адрес SRC
    popupZoomImage.alt = card.name;
    popupCaption.textContent = card.name; //добавляем имя картинки под картинкой
    openPopup(popupTypeZoom);
  });
  return template;
}

//функция вставки карточки в верстку
function insertCard(card){ 
  const newCard = createCard(card);
  list.prepend(newCard);
}
  cards.forEach(function (card) {
  //перебор заданного массива
  insertCard(card); //вызов функции для заполнения контейнера содержимым из template
});

// добавляет  новую карточку из попапа
function submitPopupAddCardForm(event) { 
  event.preventDefault();
  const objectCard = { name: placeNameInput.value, link: imgSrc.value }; //создаем объект из введенных значений
  insertCard(objectCard); //передаем объект в функцию создания карточек
  closePopup(popupAddCard);
  formAddCard.reset();
}

//Слушатели открытия popup
buttonEditName.addEventListener("click", openPopupEditName);// открытие popup редактирования имени
buttonCardAdd.addEventListener("click", () => openPopup(popupAddCard)); //слушатель кнопки добавления карточки + 

//слушатели закрытия (крестиком)
buttonCloseEditName.addEventListener("click", () => closePopup(popupEditName)); //закрытие popup
buttonPopupAddCardClose.addEventListener("click", () => closePopup(popupAddCard));  //закрытие popup  addCard крестиком
buttonPopupZoomClose.addEventListener("click", ()=> closePopup(popupTypeZoom)); //слушатель закрытие popup Zoom с фотографией

//слушатели submit
formAddCard.addEventListener("submit", submitPopupAddCardForm); //создание карточки (сохранение, submit)
formName.addEventListener("submit", submitHandlerForm);

//запускаем валидацию
enableValidation(validationConfig); 
