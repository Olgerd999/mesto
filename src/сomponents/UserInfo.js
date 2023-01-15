export default class UserInfo {
  constructor(nameField, job, avatarSelector) {
    this._nameField = document.querySelector(nameField);
    this._job = document.querySelector(job);
    this._avatarSelector = document.querySelector(avatarSelector);
  }
  renderUserInfo(data) {
    this._nameField.textContent = data.name;
    this._job.textContent = data.about;
    this._avatarSelector.src = data.avatar;
  }

  getUserInfo() {
    //получаем массив с текущим именем и хобби
    return {
      firstname: this._nameField.textContent,
      profession: this._job.textContent,
    };
  }
  // setUserInfo(name, job) {
  setUserInfo(data) {
    //задаем имя и хобби
    this._nameField.textContent = data.name;
    this._job.textContent = data.about;
    this._avatarSelector.src = data.avatar;
  }
}