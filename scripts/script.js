const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editCloseButton = document.querySelector("#edit-close-button");
const addCloseButton = document.querySelector("#add-close-button");
const imagePopupCloseButton = document.querySelector("#image-close-button");
const formElement = document.querySelector(".popup__container");
const formCreate = document.querySelector("#form-create");

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

function closeCreatePopUp() {
  const popup = document.querySelector("#create-popup");

  popup.classList.remove("popup__opened");
}

function openEditPopUp() {
  const popup = document.querySelector("#edit-popup");

  popup.classList.add("popup__opened");
}

function closeEditPopUp() {
  const popup = document.querySelector("#edit-popup");
  const namePlaceholder = document.querySelector("#name").placeholder;
  const jobPlaceholder = document.querySelector("#job").placeholder;

  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#job").value;

  const userName = document.querySelector(".profile__name");
  const userJob = document.querySelector(".profile__job");

  if (nameInput === "") {
    userName.textContent = namePlaceholder;
  }

  if (jobInput === "") {
    userJob.textContent = jobPlaceholder;
  }

  popup.classList.remove("popup__opened");
}

function closeImagePopup() {
  const popup = document.querySelector("#image-popup");

  popup.classList.remove("popup__opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#job").value;

  const userName = document.querySelector(".profile__name");
  const userJob = document.querySelector(".profile__job");

  userName.textContent = nameInput;
  userJob.textContent = jobInput;

  closeEditPopUp();
}

function handleElementFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title").value;
  const imageLinkInput = document.querySelector("#image-link").value;

  if (titleInput === "" || imageLinkInput === "") {
    closeCreatePopUp();
  } else {
    const element = elementsTemplate.querySelector(".element").cloneNode(true);
    element.querySelector(".element__image").src = imageLinkInput;
    element.querySelector(".element__title").textContent = titleInput;
    elementsContainer.prepend(element);

    closeCreatePopUp();
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

editButton.addEventListener("click", openEditPopUp);
addButton.addEventListener("click", openCreatePopUp);
editCloseButton.addEventListener("click", closeEditPopUp);
addCloseButton.addEventListener("click", closeCreatePopUp);
imagePopupCloseButton.addEventListener("click", closeImagePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
formCreate.addEventListener("submit", handleElementFormSubmit);
