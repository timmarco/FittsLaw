/* global ExplorableHintedText */
ExplorableHintedText.prototype.makeBold = function() {

  this.foreground
    .attr("font-weight","bold");

  this.background
    .attr("font-weight","bold");

  return this;
};
