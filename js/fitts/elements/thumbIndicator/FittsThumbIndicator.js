/* exported FittsThumbIndicator */
/* global fittsColors */
function FittsThumbIndicator(options) {
  let fill,
    radius,
    stroke,
    strokeWidth,
    thumbIndicator,
    where;

  thumbIndicator = this;

  init(options);

  return thumbIndicator;

  function init(options) {

    _required(options);
    _defaults(options);
    thumbIndicator.opacity = addOpacity();
    thumbIndicator.circle = addCircle();

  }

  function _defaults(options) {

    fill = options.fill ? options.fill : fittsColors().pointer;
    radius = options.radius ? options.radius : 20;
    stroke = options.stroke ? options.stroke : "black";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 1;

  }

  function _required(options) {

    where = options.where;

  }

  function addCircle() {
    let circle;

    circle = thumbIndicator.opacity
      .append("circle")
      .attr("r",radius)
      .attr("cx",0)
      .attr("cy",0)
      .attr("fill",fill)
      .attr("stroke",stroke)
      .attr("stroke-width",strokeWidth)
      .attr("opacity",1);

    return circle;
  }

  function addOpacity() {
    let group;

    group = where
      .append("g");

    return group;
  }


}
