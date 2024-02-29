function showInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(`${errorClass}`);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.customError);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(`${inactiveButtonClass}`);
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove(`${inactiveButtonClass}`);
    submitButton.removeAttribute('disabled', false);
  }
}

function setEventListeners(formElement, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
  const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    })
  })
}

// todo: включение валидации всех полей форм
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(`${config.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config.inputSelector, config.inputErrorClass, config.submitButtonSelector, config.inactiveButtonClass, config.errorClass);
  });
}

// todo: очистка валидации полей форм
export function clearValidation(formElement, config) {
  const inputElement = formElement.querySelector(`${config.inputSelector}`);
  if (formElement.querySelector(`.${config.errorClass}`)) {
    hideInputError(formElement, inputElement, config.inputErrorClass, config.errorClass)
  }
}

