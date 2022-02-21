/* exported ExplorableNumberlineIndicator */
function ExplorableNumberlineIndicator(options) {
  let activeRadius,
    activeColor,
    activeStroke,
    activeStrokeWidth,
    color,
    coordinates,
    indicator,
    radius,
    stroke,
    strokeWidth,
    transitionDuration,
    where;

  indicator = this;

  init(options);

  return indicator;

  function init(options) {

    _required(options);
    _defaults(options);

    indicator.circle = addCircle();

  }

  function _defaults(options) {

    activeRadius = options.activeRadius ? options.activeRadius : 5;
    activeColor = options.activeColor ? options.activeColor : "black";
    activeStroke = options.activeStroke ? options.activeStroke : "black";
    activeStrokeWidth = options.activeStrokeWidth ? options.activeStrokeWidth : 0;
    color = options.color ? options.color : "black";
    radius = options.radius ? options.radius : 5;
    stroke = options.stroke ? options.stroke : "black";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 0;
    transitionDuration = options.transitionDuration ? options.transitionDuration : 500;

  }

  function _required(options) {

    coordinates = options.coordinates;
    where = options.where;

  }

  function addCircle() {
    let circle;

    circle = where
      .append("circle")
      .attr("cx",coordinates.x)
      .attr("cy",coordinates.y)
      .attr("fill",color)
      .attr("r",radius)
      .attr("stroke",stroke)
      .attr("strokeWidth",strokeWidth)
      .attr("cursor","pointer")
      .on('mouseover',mouseover);

    return circle;
  }

  function mouseover() {

    indicator.circle
      .transition()
      .duration(transitionDuration)
      .attr("r",activeRadius)
      .attr("fill",activeColor)
      .attr("stroke",activeStroke)
      .attr("stroke-width",activeStrokeWidth);

  }

}
