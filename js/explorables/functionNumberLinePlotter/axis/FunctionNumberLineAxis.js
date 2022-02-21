/* exported FunctionNumberLineAxis */
/* global explorableGroup */
/* global d3 */
function FunctionNumberLineAxis(options) {
  let axis,
    axisDefinition,
    axisLocation,
    axisType,
    coordinates,
    parent,
    tickCount;

  axis = this;

  init(options);

  return axis;

  /* INITIALIZER */
  function init(options) {

    _required(options);
    _defaults(options);

    axis.group = addGroup();
    axisDefinition = defineAxis();

    applyAxisToGroup();
  }


  /* PRIVATE METHODS */
  function _required(options) {

    parent = options.parent;
    axisLocation = options.axisLocation;
    axisType = switchAxisType();
    coordinates = switchAxisCoordinates();

  }

  function _defaults(options) {

    tickCount = options.tickCount ? options.tickCount : 1;

  }


  function addGroup() {
    let group;

    group = explorableGroup({
      "where":parent.layers.axes
    });

    return group;
  }

  function applyAxisToGroup() {

    axis.group
      .call(axisDefinition)
      .attr("transform","translate("+coordinates.x+","+coordinates.y+")")
      .attr("font-size","14pt");

  }

  function defineAxis() {
    let axisDefinition;


    axisDefinition = axisType(parent.scale)
      .ticks(tickCount);

    return axisDefinition;
  }

  function switchAxisCoordinates() {
    switch(axisLocation) {
      case "top":
        return {
          "x":parent.scale.range()[0],
          "y":parent.inputY
        };
      case "bottom":
        return {
          "x":parent.scale.range()[0],
          "y":parent.outputY
        };
    }
  }

  function switchAxisType() {
    switch(axisLocation) {
      case "top":
        return d3.axisTop;
      case "bottom":
        return d3.axisBottom;
    }
  }




}
