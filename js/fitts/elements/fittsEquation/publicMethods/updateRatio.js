/* global FittsEquation */
FittsEquation.prototype.updateRatio = function(ratioValue) {
  const equation = this;
  let ratioBBox;

  ratioBBox = this.ratio.group
    .node()
    .getBBox();


  this.ratioCurtain
    .attr("x",equation.ratio.coordinates.x - ratioBBox.width)
    .attr("y",ratioBBox.y)
    .attr("width",ratioBBox.width)
    .attr("height",ratioBBox.height)
    .attr("fill","white")
    .attr("opacity",1);

  equation.ratioText
    .embiggen(1.5)
    .move({
      "x":equation.ratio.coordinates.x - ratioBBox.width / 2,
      "y":ratioBBox.y + ratioBBox.height / 2
    })
    .update(ratioValue);

  return this;
};
