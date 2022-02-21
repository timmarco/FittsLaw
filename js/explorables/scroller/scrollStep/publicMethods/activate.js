/* global ExplorableScrollStep */
/* global d3 */
ExplorableScrollStep.prototype.activate = function() {

  d3.selectAll(".step")
    .classed("active",false);

  d3.select("#" + this.triggerId)
    .classed("active",true);

  return this;
};
