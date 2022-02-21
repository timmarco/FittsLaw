/* global FunctionNumberLineAxis */
FunctionNumberLineAxis.prototype.killTransition = function( ) {
  let axis = this;

  killDomainTransition();
  killTickTransition();

  return axis;

  function killDomainTransition() {
    let length,
    path;

    path = axis.group
      .select(".domain");

    length = path
      .node()
      .getTotalLength();

    path
      .transition()
      .duration(0)
      .attr("stroke-dasharray",length + "," + length);

  }

  function killTickTransition(duration) {
    let ticks,
      tickStep;

    ticks = axis.group
      .selectAll(".tick");

    tickStep = duration / ticks.size();

    ticks
      .transition()
      .duration(0)
      .attr("opacity",1);

  }

};
