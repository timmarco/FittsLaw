/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.transitionIn = function(duration) {
  const plotter = this;

  if(!plotter.hasTransitioned) {
    plotter.inputAxis
      .transitionIn(duration,0);

    plotter.outputAxis
      .transitionIn(duration,250);

    plotter.grid
      .transitionIn(duration * 2,375);

    plotter.hasTransitioned = true;

  }

  return plotter;
};
