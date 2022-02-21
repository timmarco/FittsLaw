/* exported FittsExampleTargets */
/* global explorableGroup */
/* global fittsExampleTargetData */
/* global fittsColors */
function FittsExampleTargets(options) {
  let targets,
    where;

  targets = this;

  init(options);

  return targets;

  function init(options) {

    _required(options);
    _defaults(options);

    targets.group = addGroup().attr("opacity",0);
    targets.targets = addTargets();
    targets.pulsing = false;
  }

  /* PRIVATE */
  function _required() {

    where = options.where;

  }

  function _defaults() {

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addTargets() {
    let targetData,
      targetRects;

    targetData = fittsExampleTargetData();

    targetRects = targets.group
      .selectAll("rect")
      .data(targetData)
      .enter()
      .append("rect")
      .attr("x",(datum) => { return datum.x; })
      .attr("y",(datum) => { return datum.y; })
      .attr("width",(datum) => { return datum.width; })
      .attr("height",(datum) => { return datum.height; })
      .attr("fill",fittsColors().target)
      .attr("opacity",0.5);

    return targetRects;

  }
}
