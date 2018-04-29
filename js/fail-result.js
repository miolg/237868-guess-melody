import {showView} from './utils';
import welcome from './welcome';
import FailView from './views/fail-view';

// Результат игры - проигрыш: время вышло или закончились попытки
export default (data) => {
  const view = new FailView(data);

  view.onButtonClick = () => {
    showView(welcome());
  };

  return view.element;
};
