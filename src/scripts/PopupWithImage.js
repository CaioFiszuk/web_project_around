import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(titleElement, imageElement, selector) {
    super(selector);
    this._titleElement = titleElement;
    this._imageElement = imageElement;
  }

  open(title, link) {
    super.open();

    this._imageElement.src = link;
    this._titleElement.textContent = title;
  }
}
