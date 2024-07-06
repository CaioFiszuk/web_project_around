export default class FormValidator {
    constructor(config, form) {
      this._input = config.input;
      this._submitButton = config.submitButton;
      this._inactiveButton = config.inactiveButton;
      this._inputError = config.inputError;
      this._errorClass = config.errorClass;
      this._form = form;
    }
  
    _showInputError(formElement, input, errorMessage) {
      const errorElement = formElement.querySelector(`.${input.id}-error`);
  
      input.classList.add("popup__container-input_type-error");
  
      errorElement.textContent = errorMessage;
      errorElement.classList.add("popup__container-error_active");
    }
  
    _hideInputError(formElement, input) {
      const errorElement = formElement.querySelector(`.${input.id}-error`);
      input.classList.remove("popup__container-input_type-error");
      errorElement.classList.remove("popup__container-error_active");
      errorElement.textContent = "";
    }
  
    _checkInputValidity(formElement, input) {
      if (!input.validity.valid) {
        this._showInputError(formElement, input, input.validationMessage);
      } else {
        this._hideInputError(formElement, input);
      }
    }
  
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }
  
    _buttonState(inputList, button) {
      if (this._hasInvalidInput(inputList)) {
        button.disabled = true;
        button.classList.add("popup__container-button_inactive");
      } else {
        button.disabled = false;
        button.classList.remove("popup__container-button_inactive");
      }
    }
  
    _setEventListeners(formElement) {
      const inputList = Array.from(
        formElement.querySelectorAll(".popup__container-input")
      );
  
      const button = formElement.querySelector(".popup__container-button");
  
      this._buttonState(inputList, button);
  
      inputList.forEach((input) => {
        input.addEventListener("input", () => {
          this._checkInputValidity(formElement, input);
          this._buttonState(inputList, button);
        });
      });
    }
  
    enableValidation() {
      const form = this._form;
  
      this._setEventListeners(form);
    }
  }
  