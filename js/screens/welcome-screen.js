import WelcomeView from '../views/welcome-view';
import Application from '../application';

export default class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
    this.view.onButtonClick = () => {
      Application.showGame();
    };
  }

  get element() {
    return this.view.element;
  }
}
