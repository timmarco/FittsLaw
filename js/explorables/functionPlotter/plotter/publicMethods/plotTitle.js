/* global FunctionPlotter */
/* global ExplorableHintedText */

FunctionPlotter.prototype.plotTitle = function(axisTitleOptions) {

  const plotter = this;

  plotter.axisTitles.plot = new ExplorableHintedText({
    "where":plotter.layers.axes,
    "string":axisTitleOptions.string,
    "textAnchor":"middle",
    "fontSize":"22pt",
    "fontWeight":"bold",
    "fontFamily":plotter.fontFamily,
    "alignmentBaseline":"text-after-edge",
    "backgroundColor":axisTitleOptions.backgroundColor,
    "coordinates":{
      "x":plotter.scales.x((plotter.domain[1] - plotter.domain[0]) / 2),
      "y":0
    }
  });

  return plotter;
};
