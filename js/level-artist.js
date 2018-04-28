import {showNextScreen} from './data/game-logic';
import ArtistView from './views/artist-view';

// Игра на выбор исполнителя
export default (data) => {
  const viewElement = new ArtistView(data);

  viewElement.onChange = (newState) => {
    showNextScreen(newState);
  };

  return viewElement.element;
};
