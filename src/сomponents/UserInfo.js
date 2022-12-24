export default class UserInfo {
  constructor({ nameField, job }) {
    this._nameField = document.querySelector(nameField);
    this._job = document.querySelector(job);
  }
  getUserInfo() {
    //получаем массив с текущим именем и хобби
    return {
      name: this._nameField.textContent,
      job: this._job.textContent,
    };
  }
  setUserInfo(name, job) {
    //задаем имя и хобби
    this._nameField.textContent = name;
    this._job.textContent = job;
  }
}