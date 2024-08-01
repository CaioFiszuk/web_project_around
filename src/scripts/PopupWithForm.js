import Popup from "./Popup.js";

export default class PopUpWithForm extends Popup {
  constructor(submitForm, selector) {
    super(selector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const firstValue = document.querySelector(this._selector).children[0][1];

    const secondValue = document.querySelector(this._selector).children[0][2];

    const inputValues = [firstValue.value, secondValue.value];

    return inputValues;
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
