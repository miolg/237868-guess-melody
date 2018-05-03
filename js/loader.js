import {adaptData} from './data/data-adapter';

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = `01011001`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (response) => response.json();

export default class Loader {
  static loadData() {
    return window.fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON).then(adaptData);
  }

  static loadResults() {
    return window.fetch(`${SERVER_URL}/stats/${APP_ID}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-type': `application/json`
      },
      method: `POST`
    };
    return window.fetch(`${SERVER_URL}/stats/${APP_ID}`, requestSettings).then(checkStatus);
  }
}
