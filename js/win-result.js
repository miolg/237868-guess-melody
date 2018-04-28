import {showView} from './utils';
import welcome from './welcome';
import WinView from './views/win-view';

// Результат игры: выигрыш
export default (data) => {
  const viewElement = new WinView(data);

  viewElement.onButtonClick = () => {
    showView(welcome);
  };

  return viewElement.element;
};
