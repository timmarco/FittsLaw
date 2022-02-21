/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.addHighlightElement = function(element) {
  let plotter = this;

  plotter.highlightElements
    .push(element);

  return plotter;
};
