/* exported ExplorableNumberlineAxis */
/* global d3 */
function ExplorableNumberlineAxis(options) {
  let axis,
    axisDefinition,
    axisType,
    color,
    coordinates,
    fontFamily,
    fontSize,
    fontWeight,
    scale,
    tickOffset,
    tickSize,
    where;

  axis = this;

  init(options);

  return axis;

  function init(options) {

    _required(options);
    _defaults(options);

    axisDefinition = defineAxis();
    axis.group = addGroup();

  }

  function _defaults(options) {

    axisType = options.axisType ? options.axisType : d3.axisBottom;
    color = options.color ? options.color : "black";
    coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    fontSize = options.fontSize ? options.fontSize : "14pt";
    fontWeight = options.fontWeight ? options.fontWeight : "normal";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    tickOffset = options.tickOffset ? options.tickOffset : 0;
    tickSize = options.tickSize ? options.tickSize : 5;

  }

  function _required(options) {
    scale = options.scale;
    where = options.where;
  }

  function addGroup() {
    let group;

    group = where.append("g")
      .call(axisDefinition)
      .attr("transform","translate("+coordinates.x+","+coordinates.y+")");

    group.selectAll("text")
      .attr("font-family",fontFamily)
      .attr("font-weight",fontWeight)
      .attr("font-size",fontSize)
      .attr("dy",tickOffset);

    return group;
  }

  function defineAxis() {
    let axisDefinition;

    axisDefinition = axisType()
      .scale(scale)
      .tickSize(tickSize);

    return axisDefinition;
  }

}
