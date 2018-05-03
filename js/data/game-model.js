import {initialState, GAME} from './game-data';

export default class GameModel {
  constructor(questions) {
    this.startGame(questions);
  }

  get state() {
    return this._state;
  }

  get isAlive() {
    return this._state.lives > 0 && this._state.time > 0;
  }

  get isWon() {
    return this.isAlive && this._state.currentQuestion === GAME.MAX_QUESTIONS;
  }

  startGame(questions) {
    this._state = Object.assign({}, initialState, {questions});
  }

  getQuestion() {
    return this._state.questions[this._state.currentQuestion - 1];
  }

  getCurrentQuestion() {
    return this.getQuestion();
  }

  setNextQuestion() {
    this._state.currentQuestion += 1;
    this._state.currentQuestionTime = this._state.time;
  }

  updateState(newAnswer) {
    this._state.userAnswers.push(newAnswer);
    this._state.lives = newAnswer.passed ? this._state.lives : this._state.lives - 1;
  }

  updateTime(time) {
    this._state.time = time;
  }
}
