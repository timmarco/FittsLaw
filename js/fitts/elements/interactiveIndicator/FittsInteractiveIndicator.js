/* exported FittsInteractiveIndicator */
function FittsInteractiveIndicator(options) {
  let body,
    fittsIndicator,
    height,
    width,
    where;

  fittsIndicator = this;

  init(options);

  return fittsIndicator;

  function init(options) {
    _required(options);
    _defaults(options);

    fittsIndicator.foreignObject = addForeignObject();
    body = addBody();
    fittsIndicator.div = addContainerDiv();
  }

  function _defaults(options) {
    height = options.height ? options.height : 100;
    width = options.width ? options.width : 800;
  }

  function _required(options) {
    where = options.where;
  }

  function addForeignObject() {
    let foreignObject;

    foreignObject = where
      .append("foreignObject")
      .attr("width",width)
      .attr("height",height)
      .attr("x",0)
      .attr("y",0)
      .attr("opacity",0);

    return foreignObject;
  }

  function addBody() {
    let body;

    body = fittsIndicator.foreignObject
      .append("xhtml:body")
      .style("margin",0)
      .style("padding",0);

    return body;
  }

  function addContainerDiv() {
    let div;

    div = body
      .append("div")
      .classed("callout",true);

    return div;
  }

}
