import {adaptData} from './data/data-adapter';

const SERVER_URL = `https://es.dump.academy/guess-melody`;

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
}
