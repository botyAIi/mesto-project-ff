
// импорты
import { createCard, deleteCardFromDOM } from './components/cards.js';
import { closeModal, openModal } from './components/modal.js';
import { clearValidation, enableValidation} from './components/validation.js';
import { getInitialCards, getInitialProfileInfo, uploadInfo, addCard, unlikedCard, likedCard, updateAvatar, deleteCard} from './components/api.js';
import '../pages/index.css';


// Config for validatinon 
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_is-disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// DOM узлы
const listCards = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');

// окна popup в разных констатах
const popups = document.querySelectorAll('.popup') // псевдомассив со всеми popup
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupCardImage = document.querySelector('.popup_type_image');
const popupCardDelete = document.querySelector('.popup_type_card-delete');
const popupImage = popupCardImage.querySelector('.popup__image');
const popupImageName = popupCardImage.querySelector('.popup__caption');

// форма для удаления карточки
const cardDeleteForm = popupCardDelete.querySelector('.popup__form')

// формы профиля
const editProfileForm = popupEditProfile.querySelector('.popup__form');
const editAvatarForm = popupUpdateAvatar.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const avatarLinkInput = popupUpdateAvatar.querySelector('.popup__input_type_url');

// глобальные константы для формы добавления карточки
const addCardForm = popupAddCard.querySelector('.popup__form');
const placeName = addCardForm.querySelector('.popup__input_type_card-name');
const placeLink = addCardForm.querySelector('.popup__input_type_url');

// кнопки открытия popup'ов
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

//функция submit для Профиля
function uploadDataProfile(evt) {
  evt.preventDefault();
  renderLoading(true, popupEditProfile)
  uploadInfo(nameInput.value, jobInput.value)
  .then(info => {
        profileTitle.textContent = info.name;
        profileDesc.textContent = info.about;
      })
    .catch(err => console.log(err))
    .finally(() => {
      closeModal(popupEditProfile);
      renderLoading(false, popupEditProfile);
    });
}

// submit для avatar
function updateAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupUpdateAvatar)
  updateAvatar(avatarLinkInput.value)
    .then(data => {
      avatar.style = `background-image: url(${data.avatar})`;
    })
    .catch(err => console.log(err))
    .finally(() => {
      closeModal(popupUpdateAvatar);
      renderLoading(false, popupUpdateAvatar);
    });
}

// слушатели форм для submit
editProfileForm.addEventListener('submit', uploadDataProfile);
editAvatarForm.addEventListener('submit', updateAvatarSubmit)

//функция открытия карточки (как аргумент функции createCard)
function clickImage(evt) {
  const imageCard = evt.target;
  popupImage.src = imageCard.src;
  popupImage.alt = imageCard.alt;
  popupImageName.textContent = imageCard.alt;
  openModal(popupCardImage);
}

// открытие 
getInitialProfileInfo()
  .then(data => {
    profileTitle.textContent = data.name;
    profileDesc.textContent = data.about;
    avatar.style = `background-image: url(${data.avatar})`;
  })
  .catch(err => console.log(err))

// открытие какихто попапов

  buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent; 
  clearValidation(editProfileForm, validationConfig);
  openModal(popupEditProfile)
  }); 
buttonAddCard.addEventListener('click', () => openModal(popupAddCard));
avatar.addEventListener('click', () => openModal(popupUpdateAvatar));


// закрытие

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if ((evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) && !popup.classList.contains('popup_type_card-delete')) {
      closeModal(popup);
    }})
  });

function openDeleteCardPopup() {
  openModal(popupCardDelete);
}

function submitDelete(card, cardElement) {
  const deleteCurrentCard = (evt) => {
      evt.preventDefault();
      renderDeleting(true, popupCardDelete)
      deleteCard(card._id)
        .then(() => deleteCardFromDOM(cardElement))
        .catch(err => console.log(err))
        .finally(() => {
          closeModal(popupCardDelete)
          renderDeleting(false, popupCardDelete)
        });
        cardDeleteForm.removeEventListener('submit', deleteCurrentCard);
      }
  popupCardDelete.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
      closeModal(popupCardDelete);
      cardDeleteForm.removeEventListener('submit', deleteCurrentCard);
    }});
  cardDeleteForm.addEventListener('submit', deleteCurrentCard)
}

// через promise all, чтобы удалить иконки с карточек удаления и активировать свои лайки на карточках

Promise.all([getInitialCards(), getInitialProfileInfo()])
  .then(([cards, info]) => {
    cards.forEach((card) => {
      listCards.append(createCard(
        card,
        clickImage,
        info,
        unlikedCard,
        likedCard,
        openDeleteCardPopup,
        submitDelete,
        popupCardDelete));
  })
    addCardForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      renderLoading(true, popupAddCard)
      addCard(placeName.value, placeLink.value)
        .then(card => {
          listCards.prepend(createCard(
            card,
            clickImage,
            info,
            unlikedCard,
            likedCard,
            openDeleteCardPopup,
            submitDelete,
            popupCardDelete));
          })
        .catch(err => console.log(err))
        .finally(() => {
          addCardForm.reset();
          clearValidation(addCardForm, validationConfig);
          closeModal(popupAddCard);
          renderLoading(false, popupAddCard)
  });
})})
  .catch(err => console.log(err));

// доработка UX 

  function renderLoading(isLoading, popup) {
    if (isLoading) {
      popup.querySelector('.popup__button').textContent = 'Сохранение...';
    } else if (!isLoading) {
      popup.querySelector('.popup__button').textContent = 'Сохранить';
    }
  }
  
  function renderDeleting(isLoading, popup) {
    if (isLoading) {
      popup.querySelector('.popup__button').textContent = 'Удаляется...';
    } else if (!isLoading) {
      popup.querySelector('.popup__button').textContent = 'Да';
    }
  }
// активация валидации форм
enableValidation(validationConfig);

