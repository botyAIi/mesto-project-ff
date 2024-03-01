function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.customError);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function disableButton(formElement, config) {
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.disabled = true;
}

function activeButton(formElement, config) {
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  submitButton.classList.remove(config.inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputList, formElement, config) {
  if (hasInvalidInput(inputList)) {
    disableButton(formElement, config);
  } else {
    activeButton(formElement, config);
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  toggleButtonState(inputList, formElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, formElement, config);
    });
  });
}

// todo: включение валидации всех полей форм
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// очистка валидации полей форм
export function clearValidation(formElement, config) {
  const inputElements = formElement.querySelectorAll(config.inputSelector);

  inputElements.forEach((inputElement) => {
    if (formElement.querySelector(`.${config.errorClass}`)) {
      hideInputError(formElement, inputElement, config);
    }
  });
  disableButton(formElement, config);
}
