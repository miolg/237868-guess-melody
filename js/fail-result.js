import {showView} from './utils';
import welcome from './welcome';
import FailView from './views/fail-view';

// Результат игры - проигрыш: время вышло или закончились попытки
export default (data) => {
  const viewElement = new FailView(data);

  viewElement.onButtonClick = () => {
    showView(welcome);
  };

  return viewElement.element;
};
