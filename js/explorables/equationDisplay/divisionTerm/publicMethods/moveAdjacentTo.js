/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.moveAdjacentTo = function(adjacentObject,padding) {

  let newXPosition;

  newXPosition = adjacentObject
    .maxXExtent() + padding;

  this
    .moveX(newXPosition);

  return this;
};
