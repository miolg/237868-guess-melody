import {calcUserPoints, printUserResults} from './result-functions.js';
import {assert} from 'chai';

const MAX_ERRORS_COUNT = 3;

const _calcRemainingTriesCount = (answers) => {
  const errorsCount = answers.filter((item) => !item.passed).length;
  const remainingTriesCount = errorsCount > MAX_ERRORS_COUNT ? 0 : MAX_ERRORS_COUNT - errorsCount;
  return remainingTriesCount;
};

describe(`User points calculation`, () => {
  it(`should return -1 when user didn't complete the game`, () => {
    assert.equal(calcUserPoints([{passed: false, time: 15}, {passed: true, time: 30}], 2), -1);
  });

  it(`should return 10 points when user slowly passed all the answers without any mistakes`, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      answers.push({passed: true, time: 30 + i});
    }
    assert.equal(calcUserPoints(answers, 3), 10);
  });

  it(`should return 20 points when user quickly passed all the answers without any mistakes`, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      answers.push({passed: true, time: 10 + i});
    }
    assert.equal(calcUserPoints(answers, 3), 20);
  });

  it(`should return -1 when user failed more answers than it is allowed`, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      answers.push({passed: i % 2 === 0, time: 10 + i});
    }
    assert.equal(calcUserPoints(answers, _calcRemainingTriesCount(answers)), -1);
  });

  it(`should return correct points when user passed all the answers but made some mistakes`, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      answers.push({passed: i !== 0, time: 10 + i});
    }

    assert.equal(calcUserPoints(answers, _calcRemainingTriesCount(answers)), 16, `1 error, quick answering`);

    answers[5].passed = false;
    assert.equal(calcUserPoints(answers, _calcRemainingTriesCount(answers)), 12, `2 errors, quick answering`);

    for (let i = 0; i < 10; i++) {
      answers[i].time = 30 + i;
    }
    answers[5].passed = true;
    assert.equal(calcUserPoints(answers, _calcRemainingTriesCount(answers)), 7, `1 error, slow answering`);

    answers[5].passed = false;
    assert.equal(calcUserPoints(answers, _calcRemainingTriesCount(answers)), 4, `2 errors, slow answering`);

    answers[9].passed = false;
    assert.equal(calcUserPoints(answers, _calcRemainingTriesCount(answers)), -1, `3 errors`);
  });
});

describe(`Printing user results`, () => {
  it(`should return fail when user didn't complete the game`, () => {
    assert.equal(printUserResults([], {points: 8, remainingTime: 0, remainingTries: 3}), `Время вышло! Вы не успели отгадать все мелодии`, `expired time`);
    assert.equal(printUserResults([], {points: 8, remainingTime: 10, remainingTries: 0}), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`, `expired tries`);
  });

  it(`should return results when user successfully completed the game`, () => {
    let results = [];
    assert.equal(printUserResults(results, {points: 80, remainingTime: 10, remainingTries: 3}), `Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков`);
    assert.equal(printUserResults(results, {points: 90, remainingTime: 10, remainingTries: 3}), `Вы заняли 1 место из 2 игроков. Это лучше, чем у 50% игроков`);
    assert.equal(printUserResults(results, {points: 50, remainingTime: 10, remainingTries: 3}), `Вы заняли 3 место из 3 игроков. Это лучше, чем у 0% игроков`);
    assert.equal(printUserResults(results, {points: 60, remainingTime: 10, remainingTries: 3}), `Вы заняли 3 место из 4 игроков. Это лучше, чем у 25% игроков`);
    assert.equal(printUserResults(results, {points: 85, remainingTime: 10, remainingTries: 3}), `Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`);
    assert.equal(printUserResults(results, {points: 95, remainingTime: 10, remainingTries: 3}), `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`);
  });
});

describe(`Timer`, () => {

})
