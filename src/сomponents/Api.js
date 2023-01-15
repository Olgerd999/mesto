export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl; //ссылка https://mesto.nomoreparties.co/v1/cohort-56/
    this._headers = config.headers; //заголовок запроса
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Произошла ошибка");
  }

  getData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  getUserData() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  editProfile(infoData) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(infoData),
    }).then(this._handleResponse);
  }

  addNewCard(cardsData) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardsData),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleResponse);
  }
}
