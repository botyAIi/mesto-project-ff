// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//функция создания карточки
export function createCard(
  card,
  handleImageClick,
  currentUser,
  onLike,
  likeFunc,
  unlikeFunc,
  openDeleteConfirmationPopup
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeScore = cardElement.querySelector(".card__like-score");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  if (card.owner._id !== currentUser._id) {
    deleteButton.remove();
  }

  const isLiked = card.likes.find(
    (likeUser) => likeUser._id === currentUser._id
  );

  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;
  likeScore.textContent = card.likes.length;

  cardImg.addEventListener("click", () => handleImageClick(card));

  cardLikeButton.addEventListener("click", () =>
    onLike(likeFunc, unlikeFunc, card, cardLikeButton, likeScore)
  );

  deleteButton.addEventListener("click", () =>
    openDeleteConfirmationPopup(card, cardElement)
  );
  return cardElement;
}

//функция удаления карточки из DOM
export function deleteCardFromDOM(cardElement) {
  cardElement.remove();
}

export function onLike(likeFunc, unlikeFunc, card, cardLikeButton, likeScore) {
  if (!cardLikeButton.classList.contains("card__like-button_is-active")) {
    likeFunc(card._id)
      .then((card) => {
        cardLikeButton.classList.add("card__like-button_is-active");
        likeScore.textContent = card.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    unlikeFunc(card._id)
      .then((card) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        likeScore.textContent = card.likes.length;
      })
      .catch((err) => console.log(err));
  }
}
