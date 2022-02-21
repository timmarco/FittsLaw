/* exported explorableLine */
//TODO: REFACTOR AS A CONSTRUCTOR
function explorableLine(options) {
  let line,
    publicObject,
    stroke,
    strokeDashArray,
    strokeWidth,
    where;

  publicObject = {
    attr:attr,
    hide:hide,
    move:move,
    show:show
  };

  init(options);

  return publicObject;

  /* INITIALIZE */
  function init(options) {

    where = options.where;

    stroke = options.stroke ? options.stroke : "black";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 1;
    strokeDashArray = options.strokeDashArray ? options.strokeDashArray : "1,0";

    line = addLine();


  }

  /* PUBLIC METHODS */
  function attr(key,value) {

    line
      .attr(key,value);

    return publicObject;
  }

  function move(coordinates) {

    line
      .attr("x1",coordinates.x1)
      .attr("x2",coordinates.x2)
      .attr("y1",coordinates.y1)
      .attr("y2",coordinates.y2);

    return publicObject;
  }

  function hide(duration) {

    line
      .transition()
      .duration(duration)
      .attr("opacity",0);

    return publicObject;
  }

  function show(duration) {

    line
      .transition()
      .duration(duration)
      .attr("opacity",1);

    return publicObject;
  }

  /* PRIVATE METHODS */
  function addLine() {
    let line;

    line = where
      .append("line")
      .attr("stroke",stroke)
      .attr("stroke-width",strokeWidth)
      .attr("stroke-dasharray",strokeDashArray)
      .attr("opacity",1);

    return line;
  }

}
