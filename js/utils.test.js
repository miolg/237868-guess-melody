import {getDeclinedNoun} from './utils.js';
import {assert} from 'chai';

const NounForms = {
  HUMAN: [`человек`, `человека`, `человек`],
  SECOND: [`секунда`, `секунды`, `секунд`]
};

describe(`Noun declensions`, () => {
  it(`should return correct form when number ends with 0-1`, () => {
    assert.equal(getDeclinedNoun(NounForms.HUMAN, 0), `человек`, `0 человек`);
    assert.equal(getDeclinedNoun(NounForms.SECOND, 0), `секунд`, `0 секунд`);
    assert.equal(getDeclinedNoun(NounForms.HUMAN, 20), `человек`, `20 человек`);
    assert.equal(getDeclinedNoun(NounForms.SECOND, 20), `секунд`, `20 секунд`);
    assert.equal(getDeclinedNoun(NounForms.HUMAN, 100), `человек`, `100 человек`);
    assert.equal(getDeclinedNoun(NounForms.SECOND, 100), `секунд`, `100 секунд`);

    assert.equal(getDeclinedNoun(NounForms.HUMAN, 1), `человек`, `1 человек`);
    assert.equal(getDeclinedNoun(NounForms.SECOND, 1), `секунда`, `1 секунда`);
    assert.equal(getDeclinedNoun(NounForms.HUMAN, 21), `человек`, `21 человек`);
    assert.equal(getDeclinedNoun(NounForms.SECOND, 21), `секунда`, `21 секунда`);
    assert.equal(getDeclinedNoun(NounForms.HUMAN, 101), `человек`, `100 человек`);
    assert.equal(getDeclinedNoun(NounForms.SECOND, 101), `секунда`, `100 секунда`);

  });

  it(`should return correct form when number ends with 5-9`, () => {
    for (let i = 5; i < 10; i++) {
      assert.equal(getDeclinedNoun(NounForms.HUMAN, i), `человек`, `${i} человек`);
      assert.equal(getDeclinedNoun(NounForms.SECOND, i), `секунд`, `${i} секунд`);
      assert.equal(getDeclinedNoun(NounForms.HUMAN, 10 + i), `человек`, `${10 + i} человек`);
      assert.equal(getDeclinedNoun(NounForms.SECOND, 10 + i), `секунд`, `${10 + i} секунд`);
      assert.equal(getDeclinedNoun(NounForms.HUMAN, 100 + i), `человек`, `${100 + i} человек`);
      assert.equal(getDeclinedNoun(NounForms.SECOND, 100 + i), `секунд`, `${100 + i} секунд`);
    }
  });

  it(`should return correct form when number ends with 10-19`, () => {
    for (let i = 10; i < 20; i++) {
      assert.equal(getDeclinedNoun(NounForms.HUMAN, i), `человек`, `${i} человек`);
      assert.equal(getDeclinedNoun(NounForms.SECOND, i), `секунд`, `${i} секунда`);
      assert.equal(getDeclinedNoun(NounForms.HUMAN, 100 + i), `человек`, `${100 + i} человек`);
      assert.equal(getDeclinedNoun(NounForms.SECOND, 100 + i), `секунд`, `${100 + i} секунд`);
    }
  });

  it(`should return correct form when number ends with 2-4`, () => {
    for (let i = 2; i < 5; i++) {
      assert.equal(getDeclinedNoun(NounForms.HUMAN, i), `человека`, `${i} человека`);
      assert.equal(getDeclinedNoun(NounForms.SECOND, i), `секунды`, `${i} секунды`);
      assert.equal(getDeclinedNoun(NounForms.HUMAN, 100 + i), `человека`, `${100 + i} человека`);
      assert.equal(getDeclinedNoun(NounForms.SECOND, 100 + i), `секунды`, `${100 + i} секунды`);
    }
  });
});
