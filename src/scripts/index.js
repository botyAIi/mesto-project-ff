// импорты
import {likedBtn, clickImage, deleteCard, createCard, initialCards} from './components/cards.js';
import {closeModal, openModal} from './components/modal.js';
import '../pages/index.css';
// DOM узлы
const listCards = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
// окна popup в разных констатах
const popups = document.querySelectorAll('.popup') // псевдомассив со всеми popup
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupCardImage = document.querySelector('.popup_type_image');
// формы профиля
const editProfileForm = popupEditProfile.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
// глобальные константы для формы карточки
const addCardForm = popupAddCard.querySelector('.popup__form');
const placeName = addCardForm.querySelector('.popup__input_type_card-name');
const placeLink = addCardForm.querySelector('.popup__input_type_url');
// кнопки открытия popup'ов
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

//функция submit для Профиля
function uploadDataProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closeModal(popupEditProfile);
}
editProfileForm.addEventListener('submit', uploadDataProfile);

// вывод карточек из массива
initialCards.forEach((card) => {
  listCards.append(createCard(card, likedBtn, deleteCard, clickImage, popupCardImage));
});

// фунцкия submit для добавления карточки

function addNewCard(placeName, placeLink) {
  const card = [];
  card.name = placeName.value;
  card.link = placeLink.value;
  listCards.prepend(createCard(card, likedBtn, deleteCard, clickImage, popupCardImage));
}

addCardForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  addNewCard(placeName, placeLink);
  addCardForm.reset();
  closeModal(popupAddCard);
});

//обработчики для popup
// открытие 
buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent; 
    openModal(popupEditProfile)
  }); 
buttonAddCard.addEventListener('click', () => openModal(popupAddCard)); 
// закрытие
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    } 
})});

