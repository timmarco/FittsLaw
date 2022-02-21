/* exported lineRectangleIntersection */
/* global lineAsEquation */
/* global lineLineIntersectionCoordinates */
function lineRectangleIntersection(lineEquation,rectangle) {
  let coordinates,
    dimensions,
    edgesAsEquations,
    edgesAsLines,
    intersections,
    intersectionsToReturn,
    vertices;

  coordinates = {
    "x":+rectangle.attr("x"),
    "y":+rectangle.attr("y")
  };

  dimensions = {
    "height":+rectangle.attr("height"),
    "width":+rectangle.attr("width")
  };

  vertices = [
    {"x":coordinates.x,"y":coordinates.y},
    {"x":coordinates.x + dimensions.width,"y":coordinates.y},
    {"x":coordinates.x + dimensions.width,"y":coordinates.y + dimensions.height},
    {"x":coordinates.x,"y":coordinates.y + dimensions.height}
  ];

  edgesAsLines = [
    {"x1":vertices[0].x,"y1":vertices[0].y,"x2":vertices[1].x,"y2":vertices[1].y},
    {"x1":vertices[1].x,"y1":vertices[1].y,"x2":vertices[2].x,"y2":vertices[2].y},
    {"x1":vertices[2].x,"y1":vertices[2].y,"x2":vertices[3].x,"y2":vertices[3].y},
    {"x1":vertices[3].x,"y1":vertices[3].y,"x2":vertices[0].x,"y2":vertices[0].y}
  ];

  edgesAsEquations = [];

  edgesAsLines.forEach((edge) => {
    edgesAsEquations.push(lineAsEquation(edge));
  });

  intersections = [];
  edgesAsEquations.forEach((equation) => {
    intersections.push(lineLineIntersectionCoordinates(equation,lineEquation));
  });

  intersectionsToReturn = [];
  intersections.forEach((intersection) =>{

    if(intersection.x == coordinates.x || intersection.x == coordinates.x + dimensions.width) {
      if(intersection.y >= coordinates.y && intersection.y <= coordinates.y + dimensions.height) {
        intersectionsToReturn.push(intersection);
      }
    }

    if(intersection.y == coordinates.y || intersection.y == coordinates.y + dimensions.height) {
      if(intersection.x >= coordinates.x && intersection.x <= coordinates.x + dimensions.width) {
        intersectionsToReturn.push(intersection);
      }
    }
  });

  return intersectionsToReturn;


}
