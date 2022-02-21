/* global EquationDisplay */
EquationDisplay.prototype.layout = function() {
  let currentX;

  currentX = 0;

  this.terms
    .slice()
    .reverse()
    .forEach((term) => {


      term
        .layout();

      term
        .move({
          "x":currentX,
          "y":0
        });

      currentX -= term
        .getWidth();

      currentX -= this.termPadding;

    });

  return this;
};
