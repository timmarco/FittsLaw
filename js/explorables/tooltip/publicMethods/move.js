/* global ExplorableTooltip */
ExplorableTooltip.prototype.move = function(coordinates) {
  let edges,
    objectSize,
    tooltipCoordinates;

  try {
    objectSize = this.foreignObject
      .node()
      .getBBox();
  } catch (e) {
    objectSize = {
      "height":0,
      "width":0,
      "x":0,
      "y":0
    };
  }

  tooltipCoordinates = {};
  edges = {};


  tooltipCoordinates.x = coordinates.x - (objectSize.width / 2);
  tooltipCoordinates.y = coordinates.y;
  edges.right = tooltipCoordinates.x + (objectSize.width);
  edges.left = tooltipCoordinates.x;
  edges.top = tooltipCoordinates.y;
  edges.bottom = tooltipCoordinates.y + objectSize.height;
  if(edges.left < this.bounds.minX) {
    tooltipCoordinates.x = this.bounds.minX;
  }

  if(edges.right > this.bounds.maxX) {
    tooltipCoordinates.x = this.bounds.maxX - objectSize.width;
  }

  if(edges.top < this.bounds.minY) {
    tooltipCoordinates.y = this.bounds.minY;
  }

  if(edges.bottom > this.bounds.maxY) {
    tooltipCoordinates.y = this.bounds.maxY - objectSize.height;
  }


  // tooltipCoordinates.x = tooltipCoordinates.x < this.bounds.minX ? this.bounds.minX : tooltipCoordinates.x;
  this.foreignObject
    .attr("x",tooltipCoordinates.x)
    .attr("y",tooltipCoordinates.y);

  return this;
};
