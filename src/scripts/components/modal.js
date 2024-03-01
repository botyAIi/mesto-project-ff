function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

// обработчик закрытия popup'ов
function handleClosePopupByClick(evt) {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

export { openModal, closeModal, handleClosePopupByClick };
