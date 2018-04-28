import AbstractView from './abstract-view';
import {getQuestion} from '../data/game-logic';
import getHeader from '../game/header';
import getPlayer from '../game/player';

export default class ArtistView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.question = getQuestion(state);
  }

  get template() {
    return `
      <section class="main main--level main--level-artist">
        ${getHeader(this.state)}
        <div class="main-wrap">
          <h2 class="title main-title">Кто исполняет эту песню?</h2>
          ${getPlayer(this.question.rightAnswer, true)}
          <form class="main-list">
            ${this.question.answers.map((answer, index) => `
              <div class="main-answer-wrapper">
                <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${answer.artist}"/>
                <label class="main-answer" for="answer-${index}">
                  <img class="main-answer-preview" src=${answer.image}
                       alt=${answer.artist} width="134" height="134">
                  ${answer.artist}
                </label>
              </div>`).join(``)}
          </form>
        </div>
      </section>`;
  }

  bind() {
    const formElement = this.element.querySelector(`.main-list`);
    formElement.addEventListener(`change`, (event) => {
      this.onChange(event);
      event.target.checked = false;
    });

    const playButton = this.element.querySelector(`.player-control`);
    playButton.addEventListener(`click`, () => {
      const audio = this.element.querySelector(`audio`);
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  }

  onChange() {}
}
