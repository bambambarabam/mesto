export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._rendererItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(item) {
    item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
