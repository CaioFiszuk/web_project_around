const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__container__close-button");
const formElement = document.querySelector(".popup__container");
const nameInput = document.querySelector("#name").value;
const jobInput = document.querySelector("#job").value;

function openPopUp() {
  const popup = document.querySelector(".popup");

  popup.classList.add("popup__opened");
}

function closePopUp() {
  const popup = document.querySelector(".popup");
  const namePlaceholder = document.querySelector("#name").placeholder;
  const jobPlaceholder = document.querySelector("#job").placeholder;

  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#job").value;

  const userName = document.querySelector(".profile__name");
  const userJob = document.querySelector(".profile__job");

  if (nameInput == "" && jobInput == "") {
    userName.textContent = namePlaceholder;
    userJob.textContent = jobPlaceholder;
  }

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

  closePopUp();
}

editButton.addEventListener("click", openPopUp);
closeButton.addEventListener("click", closePopUp);
formElement.addEventListener("submit", handleProfileFormSubmit);
