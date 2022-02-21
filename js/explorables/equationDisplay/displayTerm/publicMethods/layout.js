/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.layout = function() {

  let displayTerm = this;

  layoutAlign();

  return this;

  function layoutAlign() {
    let translateX,
      translateY;

    translateX = layoutAnchorHorizontal();
    translateY = layoutAnchorVertical();

    displayTerm.innerGroup
      .attr("transform","translate("+translateX+","+translateY+")");

    return displayTerm;
  }

  function layoutAnchorHorizontal() {
    let width;

    width = displayTerm.getWidth();

    switch(displayTerm.anchorHorizontal) {
      case "start":
        return width / 2;
      case "middle":
        return 0;
      case "end":
        return -width / 2;
    }

  }

  function layoutAnchorVertical() {
    let height;

    height = displayTerm.innerGroup
      .node()
      .getBBox()
      .height;

    switch(displayTerm.anchorVertical) {
      case "top":
        return -height / 2;
      case "middle":
        return 0;
      case "bottom":
        return height / 2;
    }
  }

};
