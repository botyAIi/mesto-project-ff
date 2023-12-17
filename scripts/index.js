// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const content = document.querySelector('.content');
const listCards = content.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeCardButton = cardElement.querySelector('.card__like-button');

  likeCardButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  deleteCard(cardElement);

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(targetCard) {
  const deleteButton = targetCard.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', () => {
    targetCard.remove();
  });
}
// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  listCards.append(createCard(card, deleteCard));
});