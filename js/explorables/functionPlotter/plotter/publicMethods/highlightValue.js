/* global FunctionPlotter */
FunctionPlotter.prototype.highlightValue = function(value) {

  this.lines
    .forEach((line) => {
      line
        .highlightValue(value);
    });

  return this;
};
