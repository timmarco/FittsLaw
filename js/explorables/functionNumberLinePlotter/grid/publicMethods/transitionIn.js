/* global FunctionNumberLineGrid */
FunctionNumberLineGrid.prototype.transitionIn = function(duration,delay) {
  let grid = this;

  grid.gridLines
    .attr("x1",(datum) => { return grid
      .scale(datum);
    })
    .attr("x2",(datum) => { return grid
        .scale(datum);
    })
    .attr("y1",grid.inputY)
    .attr("y2",grid.inputY)
    .transition()
    .delay((datum,index) => { return delay + 10 * index; })
    .duration(duration)
    .attr("x2",(datum) => { return grid
        .scale(
          grid
            .functionToPlot(datum)
          );
        })
    .attr("y2",grid.outputY);

  return grid;

};
