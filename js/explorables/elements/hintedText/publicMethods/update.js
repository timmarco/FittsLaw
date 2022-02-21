/* global ExplorableHintedText */
ExplorableHintedText.prototype.update = function(string) {

  this.foreground
    .html(string);

  this.background
    .html(string);

    return this;
};
