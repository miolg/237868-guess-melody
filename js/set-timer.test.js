import {setTimer} from './set-timer.js';
import {assert} from 'chai';

describe(`Set timer`, () => {
  it(`should return timer object with expected duration`, () => {
    assert.equal(setTimer(60).time, 60);
    assert.equal(setTimer(120).time, 120);
  });

  it(`should not return timer object with incorrect duration`, () => {
    assert.equal(setTimer(-10).time, null);
    assert.equal(setTimer(0).time, null);
  });

  it(`should decrease time when asked to do it`, () => {
    const timer = setTimer(10);
    timer.tick();
    assert.equal(timer.time, 9);
    timer.tick();
    assert.equal(timer.time, 8);
    while (typeof (timer.time) === `number`) {
      timer.tick();
    }
    assert.equal(timer.time, `Время вышло`);
  });
});
