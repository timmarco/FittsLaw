/* exported ExplorableTooltip */
function ExplorableTooltip(options) {
  let bodyStyles,
    tooltip,
    where;

  tooltip = this;

  init(options);

  return tooltip;

  /* INITIALIZE */
  function init(options) {
    //TODO: FOLLOW THIS _defaults convention everywhere!
    _required(options);
    _defaults(options);

    tooltip.foreignObject = addForeignObject();
    tooltip.body = addBody();
    tooltip.divContainer = addDivContainer();

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    bodyStyles = options.bodyStyles ? options.bodyStyles : {};
    bodyStyles.backgroundColor = bodyStyles.backgroundColor ? bodyStyles.backgroundColor : "white";
    bodyStyles.border = bodyStyles.border ? bodyStyles.border : "1px solid black";
    bodyStyles.padding = bodyStyles.padding ? bodyStyles.padding : "0.25em";
    tooltip.width = options.width ? options.width : 300;
    //TODO: ACTUALLY EXPLICITLY STATE THIS IN CONSTRUCTOR
    tooltip.bounds = options.bound ? options.bounds : {"minX":0,"minY":140,"maxX":800,"maxY":800};

  }

  function _required() {
    where = options.where;
  }


  /* PRIVATE METHODS */
  function addBody() {
    let body;

    body = tooltip.foreignObject
      .append("xhtml:body")
      .style("padding",bodyStyles.padding)
      .style("background-color","rgba(0,0,0,0)");

    return body;
  }

  function addDivContainer() {
    let container;

    container = tooltip.body
      .append("div")
      .style("background-color",bodyStyles.backgroundColor)
      .style("border-radius","5px")
      .style("box-shadow","2px 2px 5px rgba(0,0,0,0.25)")
      .style("border",bodyStyles.border);



    return container;
  }

  function addForeignObject() {
    let foreignObject;

    foreignObject = where
      .append("foreignObject")
      .attr("display","none")
      .attr("height",tooltip.height)
      .attr("width",tooltip.width);

    return foreignObject;
  }

}
