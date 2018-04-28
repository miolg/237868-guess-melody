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
      <section class="main main--level main--level-genre">
        ${getHeader(this.state)}
        <div class="main-wrap">
          <h2 class="title">Выберите ${this.question.rightAnswer.genre} треки</h2>
          <form class="genre">
            ${this.question.answers.map((answer, index) =>`<div class="genre-answer">
                ${getPlayer(answer, false)}
                <input type="checkbox" name="answer" value=${answer.genre}" id="a-${index}">
                <label class="genre-answer-check" for="a-${index}"></label>
              </div>`).join(``)}
            <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
        </div>
      </section>`;
  }

  bind() {
    const formElement = this.element.querySelector(`.genre`);
    const formAnswers = Array.from(formElement.answer);
    const button = this.element.querySelector(`.genre-answer-send`);
    const audios = formElement.querySelectorAll(`audio`);
    button.disabled = true;

    formElement.addEventListener(`change`, () => {
      button.disabled = !formAnswers.some((item) => item.checked);
    });

    formElement.addEventListener(`click`, (event) => {
      const target = event.target;
      if (target.className.includes(`player-control`)) {
        const currentAudio = target.parentNode.querySelector(`audio`);
        const isAlreadyPlaying = !currentAudio.paused;
        audios.forEach((item) => item.pause());
        if (isAlreadyPlaying) {
          currentAudio.pause();
        } else {
          currentAudio.play();
        }
      }
    });

    button.addEventListener(`click`, () => {
      let isRightAnswer = true;
      formAnswers.forEach((item) => {
        if (item.value !== this.question.rightAnswer.genre) {
          isRightAnswer = false;
        }
        item.checked = false;
      });
      button.disabled = true;
      const userAnswers = this.state.userAnswers.slice();
      userAnswers.push({passed: isRightAnswer, time: 15});
      const lives = isRightAnswer ? this.state.lives : this.state.lives - 1;
      const newState = Object.assign({}, this.state, {currentQuestion: this.state.currentQuestion + 1, userAnswers, lives});
      this.onButtonClick(newState);
    });
  }

  onButtonClick() {}
}
