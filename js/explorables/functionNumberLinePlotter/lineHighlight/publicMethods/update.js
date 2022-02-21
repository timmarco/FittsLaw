/* global FunctionNumberLineHighlight */
FunctionNumberLineHighlight.prototype.update = function(value) {
  const line = this;
  const outputValue = line.parent.functionToPlot(value).toFixed(2);

  if(isNaN(outputValue)) { return line; }
  if(value > line.parent.scale.domain()[1]) { return line; }
  if(outputValue < line.parent.scale.domain()[0]) { return line; }

  value = +value;
  value = value.toFixed(2);

  line.coordinates = line.parent
    .lineCoordinatesForValue(value);

  line.line
    .attr("x1",line.coordinates.x1)
    .attr("x2",line.coordinates.x2)
    .attr("y1",line.coordinates.y1)
    .attr("y2",line.coordinates.y2);

  line.inputText
    .update(value)
    .move({"x":line.coordinates.x1,"y":line.coordinates.y1});

  line.outputText
    .update(outputValue)
    .move({"x":line.parent.scale(outputValue),"y":line.coordinates.y2});

  return line;

};
