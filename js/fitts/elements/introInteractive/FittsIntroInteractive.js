/* exported FittsIntroInteractive */
/* global d3 */
/* global fittsColors */
/* global Math */

function FittsIntroInteractive(options) {
  let introInteractive,
    where;

  introInteractive = this;

  init(options);

  return introInteractive;

  function init(options) {

    _required(options);

    introInteractive.isRunning = false;
    introInteractive.circles = addCircles();
    introInteractive.distanceLine = addDistanceLine();
    introInteractive.widthLine = addWidthLine();
    introInteractive.cursor = addCursor();

  }

  function _required(options) {
    where = options.where;
  }

  function addCircles() {
    let circles;

    circles = [];

    d3.range(0,10).forEach(() => {
      let baseOpacity,
        baseRadius,
        circle;

      baseRadius = d3.randomUniform(30,100)();
      baseOpacity = d3.randomUniform(0,0.5)();

      circle = where
        .append("circle")
        .attr("cx",d3.randomUniform(0,800))
        .attr("cy",d3.randomUniform(0,400))
        .attr("r",baseRadius)
        .attr("opacity",baseOpacity)
        .attr("fill",fittsColors().target)
        .attr("stroke","black")
        .attr("stroke-width",2)
        .attr("data-base-radius",baseRadius)
        .attr("data-base-opacity",baseOpacity);

      circles.push(circle);
    });


    return circles;
  }

  function addCursor() {
    let cursor;

    cursor = where.append("circle")
      .attr("cx",Math.floor(d3.randomUniform(50,750)()))
      .attr("cy",Math.floor(d3.randomUniform(25,375)()))
      .attr("r",10)
      .attr("fill",fittsColors().pointer);

    return cursor;
  }


  function addDistanceLine() {
    let line;

    line = where
      .append("line")
      .attr("stroke",fittsColors().distance)
      .attr("stroke-width",5)
      .attr("x1",0)
      .attr("x2",0)
      .attr("y1",40)
      .attr("y2",500);

    return line;
  }

  function addWidthLine() {
    let line;

    line = where
      .append("line")
      .attr("stroke",fittsColors().width)
      .attr("stroke-width",5);

    return line;
  }

}
