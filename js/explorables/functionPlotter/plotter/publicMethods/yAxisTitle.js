/* global FunctionPlotter */
/* global ExplorableHintedText */
FunctionPlotter.prototype.yAxisTitle = function(axisTitleOptions) {
  const plotter = this;

  plotter.axisTitles.y = new ExplorableHintedText({
    "where":plotter.layers.axes,
    "string":axisTitleOptions.string,
    "textAnchor":"end",
    "fontSize":axisTitleOptions.fontSize,
    "fontWeight":"normal",
    "alignment-baseline":"middle",
    "fontFamily":plotter.fontFamily,
    "backgroundColor":axisTitleOptions.backgroundColor,
    "coordinates":{
      "x":-20,
      "y":plotter.scales.y((plotter.range[1] - plotter.range[0]) / 2)
    }
  });

  return plotter;
};
