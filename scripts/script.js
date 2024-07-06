import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import setEventListeners from "./utils.js";

const formCreate = document.querySelector("#form-create");
const formEdit = document.querySelector("#form-edit");

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

initialCards.forEach((item) => {
  const element = new Card(item.name, item.link, "#elements-template");

  element.generateCard();
});

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

formEditValidator._form.addEventListener("submit", handleProfileFormSubmit);

formCreateValidator._form.addEventListener("submit", handleElementFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#job").value;

  const userName = document.querySelector(".profile__name");
  const userJob = document.querySelector(".profile__job");

  userName.textContent = nameInput;
  userJob.textContent = jobInput;
}

function handleElementFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title").value;
  const imageLinkInput = document.querySelector("#image-link").value;

  console.log(titleInput, imageLinkInput);

  initialCards.push({
    name: titleInput,
    link: imageLinkInput,
  });

  const element = new Card(titleInput, imageLinkInput, "#elements-template");

  element.generateCard();
}

setEventListeners();
