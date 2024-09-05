import Popup from "./Popup.js";

export default class PopUpWithForm extends Popup {
  constructor(submitForm, selector, submitButton) {
    super(selector);
    this._submitForm = submitForm;
    this._submitButton = this._popupElement.querySelector(submitButton);
    this._buttonMessage = this._submitButton.textContent;
    this._isLoading = false;
  }

  _getInputValues() {
    const firstValue = document.querySelector(this._selector).children[0][1];

    const secondValue = document.querySelector(this._selector).children[0][2];

    const inputValues = [firstValue.value, secondValue.value];

    return inputValues;
  }

  setLoading() {
    this._isLoading = !this._isLoading;

    if (this._isLoading) {
      this._submitButton.textContent = "Salvando...";
    } else {
      this._submitButton.textContent = this._buttonMessage;
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", this._submitForm);

    super.setEventListeners();
  }

  close() {
    super.close();

    const firstValue = document.querySelector(this._selector).children[0][1];

    const secondValue = document.querySelector(this._selector).children[0][2];

    firstValue.value = this._getInputValues()[0];
    secondValue.value = this._getInputValues()[1];
  }
}
