/* global CalculationStepContainer */
CalculationStepContainer.prototype.layout = function() {
  let currentY,
    totalY;

  currentY = 25;
  totalY = 50;

  this.lines.forEach((line) => {
    line
      .group
      .attr("transform","translate(0,"+currentY+")");

    currentY += line.getHeight();
  });

  totalY = currentY;

  this.svg
    .attr("height",totalY);

  this.parent.tooltip
    .changeWidth(this.width);

  this.parent.tooltip
    .changeHeight(totalY + 30);
};
