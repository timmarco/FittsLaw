/* exported FittsTarget */
/* global explorableGroup */
/* global fittsColors */

function FittsTarget(options) {
  let colors,
    group,
    target,
    where;

  target = this;

  init(options);

  return target;

  /* INITIALIZE */
  function init(options) {
    _required(options);
    _defaults(options);

    group = addGroup();
    target.indicator = addTargetIndicator();


    target.move(target.coordinates);
    target.resize(target.dimensions);

  }

  function _defaults(options) {

    target.coordinates = options.coordinates ? options.coordinates : {"x":125,"y":125};
    target.dimensions = options.dimensions ? options.dimensions : {"width":120,"height":50};

  }

  function _required(options) {

    colors = options.colors;
    where = options.where;

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addTargetIndicator() {
    let targetIndicator;

    targetIndicator = group
      .append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("fill","none")
      .attr("fill",fittsColors().target)
      .attr("opacity",0.75);

    return targetIndicator;
  }

}
