/* global FittsIntroInteractive */
/* global d3 */
/* global distanceFormula */
FittsIntroInteractive.prototype.run = function() {
  const introInteractive = this;

  let distanceToCenter,
    distanceToEdge,
    index,
    duration,
    selectedCircle,
    movement,
    endX,
    endY;

  if(introInteractive.isRunning) {

    index = Math.floor(d3.randomUniform(0,10)());
    selectedCircle = introInteractive.circles[index];
    duration = Math.floor(d3.randomUniform(750,3000)());

    introInteractive.circles.forEach((circle) => {

      circle
        .transition()
        .duration(125)
        .attr("opacity",function() {
          return d3.select(this).attr("data-base-opacity");
        });

    });

    endX = selectedCircle.attr("cx");
    endY = selectedCircle.attr("cy");


    distanceToCenter = distanceFormula(
      {
        "x":introInteractive.cursor.attr("cx"),
        "y":introInteractive.cursor.attr("cy")
      },
      {
        "x":selectedCircle.attr("cx"),
        "y":selectedCircle.attr("cy")
      }
    );
    distanceToEdge = distanceToCenter - selectedCircle.attr("r");


    selectedCircle
      .transition()
      .delay(125)
      .duration(250)
      .attr("opacity",1);


    let fittsValue = Math.log2(distanceToEdge / selectedCircle.attr("r") + 1);
    duration = 750 * fittsValue;

    movement = d3
      .transition()
      .duration(duration)
      .delay(375)
      .on('end',function() {
        introInteractive.run();
      });

    introInteractive.distanceLine
      .attr("x1",introInteractive.cursor.attr("cx"))
      .attr("y1",introInteractive.cursor.attr("cy"))
      .attr("x2",selectedCircle.attr("cx"))
      .attr("y2",selectedCircle.attr("cy"))
      .transition(movement)
      .attr("x1",endX)
      .attr("y1",endY);

    introInteractive.widthLine
      .attr("x1",selectedCircle.attr("cx"))
      .attr("y1",selectedCircle.attr("cy"))
      .attr("x2",introInteractive.cursor.attr("cx"))
      .attr("y2",introInteractive.cursor.attr("cy"))
      .attr("stroke-dasharray",selectedCircle.attr("r") +"," + distanceToEdge);

    introInteractive.cursor
      .transition(movement)
      .attr("cx",endX)
      .attr("cy",endY);

  }


};
