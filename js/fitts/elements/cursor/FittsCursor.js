/* exported FittsCursor */
/* global ExplorableImage */
/* global fittsColors */
/* global explorableGroup */
/* global ExplorableHintedText */
function FittsCursor(options) {
  let coordinates,
    cursor,
    publicObject,
    where;

  cursor = this;

  init(options);

  return publicObject;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    cursor.group = addGroup();
    cursor.circle = addCircle();
    cursor.text = addText();
    cursor.imageGroup = addImageGroup();
    cursor.image = addCursor();


    cursor.move(coordinates);


  }


  /* PRIVATE METHODS */

  function _defaults(options) {

    coordinates = options.coordinates ? options.coordinates : {"x":50,"y":60};

  }

  function _required(options) {

    where = options.where;

  }


  function addCursor() {
    let cursorToAdd;

    cursorToAdd = new ExplorableImage({
      "where":cursor.imageGroup,
      "href":"assets/cursor.png",
      "width":20,
      "height":29
    });

    return cursorToAdd;
  }

  function addCircle() {
    let circle;

    circle = cursor.group
      .append("circle")
      .attr("cx",0)
      .attr("cy",0)
      .attr("r",5)
      .attr("fill",fittsColors().pointer);

    return circle;
  }

  function addGroup() {
    let group;

    group =  explorableGroup({
      "where":where
    });

    return group;
  }

  function addImageGroup() {
    let imageGroup;
    imageGroup = explorableGroup({
      "where":cursor.group
    });

    return imageGroup;
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":cursor.group,
      "textAnchor":"end",
      "fontSize":"18pt",
      "foregroundColor":fittsColors().pointer,
      "fontWeight":"bold",
      "string":"Initial Position",
      "fontFamily":"Oswald",
      "coordinates": {
        "x":-10,
        "y":0
      }
    });

    return text;
  }
}
