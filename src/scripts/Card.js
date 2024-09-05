import PopupWithConfirmation from "./PopupWithConfirmation.js";

export default class Card {
  constructor(
    item,
    title,
    imageLink,
    likesQuantity,
    selector,
    handleCardClick,
    handleLikeQuantity,
    handleCardDelete
  ) {
    this._item = item;
    this._title = title;
    this._imageLink = imageLink;
    this._likesQuantity = likesQuantity;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLikeQuantity = handleLikeQuantity;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return element;
  }

  setLikesQuantity(likesQuantity) {
    this._likesQuantity = likesQuantity;
    this._element.querySelector(".element__likes-quantity").textContent =
      this._likesQuantity;
  }

  handleLike(evt) {
    const inactiveIcon = evt.target.classList.contains("inactive-icon");
    const activeIcon = evt.target.classList.contains("active-icon");

    if (inactiveIcon) {
      evt.target.style.display = "none";
      evt.target.nextElementSibling.style.display = "inline";
      return true;
    } else if (activeIcon) {
      evt.target.style.display = "none";
      evt.target.previousElementSibling.style.display = "inline";
      return false;
    }
  }

  _closePopupImage(evt) {
    const popup = document.querySelector("#image-popup");

    if (evt.key === "Escape" || evt.type === "click") {
      popup.classList.remove("popup__opened");
    }
  }

  trashCan(firstId, secondId) {
    if (firstId !== secondId) {
      this._element.querySelector(".trash-can-icon").classList.add("dark-icon");
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", this._handleCardClick);

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
      .addEventListener("click", (evt) => this._handleLikeQuantity(evt));

    this._element
      .querySelector(".active-icon")
      .addEventListener("click", (evt) => this._handleLikeQuantity(evt));

    const confirmation = new PopupWithConfirmation("#confirmation-popup");
    const confirmButton = document.querySelector("#confirmation-button");

    this._element
      .querySelector(".trash-can-icon")
      .addEventListener("click", () => {
        confirmation.open();

        confirmButton.addEventListener("click", () => {
          this._handleCardDelete();
          this._element.remove();
          confirmation.close();
        });
      });

    confirmation.setEventListeners();
  }

  generateCard() {
    const elementsContainer = document.querySelector(".elements");

    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._imageLink;

    this._element.querySelector(".element__image").alt = this._title;

    this._element.querySelector(".element__title").textContent = this._title;

    this._element.querySelector(".element__likes-quantity").textContent =
      this._likesQuantity;

    const activeIcon = this._element.querySelector(".active-icon");
    const inactiveIcon = this._element.querySelector(".inactive-icon");

    const isUserLiked = this._item.likes?.some((like) => {
      return like._id === this._item.owner._id;
    });

    if (isUserLiked) {
      activeIcon.classList.remove("dark-icon");
      inactiveIcon.classList.add("dark-icon");
    }

    elementsContainer.prepend(this._element);
  }
}
