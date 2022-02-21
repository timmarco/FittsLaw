/* global FunctionPlotterAxis */
/* global d3 */
FunctionPlotterAxis.prototype.transitionIn = function(duration) {

  const axis = this;

  domainTransitionIn(duration);
  tickTransitionIn(duration);

  return axis;

  function domainTransitionIn(duration) {
    let length,
      path;

    path = axis.group
      .select(".domain");

    length = path
      .node()
      .getTotalLength();

    path
      .transition()
      .duration(duration)
      .attrTween("stroke-dasharray",tweenDash);

    function tweenDash() {
      let interpolator,
        length;

      length = path
        .node()
        .getTotalLength();

      interpolator = d3
        .interpolateString("0," + length, length + "," + length);

      return(timeStep) => {
        return interpolator(timeStep);
      };
    }
  }

  function tickTransitionIn(duration) {
    let ticks,
      tickStep;

    ticks = axis.group
      .selectAll(".tick");

    tickStep = duration / ticks.size();


    ticks
      .attr("opacity",0)
      .transition()
      .delay((datum,index) => { return (index - 1) * tickStep; })
      .duration(tickStep)
      .attr("opacity",1);


  }
};
