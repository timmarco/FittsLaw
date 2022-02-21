/* global ExplorableNumberline */
/* global ExplorableNumberlineOrientationMarker */
ExplorableNumberline.prototype.addMaximumOrientationMarker = function(options) {
  const numberline = this;

  options.where = numberline.group;
  options.textAnchor = "end";
  options.coordinates = {
      "x":numberline.range[1],
      "y":numberline.orientationYPosition
  };

  numberline.minimumOrientationMarker = new ExplorableNumberlineOrientationMarker(options);

  return numberline;
};
