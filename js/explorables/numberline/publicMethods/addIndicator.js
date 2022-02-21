/* global ExplorableNumberline */
/* global ExplorableNumberlineIndicator */
ExplorableNumberline.prototype.addIndicator = function(options) {
  const numberline = this;

  let indicator;

  options.where = numberline.group;
  options.scale = numberline.scale;
  options.coordinates = {
    "x":numberline.scale(options.value),
    "y":200
  };

  indicator = new ExplorableNumberlineIndicator(options);
  numberline.indicators.push(indicator);

  return numberline;
};
