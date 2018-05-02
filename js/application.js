import GameModel from './data/game-model';
import {adaptData} from './data/data-adapter';
import WelcomeScreen from './screens/welcome-screen';
import GameScreen from './screens/game-screen';
import {showView} from './utils';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

let questions;

export default class Application {
  static start() {
    this.showWelcome();
    window.fetch(`https://es.dump.academy/guess-melody/questions`)
        .then(checkStatus)
        .then((response) => response.json())
        .then((data) => adaptData(data))
        .then((data) => Application.unlockGame(data))
        .catch(Application.showError);
  }

  static showWelcome() {
    const welcome = new WelcomeScreen();
    showView(welcome.element);
  }

  static showGame() {
    const game = new GameScreen(new GameModel(questions));
    showView(game.element);
    game.startGame();
  }

  static showResult(view) {
    view.onButtonClick = () => {
      this.showWelcome();
    };
    showView(view.element);
  }

  static unlockGame(data) {
    questions = data;
    document.querySelector(`.main-play`).removeAttribute(`disabled`);
  }
}
