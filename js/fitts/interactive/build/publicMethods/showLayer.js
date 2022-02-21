/* global FittsInteractive */
FittsInteractive.prototype.showLayer = function(whichLayer) {

  Object.keys(this.layers).forEach((key) => {
    if(key == whichLayer) {
      this.layers[key]
        .transition()
        .duration(250)
        .attr("opacity",1);
    } else {
      if(key != "tooltip" && key != "hotspot") {
        this.layers[key]
          .transition()
          .duration(125)
          .attr("opacity",0);
      }
    }
  });

  return this;
};
