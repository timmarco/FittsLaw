/* global FunctionPlotter */
FunctionPlotter.prototype.transitionIn = function(duration) {
  if(!this.hasTransitioned) {
    if(this.grid) {
      this.grid
        .transitionIn(duration);
    }

    this.axes.x
      .transitionIn(duration);

    this.axes.y
      .transitionIn(duration);

    this.lines
      .forEach((line) => {
        line.transitionIn(duration);
      });

    this.hasTransitioned = true;
  }
};
