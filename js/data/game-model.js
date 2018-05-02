import {initialState, GAME} from './game-data';

const getQuestion = (state) => state.questions[state.currentQuestion - 1];

export default class GameModel {
  constructor(questions) {
    this.startGame(questions);
  }

  get state() {
    return this._state;
  }

  startGame(questions) {
    this._state = Object.assign({}, initialState, {questions});
  }

  getCurrentQuestion() {
    return getQuestion(this._state);
  }

  setNextQuestion() {
    this._state.currentQuestion += 1;
    this._state.currentQuestionTime = this._state.time;
  }

  get isAlive() {
    return this._state.lives > 0 && this._state.time > 0;
  }

  get isWon() {
    return this.isAlive && this._state.currentQuestion === GAME.MAX_QUESTIONS;
  }

  updateState(newAnswer) {
    const userAnswers = this._state.userAnswers.slice();
    userAnswers.push(newAnswer);
    const lives = newAnswer.passed ? this._state.lives : this._state.lives - 1;
    this._state = Object.assign({}, this._state, {userAnswers, lives});
  }

  updateTime(time) {
    this._state = Object.assign({}, this._state, {time});
  }
}
