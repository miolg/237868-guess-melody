import {getDeclinedNoun} from './decline-noun.js';
import {assert} from 'chai';

describe(`Noun declensions`, () => {
  it(`should return correct form when number ends with 0`, () => {
    assert.equal(getDeclinedNoun(`секунда`, 0), `секунд`, `0`);
    assert.equal(getDeclinedNoun(`секунда`, 10), `секунд`, `10`);
    assert.equal(getDeclinedNoun(`секунда`, 20), `секунд`, `20`);
    assert.equal(getDeclinedNoun(`секунда`, 100), `секунд`, `100`);
  });

  it(`should return correct form when number ends with 1`, () => {
    assert.equal(getDeclinedNoun(`секунда`, 1), `секунда`, `1`);
    assert.equal(getDeclinedNoun(`секунда`, 11), `секунд`, `11`);
    assert.equal(getDeclinedNoun(`секунда`, 21), `секунда`, `21`);
    assert.equal(getDeclinedNoun(`секунда`, 101), `секунда`, `101`);
  });

  it(`should return correct form when number ends with 2`, () => {
    assert.equal(getDeclinedNoun(`секунда`, 2), `секунды`, `2`);
    assert.equal(getDeclinedNoun(`секунда`, 12), `секунд`, `12`);
    assert.equal(getDeclinedNoun(`секунда`, 22), `секунды`, `22`);
    assert.equal(getDeclinedNoun(`секунда`, 102), `секунды`, `102`);
  });

  it(`should return correct form when number ends with 3`, () => {
    assert.equal(getDeclinedNoun(`секунда`, 3), `секунды`, `3`);
    assert.equal(getDeclinedNoun(`секунда`, 13), `секунд`, `13`);
    assert.equal(getDeclinedNoun(`секунда`, 23), `секунды`, `23`);
    assert.equal(getDeclinedNoun(`секунда`, 103), `секунды`, `102`);
  });

  it(`should return correct form when number ends with 4`, () => {
    assert.equal(getDeclinedNoun(`секунда`, 4), `секунды`, `4`);
    assert.equal(getDeclinedNoun(`секунда`, 14), `секунд`, `14`);
    assert.equal(getDeclinedNoun(`секунда`, 24), `секунды`, `24`);
    assert.equal(getDeclinedNoun(`секунда`, 104), `секунды`, `104`);
  });

  it(`should return correct form when number ends with 5`, () => {
    assert.equal(getDeclinedNoun(`секунда`, 5), `секунд`, `5`);
    assert.equal(getDeclinedNoun(`секунда`, 15), `секунд`, `15`);
    assert.equal(getDeclinedNoun(`секунда`, 25), `секунд`, `25`);
    assert.equal(getDeclinedNoun(`секунда`, 105), `секунд`, `105`);
  });

  it(`should return correct form when number ends with 6`, () => {
    assert.equal(getDeclinedNoun(`секунда`, 6), `секунд`, `6`);
    assert.equal(getDeclinedNoun(`секунда`, 16), `секунд`, `16`);
    assert.equal(getDeclinedNoun(`секунда`, 26), `секунд`, `26`);
    assert.equal(getDeclinedNoun(`секунда`, 106), `секунд`, `106`);
  });

  it(`should return correct form when number ends with 7`, () => {
    assert.equal(getDeclinedNoun(`секунда`, 7), `секунд`, `7`);
    assert.equal(getDeclinedNoun(`секунда`, 17), `секунд`, `17`);
    assert.equal(getDeclinedNoun(`секунда`, 27), `секунд`, `27`);
    assert.equal(getDeclinedNoun(`секунда`, 107), `секунд`, `107`);
  });

  it(`should return correct form when number ends with 8`, () => {
    assert.equal(getDeclinedNoun(`секунда`, 8), `секунд`, `8`);
    assert.equal(getDeclinedNoun(`секунда`, 18), `секунд`, `18`);
    assert.equal(getDeclinedNoun(`секунда`, 28), `секунд`, `28`);
    assert.equal(getDeclinedNoun(`секунда`, 108), `секунд`, `108`);
  });

  it(`should return correct form when number ends with 9`, () => {
    assert.equal(getDeclinedNoun(`секунда`, 9), `секунд`, `9`);
    assert.equal(getDeclinedNoun(`секунда`, 19), `секунд`, `19`);
    assert.equal(getDeclinedNoun(`секунда`, 29), `секунд`, `29`);
    assert.equal(getDeclinedNoun(`секунда`, 109), `секунд`, `109`);
  });
});
