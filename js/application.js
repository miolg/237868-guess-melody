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
    const game = new GameScreen(new GameModel());
    showView(game.element);
    game.startGame();
  }
}
