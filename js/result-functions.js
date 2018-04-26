import {PointsRule} from './data/game-data';

export const calcFastPoints = (userAnswers, remainingTriesCount) => {
  let fastPoints = 0;

  if (userAnswers.length < 10 || remainingTriesCount === 0) {
    fastPoints = -1;
  } else {
    for (const answer of userAnswers) {
      if (answer.passed && answer.time < PointsRule.TIME_LIMIT) {
        fastPoints += PointsRule.FAST_SUCCESS;
      }
    }
  }

  return fastPoints;
};

export const calcUserPoints = (userAnswers, remainingTriesCount) => {
  let userPoints = 0;

  if (userAnswers.length < 10 || remainingTriesCount === 0) {
    userPoints = -1;
  } else {
    for (const answer of userAnswers) {
      if (answer.passed) {
        userPoints += answer.time < PointsRule.TIME_LIMIT ? PointsRule.FAST_SUCCESS : PointsRule.SUCCESS;
      } else {
        userPoints -= PointsRule.FAIL;
      }
    }
  }

  return userPoints;
};

export const getNewUsersResultsList = (usersResults, currentUserResult) => {
  const newUsersResults = usersResults.slice();
  newUsersResults.push(currentUserResult);
  return newUsersResults.sort((left, right) => {
    return right.points - left.points;
  });
};

const calcUserPercentage = (usersResults, currentUserResult) => {
  const userPlace = usersResults.indexOf(currentUserResult) + 1;
  const betterThanPercentage = (usersResults.length - userPlace) === 0 ? 0 : Math.round((usersResults.length - userPlace) / usersResults.length * 100);
  return {userPlace, betterThanPercentage};
};

export const printUserResults = (usersResults, currentUserResult) => {
  let result = ``;
  const newUsersResults = getNewUsersResultsList(usersResults, currentUserResult);

  if (currentUserResult.remainingTime === 0) {
    result = `Время вышло!<br>Вы не успели отгадать все мелодии`;
  } else if (currentUserResult.remainingTries === 0) {
    result = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
  } else {
    const {betterThanPercentage, userPlace} = calcUserPercentage(newUsersResults, currentUserResult);
    result = `Вы заняли ${userPlace} место из ${newUsersResults.length} игроков. Это лучше, чем у ${betterThanPercentage}% игроков`;
  }

  return result;
};
