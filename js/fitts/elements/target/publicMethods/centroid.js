/* global FittsTarget */
FittsTarget.prototype.centroid = function() {
  return {
    "x":this.coordinates.x + this.dimensions.width / 2,
    "y":this.coordinates.y + this.dimensions.height / 2
  };
};
