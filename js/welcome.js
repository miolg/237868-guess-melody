import {showView} from './utils';
import WelcomeView from './views/welcome-view';
import {getQuestionView} from './data/game-logic';
import {initialState} from './data/game-data';

// Приветствие
export default () => {
  const viewElement = new WelcomeView();
  viewElement.onButtonClick = () => {
    showView(getQuestionView(initialState));
  };
  return viewElement.element;
};
