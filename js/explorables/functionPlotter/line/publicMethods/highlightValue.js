/* global FunctionPlotterLine */
FunctionPlotterLine.prototype.highlightValue = function(xValue) {

  const computedValue = this.functionToPlot(xValue);

  if(!isFinite(computedValue)) { return this; }
  if(isNaN(computedValue)) { return this; }
  if(xValue > this.scales.x.domain()[1]) { return this; }

  this.valueCircle
    .attr("cx",this.scales
      .x(xValue)
    )
    .attr("r",10)
    .attr("cy",this.scales.y(this.functionToPlot(xValue)));

  this.valueText
    .move({
      "x":this.scales.x(xValue),
      "y":this.scales.y(this.functionToPlot(xValue)) - 25})
    .update(this.functionToPlot(xValue).toFixed(2));

  return this;
};
