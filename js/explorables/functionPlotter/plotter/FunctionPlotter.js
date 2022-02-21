/* exported FunctionPlotter */
/* global explorableGroup */
/* global FunctionPlotterGrid */
/* global FunctionPlotterLine */
/* global FunctionPlotterAxis */
/* global d3 */
// TODO: THIS NEEDS TO BE FURTHER BROKEN DOWN. UNMANAGABLY LARGE
function FunctionPlotter(options) {
  let axisTickCounts,
    functions,
    gridBoolean,
    group,
    hasTransitioned,
    plotArea,
    plotter,
    range,
    width,
    where,
    x,
    y;

  plotter = this;

  init(options);

  return plotter;

  /* INITIALIZE */
  function init(options) {
    let curtain;

    _required(options);
    _defaults(options);


    curtain = addCurtain();
    plotter.scales = defineScales();
    plotter.axisTitles = {};
    group = addGroup();
    plotArea = addPlotArea();
    plotter.layers = addLayers();
    plotter.grid = addGrid();
    plotter.axes = addAxes();
    plotter.lines = addLines(functions);
    plotter.hotspot = addHotspot();

    plotter.hasTransitioned = false;

    // valueCircle = false;


  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    axisTickCounts = options.axisTicks ? options.axisTicks : {"x":1,"y":1};
    functions = options.functions ? options.functions : [];
    plotter.height = options.height ? options.height : 400;
    plotter.width = options.width ? options.width : 800;
    plotter.domain = options.domain ? options.domain : [0,10];
    plotter.range = options.range ? options.range : [0,10];
    plotter.margins = options.margins ? options.margins : defaultMargins();
    //TODO: THIS IS SLOPPY. GRID SHOULD BE CLEARER
    gridBoolean = options.hideGrid ? false : true;
    x = options.x ? options.x : 0;
    y = options.y ? options.y : 0;
    plotter.coordinates = options.coordinates ? options.coordinates : {"x":x,"y":y};
    plotter.fontFamily  = options.fontFamily ? options.fontFamily : "";

  }

  function _required(options) {

    hasTransitioned = false;
    where = options.where;

  }


  /* PRIVATE METHODS */
  function addAxes() {
    let axes;

    axes = {};

    axes.x = addXAxis();
    axes.y = addYAxis();

    return axes;
  }

  function addCurtain() {
    let clipPath,
      rect;

    clipPath = where
      .select("defs")
      .append("clipPath")
      .attr("id","plotterClipPath");

    rect = clipPath
      .append("rect")
      .attr("x",-1)
      .attr("y",-1)
      .attr("width",width - plotter.margins.left - plotter.margins.right + 1)
      .attr("height",plotter.height - plotter.margins.top - plotter.margins.bottom + 1);

    return clipPath;
  }

  function addGroup() {
    let group;

    group = explorableGroup({"where":options.where})
      .attr("transform","translate("+plotter.coordinates.x+","+plotter.coordinates.y+")");

    return group;
  }

  function addGrid() {
    let grid;

    if(gridBoolean) {
      grid = new FunctionPlotterGrid({
        "axisTickCounts":axisTickCounts,
        "domain":plotter.domain,
        "range":range,
        "scales":plotter.scales,
        "where":plotter.layers.grid,
        "tickEvery":1
      });
    }

    return grid;
  }

  function addHotspot() {
    let hotspot;

    hotspot = group
      .append("rect")
      .attr("x",plotter.margins.left)
      .attr("y",plotter.margins.top)
      .attr("width",plotter.width - plotter.margins.left - plotter.margins.right)
      .attr("height",plotter.height - plotter.margins.top - plotter.margins.bottom)
      .attr("fill","rgba(0,0,0,0)");

    return hotspot;
  }

  function addPlotArea() {
    let plotGroup;

    plotGroup = explorableGroup({
      "where":group
    })
    .attr("transform","translate("+plotter.margins.left+","+plotter.margins.top+")");

  return plotGroup;
  }

  function addLayers() {
    let layers;

    layers = {};
    layers.plot = explorableGroup({"where":group})
      .attr("transform","translate("+plotter.margins.left+","+plotter.margins.top+")");

    layers.grid = explorableGroup({"where":layers.plot})
      .attr("clip-path","url(#plotterClipPath)");

    layers.axes = explorableGroup({"where":layers.plot});
    layers.lines = explorableGroup({"where":layers.plot});


    layers.indicators = explorableGroup({"where":group});
    layers.tooltip = explorableGroup({"where":group});

    return layers;
  }


  function addLines(functions) {
    let lines;

    if(functions.length == 0) {
      lines = [];

      return lines;
    }

    functions.forEach((aFunction) => {
      let line = new FunctionPlotterLine({
          "function":aFunction,
          "where":plotter.layers.lines,
          "domain":plotter.domain,
          "scales":plotter.scales,
      });

      lines.push(line);
    });

    return lines;
  }

  function addXAxis() {
    let axis;

    axis = new FunctionPlotterAxis({
      "axisType":"bottom",
      "scales":plotter.scales,
      "tickCount":axisTickCounts.x,
      "where":plotter.layers.axes
    });

    return axis;
  }

  function addYAxis() {
    let axis;

    axis = new FunctionPlotterAxis({
      "axisType":"left",
      "scales":plotter.scales,
      "tickCount":axisTickCounts.y,
      "where":plotter.layers.axes
    });

    return axis;
  }

  function defaultMargins() {
    return {
      "left":100,
      "right":10,
      "top":30,
      "bottom":50
    };
  }

  function defineScale(inputDomain,outputRange) {
    let scale;

    scale = d3.scaleLinear()
      .domain(inputDomain)
      .range(outputRange);

    return scale;
  }

  function defineScales() {
    let scales;

    scales = {};
    scales.x = defineScale(plotter.domain,[0,plotter.width - plotter.margins.right - plotter.margins.left]);
    scales.y = defineScale(plotter.range,[plotter.height - plotter.margins.bottom - plotter.margins.top,0]);

    return scales;
  }


}
