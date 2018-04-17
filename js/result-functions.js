const pointRules = {
  TIME_LIMIT: 20,
  FAIL: 2,
  SUCCESS: 1,
  FAST_SUCCESS: 2
};

export const calcUserPoints = (userAnswers, remainingTriesCount) => {
  let userPoints = 0;

  if (userAnswers.length < 10 || remainingTriesCount === 0) {
    userPoints = -1;
  } else {
    for (const answer of userAnswers) {
      if (answer.passed) {
        userPoints += answer.time < pointRules.TIME_LIMIT ? pointRules.FAST_SUCCESS : pointRules.SUCCESS;
      } else {
        userPoints -= pointRules.FAIL;
      }
    }
  }

  return userPoints;
};

const _pushUserResultsToList = (usersResults, currentUserResult) => {
  usersResults.push(currentUserResult);
  return usersResults.sort((left, right) => {
    return right.points - left.points;
  });
};

const _calcUsersPercentage = (usersResults, currentUserResult) => {
  const userPlace = usersResults.indexOf(currentUserResult) + 1;
  const betterThanPercentage = (usersResults.length - userPlace) === 0 ? 0 : Math.round((usersResults.length - userPlace) / usersResults.length * 100);
  return {userPlace, betterThanPercentage};
};

export const printUserResults = (usersResults, currentUserResult) => {
  let result = ``;
  const newUsersResults = _pushUserResultsToList(usersResults, currentUserResult);

  if (currentUserResult.remainingTime === 0) {
    result = `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (currentUserResult.remainingTries === 0) {
    result = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else {
    const {betterThanPercentage, userPlace} = _calcUsersPercentage(newUsersResults, currentUserResult);
    result = `Вы заняли ${userPlace} место из ${newUsersResults.length} игроков. Это лучше, чем у ${betterThanPercentage}% игроков`;
  }

  return result;
};
