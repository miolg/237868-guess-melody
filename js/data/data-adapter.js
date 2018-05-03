const convertAnswers = (isArtistQuestion, answers) => {
  return answers.map((item) => {
    if (isArtistQuestion) {
      item.image = item.image.url;
    }
    item.artist = item.title;
    return item;
  });
};

export const adaptData = (data) => {
  for (const question of data) {
    const isArtistQuestion = question.type === `artist`;
    question.answers = convertAnswers(isArtistQuestion, question.answers);
    question.rightAnswer = isArtistQuestion ? Object.assign({}, question.answers.find((item) => item.isCorrect), {src: question.src}) : {genre: question.genre};
  }
  return data;
};
