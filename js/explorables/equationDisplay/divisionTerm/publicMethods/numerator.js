/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.numerator = function(options) {
  let term = this;

  term.numeratorText = new ExplorableHintedText({
    "where":term.innerGroup,
    "coordinates":{
      "x":0,
      "y":-25
    },
    "fontSize":"10pt",
    "fontFamily":options.fontFamily,
    "foregroundColor":options.color,
    "fontWeight":"bold",
    "textAnchor":"middle",
    "alignmentBaseline":"hanging",
  })
  .update(options.string);

  term.layout();

  return term;

};
