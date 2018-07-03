const COMMON_URL = 'api/v1/';
const SEARCH = 'search';
const DOWNLOAD = 'download';
const SIGNIN = 'users/sign_in';
const SIGNUP = 'users';

const csrfToken = document.querySelector('meta[name=csrf-token]').content;

function get(path, data = null) {
  const params = new URLSearchParams(data);
  const uri = `${path}?${params.toString()}`;

  return fetch(uri).then(response => response.json());
}

function post(path, data) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken,
  };
  const body = JSON.stringify(data);
  const params = {
    method: 'POST',
    credentials: 'same-origin',
    headers,
    body,
  };

  return fetch(path, { ...params }).then(response => response.json());
}

export function searchEmojis(order, keyword, page = 0) {
  const data = { page };
  if (order != null) data.order = order;
  if (keyword != null) data.keyword = keyword;

  const path = `${COMMON_URL}${SEARCH}`;

  return get(path, data);
}

export function downloadEmojisLink(emojis) {
  const params = new URLSearchParams();
  emojis.forEach(emoji => params.append('emojis[]', emoji.id));
  return `${COMMON_URL}${DOWNLOAD}?${params.toString()}`;
}

export function signIn(email, password) {
  const path = `${COMMON_URL}${SIGNIN}`;
  const data = {
    user: { email, password },
  };
  return post(path, data);
}

export function signUp(name, email, password, passwordConfirm) {
  const path = `${COMMON_URL}${SIGNUP}`;
  const data = {
    user: {
      name,
      email,
      password,
      password_confirmation: passwordConfirm,
    },
  };
  return post(path, data);
}
