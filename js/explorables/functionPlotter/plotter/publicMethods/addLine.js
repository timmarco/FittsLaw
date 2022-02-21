/* global FunctionPlotter */
/* global FunctionPlotterLine */
FunctionPlotter.prototype.addLine = function(lineOptions) {
  const plotter = this;
  let line;

  line = new FunctionPlotterLine({
      "function":lineOptions.function,
      "where":plotter.layers.lines,
      "domain":plotter.domain,
      "scales":plotter.scales,
      "stroke":lineOptions.stroke,
      "strokeWidth":lineOptions.strokeWidth,
      "strokeDasharray":lineOptions.strokeDasharray,
      "circleRadius":lineOptions.circleRadius,
      "textColor":lineOptions.textColor
  });

  plotter.lines
    .push(line);

  return plotter;
};
