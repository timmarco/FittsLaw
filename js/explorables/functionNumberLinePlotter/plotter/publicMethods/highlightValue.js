/* global FunctionNumberLinePlotter */
//TODO: WHERE ARE MARGINS AND HEIGHT COMING FROM HERE?
function functionNumberLineHighlightValue(publicObject) {
  return (value) => {
    let line;

    line = group
      .append("line")
      .attr("x1",publicObject.scale(value))
      .attr("x2",publicObject.scale(publicObject.functionToPlot(value)))
      .attr("y1",margins.top)
      .attr("y2",height - margins.bottom)
      .attr("stroke","blue")
      .attr("stroke-width",3);


    return publicObject;
  };
}
