/* exported EquationDisplayTerm */
/* global explorableGroup */
/* global ExplorableHintedText */
function EquationDisplayTerm(options) {
  let color,
    fontFamily,
    fontSize,
    fontWeight,
    displayTerm,
    string,
    where;

  displayTerm = this;

  init(options);

  return displayTerm;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);
    displayTerm.outerGroup = addGroup();
    displayTerm.innerGroup = addInnerGroup();
    displayTerm.text = addText();

    displayTerm.animateHighlightColor = displayTerm.text.animateHighlightColor;

  }


  /* PRIVATE METHODS */
  function _defaults(options) {

    displayTerm.anchorHorizontal = options.anchorHorizontal ? options.anchorHorizontal : "end";
    displayTerm.anchorVertical = options.anchorVertical ? options.anchorVertical : "middle";
    color = options.color ? options.color : "black";
    displayTerm.coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    fontSize = options.fontSize ? options.fontSize : "12pt";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    fontWeight = options.fontWeight ? options.fontWeight : "normal";
    string = options.string ? options.string : " ";

  }

  function _required(options) {

    where = options.where;

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
      "where":displayTerm.outerGroup,
    });

    return innerGroup;
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":displayTerm.innerGroup,
      "fontFamily":fontFamily,
      "fontSize":fontSize,
      "fontWeight":fontWeight,
      "foregroundColor":color
    })
    .update(string);
    return text;
  }


}
