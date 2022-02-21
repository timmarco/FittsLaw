/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.moveX = function(newValue) {

  this.coordinates.x = xPosition;

  this.move();

  return this;
};
