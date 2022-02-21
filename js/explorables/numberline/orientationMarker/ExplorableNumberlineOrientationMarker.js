/* exported ExplorableNumberlineOrientationMarker */
/* global ExplorableHintedText */

function ExplorableNumberlineOrientationMarker(options) {
  let backgroundColor,
    coordinates,
    fontFamily,
    fontSize,
    fontWeight,
    foregroundColor,
    marker,
    string,
    textAnchor,
    where;

  marker = this;

  init(options);

  return marker;

  function init(options) {

    _required(options);
    _defaults(options);

    marker.text = addText();

  }

  function _defaults(options) {

    backgroundColor = options.backgroundColor ? options.backgroundColor : "white";
    coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    fontFamily = options.fontFamily ? options.fontFamily : "";
    fontSize = options.fontSize ? options.fontSize : "14pt";
    fontWeight = options.fontWeight ? options.fontWeight : "normal";
    foregroundColor = options.foregroundColor ? options.foregroundColor : "black";
    string = options.string ? options.string : "";
    textAnchor = options.textAnchor ? options.textAnchor : "start";

  }

  function _required(options) {
    where = options.where;
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":where,
      "backgroundColor":backgroundColor,
      "coordinates":coordinates,
      "fontSize":fontSize,
      "fontFamily":fontFamily,
      "fontWeight":fontWeight,
      "foregroundColor":foregroundColor,
      "textAnchor":textAnchor
    })
    .update(string);

  }

}
