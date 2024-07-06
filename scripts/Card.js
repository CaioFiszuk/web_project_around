export default class Card {
  constructor(title, imageLink, elementSelector) {
    this._title = title;
    this._imageLink = imageLink;
    this._elementSelector = elementSelector;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._elementSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return element;
  }

  _handleLike(evt) {
    const inactiveIcon = evt.target.classList.contains("inactive-icon");
    const activeIcon = evt.target.classList.contains("active-icon");

    if (inactiveIcon) {
      evt.target.style.display = "none";
      evt.target.nextElementSibling.style.display = "inline";
    } else if (activeIcon) {
      evt.target.style.display = "none";
      evt.target.previousElementSibling.style.display = "inline";
    }
  }

  _openPopupImage() {
    const popup = document.querySelector("#image-popup");
    const popupImage = document.querySelector(".popup__image");
    const popupImageDescription = document.querySelector(
      ".popup__image-description"
    );

    popupImage.src = this._imageLink;
    popupImageDescription.textContent = this._title;

    popup.classList.add("popup__opened");
  }

  _closePopupImage(evt) {
    const popup = document.querySelector("#image-popup");

    if (evt.key === "Escape" || evt.type === "click") {
      popup.classList.remove("popup__opened");
    }
  }

  _removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._openPopupImage();
      });

    document
      .querySelector("#image-close-button")
      .addEventListener("click", (evt) => {
        this._closePopupImage(evt);
      });

    document.addEventListener("keydown", (evt) => {
      this._closePopupImage(evt);
    });

    this._element
      .querySelector(".inactive-icon")
      .addEventListener("click", (evt) => {
        this._handleLike(evt);
      });

    this._element
      .querySelector(".active-icon")
      .addEventListener("click", (evt) => {
        this._handleLike(evt);
      });

    this._element
      .querySelector(".trash-can-icon")
      .addEventListener("click", () => {
        this._removeCard();
      });
  }

  generateCard() {
    const elementsContainer = document.querySelector(".elements");

    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._imageLink;

    this._element.querySelector(".element__image").alt = this._title;

    this._element.querySelector(".element__title").textContent = this._title;

    elementsContainer.prepend(this._element);
  }
}
