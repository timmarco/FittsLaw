/* exported FunctionNumberLinePlotter */
/* global explorableGroup */
/* global d3 */
function FunctionNumberLinePlotter(options) {
  let domain,
    highlightColor,
    plotter,
    where;

  plotter = this;

  init(options);

  return plotter;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    plotter.scale = defineScale();
    plotter.group = addGroup();
    plotter.layers = addLayers();
    plotter.highlightElements = [];


  }



  /* PRIVATE METHODS */
  function _defaults() {

    //TODO: COORDINATES RIGHT NOW ARE FOR convenience. SHOULD BE (0,0) !
    plotter.coordinates = options.coordinates ? options.coordinates : {"x":150,"y":125};
    domain = options.domain ? options.domain : [-2,12];
    highlightColor = options.color ? options.color : "black";

    plotter.margins = options.margins ? options.margins : {"top":30,"bottom":30};

    plotter.width = options.width ? options.width : 500;
    plotter.height = options.height ? options.height : 200;

    plotter.inputY = plotter.margins.top;
    plotter.outputY = plotter.height - plotter.margins.bottom;


  }

  function _required(options) {

    where = options.where;

  }


  function addLayers() {
    let layers;

    layers = {};

    layers.axes = explorableGroup({
      "where":plotter.group
    });

    layers.data = explorableGroup({
      "where":plotter.group
    });

    layers.highlights = explorableGroup({
      "where":plotter.group
    });

    return layers;
  }


  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    })
    .attr("transform","translate("+plotter.coordinates.x+","+plotter.coordinates.y+")");

    return group;
  }


  function defineScale() {
    let scale;

    scale = d3.scaleLinear()
      .domain(domain)
      .range([0,plotter.width]);

    return scale;
  }


}
