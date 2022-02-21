/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.clearHighlights = function() {
  const plotter = this;

  plotter.highlightElements.forEach((element) => {
    element
      .hide();
  });

  return plotter;
};
