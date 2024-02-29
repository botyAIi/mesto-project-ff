// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//функция создания карточки
export function createCard(card, clickImage, info, unlikedCard, likedCard, openDeleteCardPopup, submitDelete, popupCardDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const cardImg = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeScore = cardElement.querySelector('.card__like-score');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLike = cardElement.querySelector('.card__like-button');
  
    if (!(card.owner._id === info._id)) {
      deleteButton.remove();
    }

    if (card.likes.find(likeProf => likeProf._id === info._id)) {
      cardLike.classList.add('card__like-button_is-active');
    }
    
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;
  likeScore.textContent = card.likes.length;

  
  cardImg.addEventListener('click', clickImage);

  cardElement.addEventListener('click', (evt) => { // реализация лайков и их количетсво
    if ((evt.target.classList.contains('card__like-button'))) {
      if (!(evt.target.classList.contains('card__like-button_is-active'))) {
        evt.target.classList.add('card__like-button_is-active');
        ++likeScore.textContent;
        likedCard(card._id)
          .then(card => likeScore.textContent = card.likes.length)
          .catch(err => console.log(err))
          .finally(card => likeScore.textContent = card.likes.length);
      } else {
        evt.target.classList.remove('card__like-button_is-active');
        likeScore.textContent -= 1;
        unlikedCard(card._id)
          .then(card => likeScore.textContent = card.likes.length)
          .catch(err => console.log(err))
          .finally(card => likeScore.textContent = card.likes.length);
      }
}});

deleteButton.addEventListener('click', () => { // реализация слушателя по карточке
  openDeleteCardPopup(); 
  submitDelete(card, cardElement);
});
  return cardElement;
};

//функция удаления карточки из DOM
export function deleteCardFromDOM(cardElement) {
  cardElement.remove();
};