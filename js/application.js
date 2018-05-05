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
    welcome.lockButton();
    Loader.loadData()
        .then(Application.unlockGame)
        .then(welcome.unlockButton())
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

  static showResult(screen) {
    screen.onButtonClick = () => {
      Application.showWelcome();
    };

    if (screen.userResult.points > -1 && screen.userResult.remainingTime > 0) { // win
      Loader.saveResults(screen.userResult)
          .then(Loader.loadResults)
          .then((data) => screen.updateStatistics(data))
          .then(showView(screen.element))
          .catch(Application.showError);
    } else { // fail
      showView(screen.element);
    }
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    showView(errorView.element);
  }

  static unlockGame(data) {
    questions = data;
  }
}
