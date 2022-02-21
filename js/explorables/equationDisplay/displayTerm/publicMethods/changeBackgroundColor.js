/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.changeBackgroundColor = function(newColor,duration = 0, delay = 0) {

  this.text
    .changeBackgroundColor(newColor,duration,delay);

  return this;
};
