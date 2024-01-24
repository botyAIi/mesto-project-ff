// начальный массив карточек
import { openModal } from "./modal";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

//функция создания карточки
export function createCard(card, likedBtn, deleteCard, clickImage, popupImg) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const cardImg = cardElement.querySelector('.card__image');

  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  
  cardImg.addEventListener('click', () => clickImage(popupImg, cardImg));

  cardElement.addEventListener('click', likedBtn);

  cardElement.addEventListener('click', deleteCard);

  return cardElement
};

//функция удаления карточки
export function deleteCard(evt) {
  if (evt.target.classList.contains('card__delete-button')) {
    evt.currentTarget.remove();
  }
};

//функция лайка карточки
export function likedBtn(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  }
};

//функция открытия карточки 
export function clickImage(popup, cardImg) {
  const image = popup.querySelector('.popup__image')
  image.src = cardImg.src;
  image.alt = cardImg.alt;
  popup.querySelector('.popup__caption').textContent = cardImg.alt;
  openModal(popup);
}
