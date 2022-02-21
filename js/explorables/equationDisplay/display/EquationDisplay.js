/* exported EquationDisplay */
/* global explorableGroup */

// TODO: REVIEW IF ANCHOR HORIZONTAL AND ANCHOR VERTICAL ARE ACTUALLY USED HERE
function EquationDisplay(options) {
  let anchorHorizontal,
    anchorVertical,
    coordinates,
    display,
    where;

  display = this;

  init(options);

  return display;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);
    display.group = addGroup();
    display.innerGroup = addInnerGroup();

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    anchorHorizontal = options.anchorHorizontal ? options.anchorHorizontal : "middle";
    anchorVertical = options.anchorVertical ? options.anchorVertical : "middle";
    coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    display.termPadding = options.termPadding ? options.termPadding : 3;

    display.terms = [];

  }

  function _required() {

    where = options.where;

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    })
    .attr("transform","translate("+coordinates.x+","+coordinates.y+")");

    return group;
  }

  function addInnerGroup() {
    let innerGroup;

    innerGroup = explorableGroup({
      "where":display.group
    });

    return innerGroup;
  }


}
