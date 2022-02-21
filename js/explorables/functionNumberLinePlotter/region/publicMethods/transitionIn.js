/* global FunctionNumberLineRegion */
FunctionNumberLineRegion.prototype.transitionIn = function(duration,delay,reverseDirection) {
  let initialCoordinates,
    initialPath,
    finalPath,
    region;

  region = this;

  if(!region.hasTransitioned) {

      finalPath = region.path
        .attr("d");

      if(!reverseDirection) {

        initialCoordinates = [];
        initialCoordinates[0] = region.coordinates[0];
        initialCoordinates[1] = region.coordinates[1];
        initialCoordinates[2] = region.coordinates[1];
        initialCoordinates[3] = region.coordinates[0];

      } else {

        initialCoordinates = [];
        initialCoordinates[0] = region.coordinates[3];
        initialCoordinates[1] = region.coordinates[2];
        initialCoordinates[2] = region.coordinates[2];
        initialCoordinates[3] = region.coordinates[3];

      }

      initialPath = region
        .lineGenerator(initialCoordinates);

      region.path
        .transition()
        .duration(0)
        .attr("d",initialPath)
        .transition()
        .delay(delay)
        .duration(duration)
        .attr("d",finalPath);

      region.hasTransitioned = true;
  }

  return region;
};
