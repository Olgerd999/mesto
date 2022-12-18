export default class Section { // объявим класс, который в конструктор принимает items и renderer
	constructor({items, renderer}, template) {
	  this._renderer = renderer;
	  this._container = document.querySelector(template);
	  this._items = items;
	}
	//публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
	
	renderItems() {
		this._items.forEach((item) => {
			this._renderer(item);
		})
	  }
	  
	  //принимает DOM-элемент и добавляет его в контейнер.
	addItem(item) {
		this._container.prepend(item);
	  }
  }
  