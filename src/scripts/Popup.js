const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(
  ".popup__container-close-button"
);

export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popupElement = document.querySelector(this._selector);
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
    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", () => {
        this.close();
      });
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });

    popups.forEach((popup) => {
      popup.addEventListener("click", (evt) => {
        if (evt.currentTarget === evt.target) {
          evt.currentTarget.classList.remove("popup__opened");
        }
      });
    });
  }
}
