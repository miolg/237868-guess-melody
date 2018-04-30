import GameModel from './data/game-model';
import WelcomeScreen from './screens/welcome-screen';
import GameScreen from './screens/game-screen';
import {showView} from './utils';

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    showView(welcome.element);
  }

  static showGame() {
    const model = new GameModel();
    const game = new GameScreen(model);
    showView(game.element);
    game.startGame();
  }
}
