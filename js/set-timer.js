export const setTimer = (duration) => {
  let timer = {};

  if (duration > 0) {
    timer = {
      time: duration,
      tick() {
        if (this.time > 1) {
          this.time -= 1;
        } else {
          this.time = `Время вышло`;
        }
      }
    };
  }
  return timer;
};
