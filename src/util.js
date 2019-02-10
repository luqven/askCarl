const Util = {
  inherits: function inherits(childClass, parentClass) {
    // TO DO
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max  - min) + min);
  }
}

export default Util;