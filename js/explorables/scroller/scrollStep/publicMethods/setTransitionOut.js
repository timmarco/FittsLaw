/* global ExplorableScrollStep */
ExplorableScrollStep.prototype.setTransitionOut = function(callback) {

  this.transitionOut = callback;

  return this;
};
