/* exported ExplorableNumberlineTitle */
/* global ExplorableHintedText */
function ExplorableNumberlineTitle(options) {
  let backgroundColor,
    coordinates,
    fontSize,
    fontFamily,
    fontWeight,
    foregroundColor,
    string,
    textAnchor,
    title,
    where;

  title = this;

  init(options);

  return title;

  function init(options) {

    _required(options);
    _defaults(options);

    title.text = addText();

  }

  function _defaults(options) {

    backgroundColor = options.backgroundColor ? options.backgroundColor : "white";
    coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    fontSize = options.fontSize ? options.fontSize : "36pt";
    fontWeight = options.fontWeight ? options.fontWeight : "bold";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    foregroundColor = options.foregroundColor ? options.foregroundColor : "black";
    string = options.string ? options.string : "";
    textAnchor = options.textAnchor ? options.textAnchor : "middle";

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
      "fontWeight":fontWeight,
      "fontFamily":fontFamily,
      "foregroundColor":foregroundColor,
      "textAnchor":textAnchor
    })
    .update(string)
    .hide();

    return text;
  }


}
