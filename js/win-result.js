import {showView} from './utils';
import welcome from './welcome';
import WinView from './views/win-view';

// Результат игры: выигрыш
export default (data) => {
  const view = new WinView(data);

  view.onButtonClick = () => {
    showView(welcome());
  };

  return view.element;
};
