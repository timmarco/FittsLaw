/* global CalculationStepLine */
CalculationStepLine.prototype.addConstantValue = function(options) {
  const line = this;
  const bar = line.bar;

  let rect;

  rect = line.columns.middle
    .append("rect")
    .attr("x",0)
    .attr("y",-bar.barHeight / 2)
    .attr("width",bar.scale(options.value))
    .attr("height",bar.barHeight)
    .attr("fill",options.color);

  return line;
};
