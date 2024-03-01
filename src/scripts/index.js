// импорты
import { createCard, deleteCardFromDOM, onLike } from "./components/cards.js";
import {
  closeModal,
  handleClosePopup,
  handleClosePopupByClick,
  openModal,
} from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getInitialCards,
  getInitialProfileInfo,
  uploadInfo,
  addCard,
  updateAvatar,
  deleteCard,
  likeCard,
  unlikeCard,
} from "./components/api.js";
import "../pages/index.css";

// Config for validatinon
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_is-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// обект со свойствами удаленяемой карточки
let cardForDelete = {};

// DOM узлы
const listCards = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");

// окна popup в разных констатах
const popups = document.querySelectorAll(".popup"); // псевдомассив со всеми popup
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupCardImage = document.querySelector(".popup_type_image");
const popupCardDelete = document.querySelector(".popup_type_card-delete");

// кнопки попапов
const popupCardDeleteButton = popupCardDelete.querySelector(".popup__button");
const popupAddCardButton = popupAddCard.querySelector(".popup__button");
const popupUpdateAvatarButton =
  popupUpdateAvatar.querySelector(".popup__button");
const popupEditProfileButton = popupEditProfile.querySelector(".popup__button");

// элементы попапа карточки
const popupImage = popupCardImage.querySelector(".popup__image");
const popupImageName = popupCardImage.querySelector(".popup__caption");

// форма для удаления карточки
const cardDeleteForm = popupCardDelete.querySelector(".popup__form");

// формы профиля
const editProfileForm = popupEditProfile.querySelector(".popup__form");
const editAvatarForm = popupUpdateAvatar.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const avatarLinkInput = popupUpdateAvatar.querySelector(
  ".popup__input_type_url"
);

// глобальные константы для формы добавления карточки
const addCardForm = popupAddCard.querySelector(".popup__form");
const placeName = addCardForm.querySelector(".popup__input_type_card-name");
const placeLink = addCardForm.querySelector(".popup__input_type_url");

// кнопки открытия popup'ов
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

//функция submit для Профиля
function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupEditProfileButton);
  uploadInfo(nameInput.value, jobInput.value)
    .then((currentUser) => {
      profileTitle.textContent = currentUser.name;
      profileDesc.textContent = currentUser.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, popupEditProfileButton);
    });
}

// submit для avatar
function updateAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupUpdateAvatarButton);
  updateAvatar(avatarLinkInput.value)
    .then((data) => {
      avatar.style.backgroundImage = `url(${data.avatar})`;
      clearValidation(editAvatarForm, validationConfig);
      closeModal(popupUpdateAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, popupUpdateAvatarButton);
    });
}

//функция открытия попапа карточки (как аргумент функции createCard)
function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageName.textContent = cardData.name;
  openModal(popupCardImage);
}

// функция открытия попапов изменения профиля
function openEditProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(popupEditProfile);
}

function openDeleteConfirmationPopup(card, currentElement) {
  cardForDelete.id = card._id;
  cardForDelete.element = currentElement;
  openModal(popupCardDelete);
}

// обработчик сабмита для подтверждения

function deleteCurrentCard(evt) {
  evt.preventDefault();
  renderDeleting(true, popupCardDeleteButton);
  deleteCard(cardForDelete.id)
    .then(() => {
      deleteCardFromDOM(cardForDelete.element);
      closeModal(popupCardDelete);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderDeleting(false, popupCardDeleteButton);
    });
}

// доработка UX

function renderLoading(isLoading, popupButton) {
  if (isLoading) {
    popupButton.textContent = "Сохранение...";
  } else if (!isLoading) {
    popupButton.textContent = "Сохранить";
  }
}

function renderDeleting(isLoading, popupButton) {
  if (isLoading) {
    popupButton.textContent = "Удаляется...";
  } else if (!isLoading) {
    popupButton.textContent = "Да";
  }
}

// через promise all, чтобы удалить иконки с карточек удаления и активировать свои лайки на карточках

Promise.all([getInitialCards(), getInitialProfileInfo()])
  .then(([cards, currentUser]) => {
    cards.forEach((card) => {
      listCards.append(
        createCard(
          card,
          handleImageClick,
          currentUser,
          onLike,
          likeCard,
          unlikeCard,
          openDeleteConfirmationPopup
        )
      );
    });
    addCardForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      renderLoading(true, popupAddCardButton);
      addCard(placeName.value, placeLink.value)
        .then((card) => {
          listCards.prepend(
            createCard(
              card,
              handleImageClick,
              currentUser,
              onLike,
              likeCard,
              unlikeCard,
              openDeleteConfirmationPopup
            )
          );
          addCardForm.reset();
          clearValidation(addCardForm, validationConfig);
          closeModal(popupAddCard);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          renderLoading(false, popupAddCardButton);
        });
    });
    profileTitle.textContent = currentUser.name;
    profileDesc.textContent = currentUser.about;
    avatar.style.backgroundImage = `url(${currentUser.avatar})`;
  })
  .catch((err) => console.log(err));

// вешаем слушатель закрытия на все попапы

popups.forEach((popup) =>
  popup.addEventListener("mousedown", handleClosePopupByClick)
);

// слушатели форм для submit
editProfileForm.addEventListener("submit", handleProfileEditFormSubmit);
editAvatarForm.addEventListener("submit", updateAvatarSubmit);
cardDeleteForm.addEventListener("submit", deleteCurrentCard);

// слушатели для открытия попапов
buttonEditProfile.addEventListener("click", openEditProfile);
buttonAddCard.addEventListener("click", () => openModal(popupAddCard));
avatar.addEventListener("click", () => openModal(popupUpdateAvatar));

// активация валидации форм
enableValidation(validationConfig);
