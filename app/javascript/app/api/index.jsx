const COMMON_URL = 'api/v1/';
const SEARCH = 'search';
const DOWNLOAD = 'download';

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

export function searchEmojis(order, keyword = null) {
  const data = { order };
  if (keyword != null) data.keyword = keyword;

  const path = `${COMMON_URL}${SEARCH}`;

  return get(path, data);
}

export function downloadEmojisLink(emojis) {
  const params = new URLSearchParams();
  emojis.forEach(emoji => params.append('emojis[]', emoji.id));
  return `${COMMON_URL}${DOWNLOAD}?${params.toString()}`;
}
