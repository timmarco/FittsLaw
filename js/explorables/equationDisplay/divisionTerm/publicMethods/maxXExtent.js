/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.maxXExtent = function() {
  let bounding;

  bounding = this.group.node()
    .getBBox();

  return this.coordinates.x + bounding.x + bounding.width;
};
