/* global ExplorableNumberlineTitle */
ExplorableNumberlineTitle.prototype.show = function(duration = 375,delay = 0) {
  this.text
    .hide(duration,delay);

  return this;
};
