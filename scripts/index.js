// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const content = document.querySelector('.content');
const listCards = content.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard(Card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeCardButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  likeCardButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  cardElement.querySelector('.card__image').src = Card.link;
  cardElement.querySelector('.card__image').alt = Card.name;
  cardElement.querySelector('.card__title').textContent = Card.name;

  listCards.append(cardElement);

  deleteButton.addEventListener('click', () => { 
    deleteCard(cardElement)
  });
}
// @todo: Функция удаления карточки
function deleteCard(element) {
  element.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(addCard);