/* global ExplorableNumberlineTitle */
ExplorableNumberlineTitle.prototype.transitionIn = function(duration = 500,delay = 0) {

  this.text
    .show(duration,delay);

  return this;
};
