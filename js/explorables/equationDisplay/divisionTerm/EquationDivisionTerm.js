/* exported EquationDivisionTerm */
/* global explorableGroup */
function EquationDivisionTerm(options) {
  let term,
    where;

  term = this;

  init(options);

  return term;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    term.group = addGroup();
    term.innerGroup = addInnerGroup();
    term.viniculum = addViniculum();


  }

  /* PRIVATE METHODS */

  function _defaults(options) {

    term.coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    term.anchorHorizontal = options.anchorHorizontal ? options.anchorHorizontal : "middle";
    term.anchorVertical = options.anchorVertical ? options.anchorVertical : "middle";

  }

  function _required(options) {

    where = options.where;

  }


  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    })
    .attr("transform","translate("+term.coordinates.x+","+term.coordinates.y+")");

    return group;
  }

  function addInnerGroup() {
    let innerGroup;

    innerGroup = explorableGroup({
      "where":term.group
    });

    return innerGroup;
  }

  function addViniculum() {
    let line;

    line = term.innerGroup
      .append("line")
      .attr("x1",0)
      .attr("x2",0)
      .attr("y1",0)
      .attr("y2",0)
      .attr("stroke","black")
      .attr("stroke-width",2);

    return line;
  }



}
