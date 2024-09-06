import "../pages/index.css";
import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopUpWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import { api } from "./Api.js";

const formCreate = document.querySelector("#form-create");
const formEdit = document.querySelector("#form-edit");
const imageElement = document.querySelector(".popup__image");
const titleElement = document.querySelector(".popup__image-description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileImage = document.querySelector(".profile__image-container");
const popups = document.querySelectorAll(".popup");

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__image",
});

const userData = "61deba0ec5525e755b8d1397";

api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
  userInfo.setAvatar(data.avatar);
});

api.getInitialCards().then((data) => {
  const cardList = new Section(
    {
      items: data.reverse(),
      renderer: (item) => {
        const popupImage = new PopupWithImage(
          titleElement,
          imageElement,
          "#image-popup"
        );

        const card = new Card(
          item,
          item.name,
          item.link,
          item.likes.length,
          "#elements-template",
          () => popupImage.open(item.name, item.link),

          (evt) => {
            const isLiked = card.handleLike(evt);

            if (isLiked) {
              api.toLike(item._id).then((response) => {
                const data = response.likes;
                card.setLikesQuantity(data.length);
              });
            } else {
              api.toDislike(item._id).then((response) => {
                const data = response.likes;
                card.setLikesQuantity(data.length);
              });
            }
          },

          (cardId) => api.deleteCard(cardId)
        );

        const cardElement = card.generateCard();

        card.trashCan(userData, item.owner._id);

        cardList.addItem(cardElement);
      },
    },
    "#elements-template"
  );

  cardList.renderer();
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

const popupFormEdit = new PopUpWithForm(
  handleProfileFormSubmit,
  "#edit-popup",
  ".popup__container-button"
);

const popupFormCreate = new PopUpWithForm(
  handleElementFormSubmit,
  "#create-popup",
  ".popup__container-button"
);

const popupFormAvatar = new PopUpWithForm(
  handleAvatarUpdate,
  "#avatar-popup",
  ".popup__container-button"
);

popupFormEdit.setEventListeners();
popupFormCreate.setEventListeners();
popupFormAvatar.setEventListeners();

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  popupFormEdit.setLoading();

  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#job").value;

  api.editProfile(nameInput, jobInput).then(() => {
    userInfo.setUserInfo(nameInput, jobInput);
    api.getUserInfo().then((data) => {
      userInfo.setUserInfo(data);
      userInfo.getUserInfo();
    });
    popupFormEdit.setLoading();
    popupFormEdit.close();
  });
}

function handleElementFormSubmit(evt) {
  evt.preventDefault();

  popupFormCreate.setLoading();

  const titleInput = document.querySelector("#title").value;
  const imageLinkInput = document.querySelector("#image-link").value;

  api.addCard(titleInput, imageLinkInput).then((data) => {
    const popupImage = new PopupWithImage(
      titleElement,
      imageElement,
      "#image-popup"
    );

    const element = new Card(
      data,
      titleInput,
      imageLinkInput,
      "0",
      "#elements-template",
      () => popupImage.open(titleInput, imageLinkInput),

      (evt) => {
        const isLiked = element.handleLike(evt);

        if (isLiked) {
          api.toLike(data._id).then((response) => {
            const data = response.likes;
            element.setLikesQuantity(data.length);
          });
        } else {
          api.toDislike(data._id).then((response) => {
            const data = response.likes;
            element.setLikesQuantity(data.length);
          });
        }
      },

      (cardId) => api.deleteCard(cardId)
    );

    popupFormCreate.setLoading();

    element.generateCard();

    element.trashCan(userData, data.owner._id);

    popupFormCreate.close();
  });
}

function handleAvatarUpdate(evt) {
  evt.preventDefault();

  popupFormAvatar.setLoading();

  const avatarLink = document.querySelector("#avatar-link").value;

  api.updateAvatar(avatarLink).then(() => {
    userInfo.setAvatar(avatarLink);
    popupFormAvatar.setLoading();
    popupFormAvatar.close();
  });
}

editButton.addEventListener("click", () => {
  popupFormEdit.open();
});

addButton.addEventListener("click", () => {
  popupFormCreate.open();
});

profileImage.addEventListener("click", () => {
  popupFormAvatar.open();
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      evt.currentTarget.classList.remove("popup__opened");
    }
  });
});
