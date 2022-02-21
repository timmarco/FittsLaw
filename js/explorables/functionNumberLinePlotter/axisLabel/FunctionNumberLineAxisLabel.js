/* exported FunctionNumberLineAxisLabel */
/* global ExplorableHintedText */
function FunctionNumberLineAxisLabel(options) {
  let alignmentBaseline,
    backgroundColor,
    color,
    coordinates,
    fontFamily,
    fontSize,
    fontWeight,
    label,
    location,
    parent,
    string,
    text,
    where;

  label = this;

  init(options);

  return label;

  /* INITIALIZER */
  function init(options) {

    _required(options);
    _defaults(options);

    text = addText();

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    color = options.color ? options.color : "black";
    backgroundColor = options.backgroundColor ? options.backgroundColor : "white";
    fontSize = options.fontSize ? options.fontSize : "12pt";
    fontWeight = options.fontWeight ? options.fontWeight : "bold";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    string = options.string ? options.string : "";

  }

  function _required(options) {

    where = options.where;
    parent = options.parent;
    location = options.location;
    alignmentBaseline = switchAlignmentBaseline();
    coordinates = switchCoordinates();
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":parent.group,
      "coordinates":coordinates,
      "alignmentBaseline":alignmentBaseline,
      "foregroundColor":color,
      "fontSize":fontSize,
      "fontWeight":fontWeight,
      "fontFamily":fontFamily,
      "backgroundColor":backgroundColor
    })
    .update(string);

  }

  function switchAlignmentBaseline() {

    switch(location) {
      case "top":
        return "text-after-edge";
      case "bottom":
        return "text-before-edge";
    }

  }

  function switchCoordinates() {

    switch(location) {
      case "top":
        return {
          "x":parent.width / 2,
          "y":0
        };
      case "bottom":
        return {
          "x":parent.width / 2,
          "y":parent.height
        };
    }

  }
}
