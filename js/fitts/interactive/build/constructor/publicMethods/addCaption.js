/* global FittsInteractivePrivateConstructor */
/* global d3 */
FittsInteractivePrivateConstructor.prototype.addCaption = function() {
    let body,
      foreignObject,
      caption;

    foreignObject = this.interactive.rootLayers.caption
      .append("foreignObject")
      .attr("x",0)
      .attr("y",425)
      .attr("width",800)
      .attr("height",200);

    body = foreignObject
      .append("xhtml:body")
      .attr("width","100%")
      .attr("height","100%");


    caption = body
      .append("div")
      .style("width","100%")
      .style("font-size","1.33em")
      .style("padding","0.5em")
      .html("");


    return caption;
};
