export default class UserInfo {
	constructor({nameSelector, job}){
		this._nameSelector = document.querySelector(nameSelector);
		this._job = document.querySelector(job);
	}
	getUserInfo(){ //получаем массив с текущим именем и хобби
		return {
			name: this._nameSelector.textContent,
			job: this._job.textContent
		}
	}
	setUserInfo(name, job){ //задаем имя и хобби
		this._nameSelector.textContent = name;
		this._job.textContent = job;
	}
}