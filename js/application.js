import GameModel from './data/game-model';
import WelcomeScreen from './screens/welcome-screen';
import GameScreen from './screens/game-screen';
import ErrorView from './views/error-view';
import {showView} from './utils';
import Loader from './loader';

let questions;

export default class Application {
  static start() {
    const welcome = Application.showWelcome();
    welcome.view.lockButton();
    Loader.loadData()
        .then(welcome.view.unlockButton())
        .catch(Application.showError);
  }

  static showWelcome() {
    const welcome = new WelcomeScreen();
    showView(welcome.element);
    return welcome;
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

  static showError(error) {
    const errorView = new ErrorView(error);
    showView(errorView.element);
  }
}
