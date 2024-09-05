export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userName = this._nameElement.textContent;
    const userAbout = this._aboutElement.textContent;

    return { userName, userAbout };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  getAvatar() {
    const userAvatar = this._avatarElement.src;

    return userAvatar;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
