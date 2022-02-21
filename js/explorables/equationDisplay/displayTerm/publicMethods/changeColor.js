/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.changeColor = function(newColor,duration = 0, delay = 0) {

  this.text
    .changeForegroundColor(newColor,duration,delay);

  return this;
};
