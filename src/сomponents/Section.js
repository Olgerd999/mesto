export default class Section {
  constructor({renderer}, templateSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(templateSelector);
    // this._items = items;
  }
  //публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer

  renderItems(data) {
    data.forEach(item => {
      this._renderer(item);
    });
  }
  //принимает DOM-элемент и добавляет его в контейнер.
 
  addItem(itemHtml, needToPost) {
    if (needToPost) {
      this._container.prepend(itemHtml);
    } else {
      this._container.append(itemHtml);
    }
  }
}
