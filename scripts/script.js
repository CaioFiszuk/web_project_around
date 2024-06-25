const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editCloseButton = document.querySelector("#edit-close-button");
const addCloseButton = document.querySelector("#add-close-button");
const imagePopupCloseButton = document.querySelector("#image-close-button");
const formCreate = document.querySelector("#form-create");
const formEdit = document.querySelector("#form-edit");
const popups = document.querySelectorAll(".popup");

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

const elementsContainer = document.querySelector(".elements");
const elementsTemplate = document.querySelector("#elements-template").content;

initialCards.forEach((item) => {
  const element = elementsTemplate.querySelector(".element").cloneNode(true);
  element.querySelector(".element__image").src = item.link;
  element.querySelector(".element__image").alt = item.name;
  element.querySelector(".element__title").textContent = item.name;

  element.querySelector(".element__image").addEventListener("click", () => {
    const popup = document.querySelector("#image-popup");
    const popupImage = document.querySelector(".popup__image");
    const popupImageDescription = document.querySelector(
      ".popup__image-description"
    );

    popupImage.src = item.link;
    popupImageDescription.textContent = item.name;

    popup.classList.add("popup__opened");
  });

  element.querySelector(".inactive-icon").addEventListener("click", handleLike);
  element.querySelector(".active-icon").addEventListener("click", handleLike);

  element.querySelector(".trash-can-icon").addEventListener("click", () => {
    element.remove();
  });

  elementsContainer.append(element);
});

function openCreatePopUp() {
  const popup = document.querySelector("#create-popup");

  popup.classList.add("popup__opened");
}

function closeCreatePopUp(evt) {
  const popup = document.querySelector("#create-popup");

  if (evt.key === "Escape" || evt.type === "click" || evt.type === "submit") {
    popup.classList.remove("popup__opened");
  }
}

function openEditPopUp() {
  const popup = document.querySelector("#edit-popup");

  popup.classList.add("popup__opened");
}

function closeEditPopUp(evt) {
  const popup = document.querySelector("#edit-popup");

  if (evt.key === "Escape" || evt.type === "click" || evt.type === "submit") {
    popup.classList.remove("popup__opened");
  }
}

function closeImagePopup(evt) {
  const popup = document.querySelector("#image-popup");

  if (evt.key === "Escape" || evt.type === "click") {
    popup.classList.remove("popup__opened");
  }
}

function closePopUpByClick(evt) {
  if (evt.currentTarget === evt.target) {
    evt.currentTarget.classList.remove("popup__opened");
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#job").value;

  const userName = document.querySelector(".profile__name");
  const userJob = document.querySelector(".profile__job");

  userName.textContent = nameInput;
  userJob.textContent = jobInput;

  closeEditPopUp(evt);
}

function handleElementFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title").value;
  const imageLinkInput = document.querySelector("#image-link").value;

  if (titleInput === "" || imageLinkInput === "") {
    closeCreatePopUp(evt);
  } else {
    initialCards.push({
      name: titleInput,
      link: imageLinkInput,
    });

    const element = elementsTemplate.querySelector(".element").cloneNode(true);
    element.querySelector(".element__image").src = imageLinkInput;
    element.querySelector(".element__image").alt = titleInput;
    element.querySelector(".element__title").textContent = titleInput;

    element.querySelector(".element__image").addEventListener("click", () => {
      const popup = document.querySelector("#image-popup");
      const popupImage = document.querySelector(".popup__image");
      const popupImageDescription = document.querySelector(
        ".popup__image-description"
      );

      popupImage.src = imageLinkInput;
      popupImageDescription.textContent = titleInput;

      popup.classList.add("popup__opened");
    });

    element
      .querySelector(".inactive-icon")
      .addEventListener("click", handleLike);
    element.querySelector(".active-icon").addEventListener("click", handleLike);

    element.querySelector(".trash-can-icon").addEventListener("click", () => {
      element.remove();
    });

    elementsContainer.prepend(element);

    closeCreatePopUp(evt);
  }
}

function handleLike(event) {
  const inactiveIcon = event.target.classList.contains("inactive-icon");
  const activeIcon = event.target.classList.contains("active-icon");

  if (inactiveIcon) {
    event.target.style.display = "none";
    event.target.nextElementSibling.style.display = "inline";
  } else if (activeIcon) {
    event.target.style.display = "none";
    event.target.previousElementSibling.style.display = "inline";
  }
}

function showInputError(formElement, input, errorMessage) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.add("popup__container-input_type-error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__container-error_active");
}

function hideInputError(formElement, input) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.remove("popup__container-input_type-error");
  errorElement.classList.remove("popup__container-error_active");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, input) {
  if (!input.validity.valid) {
    showInputError(formElement, input, input.validationMessage);
  } else {
    hideInputError(formElement, input);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function buttonState(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add("popup__container-button_inactive");
  } else {
    button.disabled = false;
    button.classList.remove("popup__container-button_inactive");
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__container-input")
  );

  const button = formElement.querySelector(".popup__container-button");

  buttonState(inputList, button);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input);
      buttonState(inputList, button);
    });
  });
}

function enableValidation(formSelector) {
  const form = formSelector;

  setEventListeners(form);

  switch (form.id) {
    case "form-edit":
      form.addEventListener("submit", handleProfileFormSubmit);
      break;
    case "form-create":
      form.addEventListener("submit", handleElementFormSubmit);
  }
}

editButton.addEventListener("click", openEditPopUp);
addButton.addEventListener("click", openCreatePopUp);
editCloseButton.addEventListener("click", closeEditPopUp);
document.addEventListener("keydown", closeEditPopUp);
addCloseButton.addEventListener("click", closeCreatePopUp);
document.addEventListener("keydown", closeCreatePopUp);
imagePopupCloseButton.addEventListener("click", closeImagePopup);
document.addEventListener("keydown", closeImagePopup);

popups.forEach((popup) => {
  popup.addEventListener("click", closePopUpByClick);
});

enableValidation(formEdit);
enableValidation(formCreate);
