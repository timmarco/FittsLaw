/* exported FunctionPlotterAxis */
/* global explorableGroup */
/* global d3 */
function FunctionPlotterAxis(options) {
  let axis,
    axisType,
    fontSize,
    fontWeight,
    position,
    tickCount,
    where;

  axis = this;

  init(options);

  return axis;

  function init(options) {
    _required(options);
    _defaults(options);

    position = definePosition();

    axis.group = addGroup();
    axis.axisDefinition = defineAxis();

    applyAxisToGroup();

  }

  function _defaults(options) {

    fontSize = options.fontSize ? options.fontSize : "14pt";
    fontWeight = options.fontWeight ? options.fontWeight : "normal";
    tickCount = options.tickCount ? options.tickCount : 1;

  }

  function _required(options) {


    axis.scales = options.scales;
    axisType = options.axisType;
    where = options.where;

  }


  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;

  }

  function applyAxisToGroup() {

    axis.group
      .call(axis.axisDefinition.ticks(tickCount))
      .attr("transform","translate("+position.x+","+position.y+")")
      .attr("font-size",fontSize)
      .attr("font-weight",fontWeight);

  }


  function defineAxis() {
    let axisDefinition;


    switch(axisType) {
      case "left":
        axisDefinition = d3.axisLeft(axis.scales.y);
        break;
      case "bottom":
        axisDefinition = d3.axisBottom(axis.scales.x);
        break;
    }

    return axisDefinition;
  }

  function definePosition() {
    let position;

    switch(axisType) {
      case "left":
        position = {
          "x":axis.scales.x(0),
          "y":0
        };
        break;
      case "bottom":
        position = {
          "x":0,
          "y":axis.scales.y(0)
        };
        break;
    }

    return position;
  }


}
