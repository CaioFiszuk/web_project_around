export default class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    const user = document.getElementsByClassName(this._userName).value;
    const job = document.getElementsByClassName(this._userJob).value;
    return { user, job };
  }

  setUserInfo(userName, userJob) {
    this._userName.textContent = userName;
    this._userJob.textContent = userJob;
  }
}
