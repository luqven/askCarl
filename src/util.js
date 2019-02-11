const Util = {
  inherits: function inherits(childClass, parentClass) {
    // TO DO
  },
  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max  - min) + min);
  },
  getRandomFraction: function (min, max) {
    return Math.random() * (max - min) + min;
  },
}

export default Util;