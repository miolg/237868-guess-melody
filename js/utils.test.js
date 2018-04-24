import {getDeclinedNoun} from './utils.js';
import {assert} from 'chai';

const NounForm = {
  HUMAN: [`человек`, `человека`, `человек`],
  SECOND: [`секунда`, `секунды`, `секунд`]
};

describe(`Noun declensions`, () => {
  it(`should return correct form when number ends with 0-1`, () => {
    assert.equal(getDeclinedNoun(NounForm.HUMAN, 0), `человек`, `0 человек`);
    assert.equal(getDeclinedNoun(NounForm.SECOND, 0), `секунд`, `0 секунд`);
    assert.equal(getDeclinedNoun(NounForm.HUMAN, 20), `человек`, `20 человек`);
    assert.equal(getDeclinedNoun(NounForm.SECOND, 20), `секунд`, `20 секунд`);
    assert.equal(getDeclinedNoun(NounForm.HUMAN, 100), `человек`, `100 человек`);
    assert.equal(getDeclinedNoun(NounForm.SECOND, 100), `секунд`, `100 секунд`);

    assert.equal(getDeclinedNoun(NounForm.HUMAN, 1), `человек`, `1 человек`);
    assert.equal(getDeclinedNoun(NounForm.SECOND, 1), `секунда`, `1 секунда`);
    assert.equal(getDeclinedNoun(NounForm.HUMAN, 21), `человек`, `21 человек`);
    assert.equal(getDeclinedNoun(NounForm.SECOND, 21), `секунда`, `21 секунда`);
    assert.equal(getDeclinedNoun(NounForm.HUMAN, 101), `человек`, `100 человек`);
    assert.equal(getDeclinedNoun(NounForm.SECOND, 101), `секунда`, `100 секунда`);

  });

  it(`should return correct form when number ends with 5-9`, () => {
    for (let i = 5; i < 10; i++) {
      assert.equal(getDeclinedNoun(NounForm.HUMAN, i), `человек`, `${i} человек`);
      assert.equal(getDeclinedNoun(NounForm.SECOND, i), `секунд`, `${i} секунд`);
      assert.equal(getDeclinedNoun(NounForm.HUMAN, 10 + i), `человек`, `${10 + i} человек`);
      assert.equal(getDeclinedNoun(NounForm.SECOND, 10 + i), `секунд`, `${10 + i} секунд`);
      assert.equal(getDeclinedNoun(NounForm.HUMAN, 100 + i), `человек`, `${100 + i} человек`);
      assert.equal(getDeclinedNoun(NounForm.SECOND, 100 + i), `секунд`, `${100 + i} секунд`);
    }
  });

  it(`should return correct form when number ends with 10-19`, () => {
    for (let i = 10; i < 20; i++) {
      assert.equal(getDeclinedNoun(NounForm.HUMAN, i), `человек`, `${i} человек`);
      assert.equal(getDeclinedNoun(NounForm.SECOND, i), `секунд`, `${i} секунда`);
      assert.equal(getDeclinedNoun(NounForm.HUMAN, 100 + i), `человек`, `${100 + i} человек`);
      assert.equal(getDeclinedNoun(NounForm.SECOND, 100 + i), `секунд`, `${100 + i} секунд`);
    }
  });

  it(`should return correct form when number ends with 2-4`, () => {
    for (let i = 2; i < 5; i++) {
      assert.equal(getDeclinedNoun(NounForm.HUMAN, i), `человека`, `${i} человека`);
      assert.equal(getDeclinedNoun(NounForm.SECOND, i), `секунды`, `${i} секунды`);
      assert.equal(getDeclinedNoun(NounForm.HUMAN, 100 + i), `человека`, `${100 + i} человека`);
      assert.equal(getDeclinedNoun(NounForm.SECOND, 100 + i), `секунды`, `${100 + i} секунды`);
    }
  });
});
