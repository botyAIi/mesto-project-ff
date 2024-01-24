import {initialCards, createCard} from './components/cards.js';
import {closeModal, openModal} from './components/modal.js';
import '../pages/index.css';
// Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;
// DOM узлы
const listCards = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
// окна popup в разных констатах
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupCardImage = document.querySelector('.popup_type_image');
// forms
// формы профиля
const editProfileForm = popupEditProfile.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
nameInput.value = profileTitle.textContent;
jobInput.value = profileDesc.textContent; 
//функция submit для Профиля
function uploadDataProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  popupEditProfile.classList.remove('popup_is-opened');
}
editProfileForm.addEventListener('submit', uploadDataProfile);

// фунцкия submit для добавления карточки
const addCardForm = popupAddCard.querySelector('.popup__form');
const placeName = addCardForm.querySelector('.popup__input_type_card-name');
const placeLink = addCardForm.querySelector('.popup__input_type_url');

function addNewCard(nameCard, linkCard) {
  initialCards.unshift({name: nameCard.value, link: linkCard.value});
  console.log(initialCards);
  listCards.prepend(createCard(initialCards[0]));
}

addCardForm.addEventListener('submit', (evt) =>{
  evt.preventDefault()
  addNewCard(placeName, placeLink);
});
// кнопки открытия popup'ов
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
// вывод карточек из массива
initialCards.forEach((card) => {
  listCards.append(createCard(card));
});
//обработчики для popup
// открытие 
buttonEditProfile.addEventListener('click',() => openModal(popupEditProfile));
buttonAddCard.addEventListener('click', () => openModal(popupAddCard));
// закрытие
popupEditProfile.addEventListener('click', closeModal);
popupAddCard.addEventListener('click', closeModal);
popupCardImage.addEventListener('click', closeModal);

