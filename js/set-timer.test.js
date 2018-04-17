import {setTimer} from './set-timer.js';
import {assert} from 'chai';

describe(`Set timer`, () => {
  it(`should return timer object with expected duration`, () => {
    assert.equal(setTimer(60).time, 60);
    assert.equal(setTimer(120).time, 120);
  });

  it(`should not return timer object with incorrect duration`, () => {
    assert.throws(() => setTimer(`i10`), `Passed argument is not a number`);
    assert.throws(() => setTimer(``), `Passed argument is not a number`);
    assert.throws(() => setTimer(), `Passed argument is not a number`);
    assert.throws(() => setTimer(null), `Passed argument is not a number`);
    assert.throws(() => setTimer([]), `Passed argument is not a number`);
    assert.throws(() => setTimer({}), `Passed argument is not a number`);
    assert.throws(() => setTimer(-1), `Passed number must not be a negative`);
  });

  it(`should decrease time when asked to do it`, () => {
    const timer = setTimer(10);
    timer.tick();
    assert.equal(timer.time, 9);
    assert.equal(timer.isExpired, false);
    timer.tick();
    assert.equal(timer.time, 8);
    assert.equal(timer.isExpired, false);
    while (!timer.isExpired) {
      timer.tick();
    }
    assert.equal(timer.isExpired, true);
  });
});
