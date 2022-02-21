/* global EquationDivisionTerm */
/* global ExplorableHintedText */
EquationDivisionTerm.prototype.denominator = function(options) {
  let term = this;

  term.denominatorText = new ExplorableHintedText({
    "where":term.innerGroup,
    "coordinates":{
      "x":0,
      "y":10
    },
    "fontSize":"10pt",
    "foregroundColor":options.color,
    "fontWeight":"bold",
    "fontFamily":options.fontFamily,
    "textAnchor":"middle",
    "alignmentBaseline":"hanging",
  })
  .update(options.string);

  term
    .layout();

  return term;

};
