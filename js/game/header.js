import {getMinuteAndSeconds} from '../utils';
import {GAME} from '../data/game-data';

export default (state) => {
  const {minutes, seconds} = getMinuteAndSeconds(state.time);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${minutes}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${seconds}</span>
      </div>
    </svg>
    <div class="main-mistakes">
      ${new Array(GAME.MAX_LIVES - state.lives)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
    </div>`;
};
