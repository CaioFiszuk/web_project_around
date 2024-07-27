import PopupWithForm from "./PopupWithForm.js";
import { handleElementFormSubmit, handleProfileFormSubmit } from "./script.js";

const editPopup = new PopupWithForm(handleProfileFormSubmit, "#edit-popup");

const createPopup = new PopupWithForm(handleElementFormSubmit, "#create-popup");

export default function setEventListeners() {
  document
    .querySelector(".profile__edit-button")
    .addEventListener("click", () => {
      editPopup.open();
    });

  document
    .querySelector(".profile__add-button")
    .addEventListener("click", () => {
      createPopup.open();
    });
}
