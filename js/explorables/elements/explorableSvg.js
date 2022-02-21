/* exported explorableSvg */
/* global d3 */
// TODO: REFACTOR AS A CONSTRUCTOR
function explorableSvg(options) {
  let actualWidth,
    aspectRatio,
    svg;

  svg = d3.select(options.where)
    .append("svg")
    .attr("viewbox","0 0 800 400")
    .attr("preserveAspectRatio","xMinYMin")
    .attr("height",options.height ? options.height : 400)
    .attr("width",options.width ? options.width : 800);


  if(options.responsive) {
    //TODO: This only handles one case (constrainted by width). Add in height or find a better solution
    actualWidth = d3.select(options.where)
      .node()
      .getBoundingClientRect()
      .width;

    aspectRatio = svg.attr("height") / svg.attr("width");

    svg
      .attr("width",actualWidth)
      .attr("height",actualWidth * aspectRatio);
  }

  if(options.showOverflow) {
    svg
      .style("overflow","visible");
  }

  return svg;
}
