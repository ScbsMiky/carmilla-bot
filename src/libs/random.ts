export function randomInt(max = 1, min = 0) {
  return Math.floor(randomNumber(max, min));
};

export function randomNumber(max = 1, min = 0) {
  [max, min] = [Math.max(max, min), Math.min(max, min)];

  return Math.random( ) * (max - min) + min;
};