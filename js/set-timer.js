export const setTimer = (duration) => {
  if (!Number.isInteger(duration)) {
    throw new TypeError(`Passed argument is not a number`);
  }
  if (duration < 0) {
    throw new Error(`Passed number must not be a negative`);
  }

  return {
    time: duration,
    isExpired: false,
    tick() {
      if (this.time > 0) {
        this.time -= 1;
      } else {
        this.isExpired = true;
      }
    }
  };
};
