/* exported ExplorableHintedText */
/* global explorableGroup */
function ExplorableHintedText(options) {
  let coordinates,
    text,
    string,
    alignmentBaseline,
    backgroundColor,
    backgroundStroke,
    fontFamily,
    fontWeight,
    fontSize,
    foregroundColor,
    textAnchor,
    where;


  text = this;

  init();

  return text;

  /* INITIALIZE */
  function init() {

    _required();
    _defaults();

    text.group = addGroup();
    text.innerGroup = addInnerGroup();
    text.background = addBackground();
    text.foreground = addForeground();

    text.move(coordinates);

  }


  /* PRIVATE METHODS */
  function _defaults() {
    alignmentBaseline = options.alignmentBaseline ? options.alignmentBaseline : "middle";
    backgroundColor = options.backgroundColor ? options.backgroundColor : "white";
    backgroundStroke = options.backgroundStroke ? options.backgroundStroke : 5;
    foregroundColor = options.foregroundColor ? options.foregroundColor : "black";
    fontSize = options.fontSize ? options.fontSize : "18pt";
    fontWeight = options.fontWeight ? options.fontWeight : "normal";
    textAnchor = options.textAnchor ? options.textAnchor : "middle";
    fontFamily = options.fontFamily ? options.fontFamily : "sans-serif";
    string = options.string ? options.string : "";
    coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
  }

  function _required() {

    where = options.where;

  }

  function addBackground() {
    let background;

    background = addText(text.innerGroup,string);

    background
      .attr("stroke",backgroundColor)
      .attr("stroke-width",backgroundStroke)
      .attr("alignment-baseline",alignmentBaseline)
      .attr("text-anchor",textAnchor)
      .attr("font-weight",fontWeight)
      .attr("font-size",fontSize)
      .attr("font-family",fontFamily)
      .attr("opacity",1);

    return background;
  }

  function addForeground() {
    let foreground;

    foreground = addText(text.innerGroup,string);

    foreground
      .attr("fill",foregroundColor)
      .attr("alignment-baseline",alignmentBaseline)
      .attr("text-anchor",textAnchor)
      .attr("font-weight",fontWeight)
      .attr("font-size",fontSize)
      .attr("font-family",fontFamily)
      .attr("opacity",1);

    return foreground;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addInnerGroup() {
    let innerGroup;

    innerGroup = explorableGroup({
      "where":text.group
    });

    return innerGroup;
  }

  function addText(where,string) {
    let text;

    text = where
      .append("text")
      .attr("x",0)
      .attr("y",0)
      .text(string);

    return text;
  }


}
