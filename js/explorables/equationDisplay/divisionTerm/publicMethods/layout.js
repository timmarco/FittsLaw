/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.layout = function() {
  let bbox,
    term = this;


  bbox = term.innerGroup
    .node()
    .getBBox();


  layoutAlign();

  term.viniculum
    .attr("x1",bbox.x)
    .attr("x2",bbox.x + bbox.width)
    .attr("y1",0)
    .attr("y2",0);


  return term;

  function layoutAlign() {
    let translateX,
      translateY;

    translateX = layoutAnchorHorizontal();
    translateY = layoutAnchorVertical();

    term.innerGroup
      .attr("transform","translate("+translateX+","+translateY+")");

  }

  function layoutAnchorHorizontal() {
    let width;

    width = term.group
      .node()
      .getBBox()
      .width;


    switch(term.anchorHorizontal) {
      case "start":
        return 0;
      case "middle":
        return 0;
      case "end":
        return -width / 2;
    }
  }

  function layoutAnchorVertical() {
    let height;

    height = term.innerGroup
      .node()
      .getBBox()
      .height;

    switch(term.anchorVertical) {
      case "top":
        return -height / 2;
      case "middle":
        return 0;
      case "bottom":
        return height / 2;
    }
  }



};
