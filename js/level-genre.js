import {showNextScreen} from './data/game-logic';
import GenreView from './views/genre-view';

// Игра на выбор жанра
export default (data) => {
  const viewElement = new GenreView(data);

  viewElement.onButtonClick = (newState) => {
    showNextScreen(newState);
  };

  return viewElement.element;
};
