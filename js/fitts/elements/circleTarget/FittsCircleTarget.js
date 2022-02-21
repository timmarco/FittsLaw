/* exported FittsCircleTarget */
/* global explorableGroup */
/* global fittsColors */
function FittsCircleTarget(options) {
  const target = this;
  let coordinates,
    radius,
    where;

  init(options);

  return target;

  function init(options) {
    _required(options);

    target.group = addGroup();
    target.circle = addCircle();
  }

  function _required(options) {
    radius = options.radius;
    coordinates = options.coordinates;
    where = options.where;
  }

  function addCircle() {
    let circle;

    circle = target.group
      .append("circle")
      .attr("r",radius)
      .attr("cx",coordinates.x)
      .attr("cy",coordinates.y)
      .attr("fill",fittsColors().target)
      .attr("opacity",1);

    return circle;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }



}
