/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.getWidth = function() {
  let width;

  width = this.group
    .node()
    .getBBox()
    .width;

  return width;
};
