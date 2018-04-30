import {initialState, GAME} from './game-data';

const getQuestion = (state) => state.questions[state.currentQuestion];

export default class GameModel {
  constructor() {
    this.startGame();
  }

  get state() {
    return this._state;
  }

  startGame() {
    this._state = initialState;
  }

  getCurrentQuestion() {
    return getQuestion(this._state);
  }

  getCurrentRightAnswer() {
    return this.getCurrentQuestion().rightAnswer;
  }

  nextQuestion() {
    this._state.currentQuestion += 1;
  }

  isAlive() {
    return this._state.lives > 0;
  }

  isWon() {
    return this.isAlive() && this._state.currentQuestion === GAME.MAX_QUESTIONS;
  }

  updateState(newAnswer) {
    const userAnswers = this._state.userAnswers.slice();
    userAnswers.push(newAnswer);
    const lives = newAnswer.isRightAnswer ? this._state.lives : this._state.lives - 1;
    this._state = Object.assign({}, this._state, {userAnswers, lives});
  }
}
