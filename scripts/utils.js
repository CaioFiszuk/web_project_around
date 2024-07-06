const popups = document.querySelectorAll(".popup");

function openPopup(popupSelector) {
  const popup = document.querySelector(popupSelector);

  popup.classList.add("popup__opened");
}

function closePopup(popupSelector) {
  const popup = document.querySelector(popupSelector);

  popup.classList.remove("popup__opened");
}

function closePopUpByClick(evt) {
  if (evt.currentTarget === evt.target) {
    evt.currentTarget.classList.remove("popup__opened");
  }
}

function handleEventToClosePopup(evt) {
  const openPopups = document.querySelectorAll(".popup__opened");

  openPopups.forEach((popup) => {
    if (evt.key === "Escape" || evt.type === "click" || evt.type === "submit") {
      popup.classList.remove("popup__opened");
    }
  });
}

export default function setEventListeners() {
  document
    .querySelector(".profile__edit-button")
    .addEventListener("click", () => {
      openPopup("#edit-popup");
    });

  document
    .querySelector(".profile__add-button")
    .addEventListener("click", () => {
      openPopup("#create-popup");
    });

  document.querySelector("#edit-close-button").addEventListener("click", () => {
    closePopup("#edit-popup");
  });

  document.querySelector("#add-close-button").addEventListener("click", () => {
    closePopup("#create-popup");
  });

  document.addEventListener("submit", handleEventToClosePopup);

  document.addEventListener("keydown", handleEventToClosePopup);

  popups.forEach((popup) => {
    popup.addEventListener("click", closePopUpByClick);
  });
}
