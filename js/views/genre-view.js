import AbstractView from './abstract-view';
import getHeader from '../game/header';
import getPlayer from '../game/player';

export default class ArtistView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }

  get template() {
    return `
      <section class="main main--level main--level-genre">
        ${getHeader(this.state)}
        <div class="main-wrap">
          <h2 class="title"> ${this.question.question}</h2>
          <form class="genre">
            ${this.question.answers.map((answer, index) =>`<div class="genre-answer">
                ${getPlayer(answer, false)}
                <input type="checkbox" name="answer" value="${answer.genre}" id="a-${index}">
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
      button.disabled = true;
      this.onButtonClick(formAnswers.filter((item) => item.checked).map((item) => item.value));
      formAnswers.forEach((item) => {
        item.checked = false;
      });
    });
  }

  onButtonClick() {}
}
