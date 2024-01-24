function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.body.addEventListener('keydown', (esc) => {
    if (esc.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
      document.body.removeEventListener;
    }
  });
};

function closeModal(evt) {
  if (evt.target.classList.contains('popup__close') || 
      evt.target.classList.contains('popup_is-opened')) {
        evt.stopPropagation();
        evt.currentTarget.classList.remove('popup_is-opened');
   }
}; 
  
export {openModal, closeModal};