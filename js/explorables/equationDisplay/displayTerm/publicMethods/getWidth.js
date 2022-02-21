/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.getWidth = function() {
  let bbox,
    width;

  bbox = this.innerGroup
    .node()
    .getBBox();

  width = bbox.width;

  return width;
};
