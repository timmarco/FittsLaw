/* global FunctionPlotter */
/* global ExplorableHintedText */
FunctionPlotter.prototype.xAxisTitle = function(axisTitleOptions) {
  const plotter = this;

  plotter.axisTitles.x = new ExplorableHintedText({
    "where":plotter.layers.axes,
    "string":axisTitleOptions.string,
    "textAnchor":"middle",
    "fontSize":axisTitleOptions.fontSize,
    "fontWeight":"normal",
    "fontFamily":plotter.fontFamily,
    "alignmentBaseline":"text-before-edge",
    "backgroundColor":axisTitleOptions.backgroundColor,
    "coordinates":{
      "x":plotter.scales.x((plotter.domain[1] - plotter.domain[0]) / 2),
      "y":plotter.height - plotter.margins.bottom
    }
  });

  return plotter;
};
