/* exported FunctionNumberLineRegion */
/* global d3 */
/* global exporableGroup */
function FunctionNumberLineRegion(options) {
  let color,
    parent,
    region,
    values;

  region = this;

  init(options);

  return region;

  function init(options) {
    _required(options);
    _defaults(options);

    region.coordinates = getCoordinates();
    region.lineGenerator = defineLineGenerator();
    region.group = addGroup();
    region.path = addPath();

  }

  /* PRIVATE */
  function _defaults(options) {

    color = options.color ? options.color : "white";

  }

  function _required(options) {

    parent = options.parent;
    values = options.values;

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":parent.layers.highlights
    });

    return group;
  }

  function addPath() {
    let path;

    path = region.group
      .append("path")
      .attr("d",region.lineGenerator(region.coordinates))
      .attr("fill",color);

    return path;
  }

  function getCoordinates() {
    let coordinates,
      firstCorners,
      secondCorners;

    //TODO: THIS IS GROSS AND NEEDS A BETTER SOLUTION!

    firstCorners = parent
      .lineCoordinatesForValue(values[0]);

    secondCorners = parent
      .lineCoordinatesForValue(values[1]);

    coordinates = [];
    coordinates[0] = {
      "x":firstCorners.x1,
      "y":firstCorners.y1
    };

    coordinates[1] = {
      "x":firstCorners.x2,
      "y":firstCorners.y2
    };

    coordinates[2] = {
      "x":secondCorners.x2,
      "y":secondCorners.y2
    };

    coordinates[3] = {
      "x":secondCorners.x1,
      "y":secondCorners.y1
    };

    return coordinates;
  }

  function defineLineGenerator() {
    let generator;

    generator = d3.line()
      .x((datum) => { return datum.x; })
      .y((datum) => { return datum.y ;});

    return generator;
  }


}
