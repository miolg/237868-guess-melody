export const adaptData = (data) => {
  for (const question of data) {
    const isArtistQuestion = question.type === `artist`;
    question.answers = question.answers.map((item) => {
      if (isArtistQuestion) {
        item.image = item.image.url;
      }
      item.artist = item.title;
      return item;
    });
    question.rightAnswer = isArtistQuestion ? Object.assign({}, question.answers.find((item) => item.isCorrect), {src: question.src}) : {genre: question.genre};
  }
  return data;
};
