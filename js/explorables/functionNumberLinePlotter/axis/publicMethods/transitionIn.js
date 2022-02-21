/* global FunctionNumberLineAxis */
/* global d3 */
FunctionNumberLineAxis.prototype.transitionIn = function(duration,delay) {
  let axis = this;

  domainTransitionIn(duration,delay);
  tickTransitionIn(duration,delay);

  return axis;

    function domainTransitionIn(duration,delay) {
      let length,
        path;

      path = axis.group
        .select(".domain");

      length = path
        .node()
        .getTotalLength();

      path
        .attr("stroke-dasharray","0," + length)
        .transition()
        .duration(duration)
        .delay(delay)
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

    function tickTransitionIn(duration,delay) {
      let ticks,
        tickStep;

      ticks = axis.group
        .selectAll(".tick");

      tickStep = duration / ticks.size();


      ticks
        .attr("opacity",0)
        .transition()
        .delay((datum,index) => { return delay + (index) * tickStep; })
        .duration(tickStep)
        .attr("opacity",1);

  }

};
