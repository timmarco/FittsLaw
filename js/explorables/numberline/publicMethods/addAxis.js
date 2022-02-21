/* global ExplorableNumberline */
/* global ExplorableNumberlineAxis */
ExplorableNumberline.prototype.addAxis = function(options) {
  const numberline = this;

  options.where = numberline.group;
  options.scale = numberline.scale;

  numberline.axis = new ExplorableNumberlineAxis(options);

  return numberline;
};
