export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popupElement = document.querySelector(this._selector);
    this._closeButton = this._popupElement.querySelector(
      ".popup__container-close-button"
    );
  }

  open() {
    this._popupElement.classList.add("popup__opened");
  }

  close() {
    this._popupElement.classList.remove("popup__opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._popupElement.classList.remove("popup__opened");
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
