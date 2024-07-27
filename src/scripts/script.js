import "../pages/index.css";
import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopUpWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import setEventListeners from "./utils.js";

const formCreate = document.querySelector("#form-create");
const formEdit = document.querySelector("#form-edit");
const imageElement = document.querySelector(".popup__image");
const titleElement = document.querySelector(".popup__image-description");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const popupImage = new PopupWithImage(
        titleElement,
        imageElement,
        "#image-popup"
      );

      const card = new Card(item.name, item.link, "#elements-template", () =>
        popupImage.open(item.name, item.link)
      );

      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  "#elements-template"
);

cardList.renderer();

const formEditValidator = new FormValidator(
  {
    input: ".popup__container-input",
    submitButton: ".popup__container-button",
    inactiveButton: ".popup__container-button_inactive",
    inputError: ".popup__container-input_type-error",
    errorClass: ".popup__container-error_active",
  },
  formEdit
);

const formCreateValidator = new FormValidator(
  {
    input: ".popup__container-input",
    submitButton: ".popup__container-button",
    inactiveButton: ".popup__container-button_inactive",
    inputError: ".popup__container-input_type-error",
    errorClass: ".popup__container-error_active",
  },
  formCreate
);

formEditValidator.enableValidation();
formCreateValidator.enableValidation();

const popupFormEdit = new PopUpWithForm(handleProfileFormSubmit, "#edit-popup");

const popupFormCreate = new PopUpWithForm(
  handleElementFormSubmit,
  "#create-popup"
);

popupFormEdit.setEventListeners();
popupFormCreate.setEventListeners();

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#job").value;

  const userName = document.querySelector(".profile__name");
  const userJob = document.querySelector(".profile__job");

  const userInfo = new UserInfo({ userName, userJob });

  userInfo.setUserInfo(nameInput, jobInput);

  popupFormEdit.close();
}

export function handleElementFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title").value;
  const imageLinkInput = document.querySelector("#image-link").value;

  initialCards.push({
    name: titleInput,
    link: imageLinkInput,
  });

  const popupImage = new PopupWithImage(
    titleElement,
    imageElement,
    "#image-popup"
  );

  const element = new Card(
    titleInput,
    imageLinkInput,
    "#elements-template",
    () => popupImage.open(titleInput, imageLinkInput)
  );

  element.generateCard();

  popupFormCreate.close();
}

setEventListeners();
