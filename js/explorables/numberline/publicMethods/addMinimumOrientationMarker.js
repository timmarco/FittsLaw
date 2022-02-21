/* global ExplorableNumberline */
/* global ExplorableNumberlineOrientationMarker */
ExplorableNumberline.prototype.addMinmumOrientationMarker = function(options) {
  const numberline = this;

  options.where = numberline.group;
  options.textAnchor = "start";
  options.coordinates = {
      "x":numberline.range[0],
      "y":numberline.orientationYPosition
  };

  numberline.minimumOrientationMarker = new ExplorableNumberlineOrientationMarker(options);

  return numberline;
};
