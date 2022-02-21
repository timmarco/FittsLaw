/* global ExplorableNumberline */
/* global ExplorableNumberlineTitle */
ExplorableNumberline.prototype.addTitle = function(options) {
  const numberline = this;

  options.where = numberline.group;

  numberline.title = new ExplorableNumberlineTitle(options);

  return numberline;
};
