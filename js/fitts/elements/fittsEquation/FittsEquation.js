/* exported FittsEquation */
/* global EquationDisplayTerm */
/* global EquationDisplay */
/* global explorableGroup */
/* global EquationDivisionTerm */
/* global explorableSvg */
/* global ExplorableHintedText */
/* global fittsColors */
function FittsEquation(options) {
  let group,
    fittsEquation,
    where,
    svg,
    termPadding;

  fittsEquation = this;

  init(options);

  return fittsEquation;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    svg = addSvg();
    group = addGroup();
    fittsEquation.equation = addEquation();
    fittsEquation.indexOfDifficulty = addIndexOfDifficulty();
    fittsEquation.equalsSign = addEquals();
    fittsEquation.logarithm = addLogarithm();
    fittsEquation.openParenthesis = addOpenParenthesis();
    fittsEquation.ratio = addRatio();
    fittsEquation.ratioCurtain = addRatioCurtain();
    fittsEquation.ratioText = addRatioText();
    fittsEquation.plusOne = addPlusOne();
    fittsEquation.closeParenthesis = addCloseParenthesis();

    layoutEquation();
    centerEquation();


  }

  function _defaults(options) {

    termPadding = options.termPadding ? options.termPadding : 5;

  }

  function _required(options) {

    where = options.where;

  }

  function addCloseParenthesis() {
    let parenthesis;

    parenthesis = new EquationDisplayTerm({
      "where":group,
      "string":")",
      "fontSize":"24pt",
      "anchorHorizontal":"end",
      "fontFamily":"Oswald"
    });

    return parenthesis;
  }

  function addEquals() {
    let equalsSign;

    equalsSign = new EquationDisplayTerm({
      "where":group,
      "string":"=",
      "textAnchor":"end",
      "anchorHorizontal":"end",
      "fontFamily":"Oswald"
    });

    return equalsSign;
  }

  function addEquation() {
    let equation;

    equation = new EquationDisplay({
      "where":group,
      "coordinates":{
        "x":0,
        "y":0
      },
      "termPadding":termPadding
    });

    return equation;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":svg
    });

    return group;
  }

  function addIndexOfDifficulty() {
    let indexOfDifficulty;

    indexOfDifficulty = new EquationDisplayTerm({
      "where":group,
      "string":"Index of Difficulty",
      "anchorHorizontal":"end",
      "fontSize":"18pt",
      "fontFamily":"Oswald"
    });

    return indexOfDifficulty;

  }

  function addLogarithm() {
    let logarithm;

    logarithm = new EquationDisplayTerm({
      "where":group,
      "string":"log<tspan baseline-shift='sub'>2</tspan>",
      "fontSize":"18pt",
      "fontFamily":"Oswald"
    });

    return logarithm;
  }

  function addOpenParenthesis() {
    let parenthesis;

    parenthesis = new EquationDisplayTerm({
      "where":group,
      "string":"(",
      "color":"black",
      "fontSize":"24pt",
      "anchorHorizontal":"end",
      "fontFamily":"Oswald"
    });


    return parenthesis;
  }

  function addPlusOne() {
    let plusOne;

    plusOne = new EquationDisplayTerm({
      "where":group,
      "string":"+1",
      "color":"black",
      "fontWeight":"bold",
      "fontSize":"18pt",
      "anchorHorizontal":"end",
      "fontFamily":"Oswald"
    });


    return plusOne;
  }

  function addRatio() {
    let ratio;

    ratio = new EquationDivisionTerm({
      "where":group,
      "anchorHorizontal":"end"
    })
    .denominator({
      "string":"Width",
      "fontSize":"10pt",
      "fontWeight":"bold",
      "fontFamily":"Oswald"
    })
    .numerator({
      "string":"Distance",
      "fontSize":"10pt",
      "fontWeight":"bold",
      "fontFamily":"Oswald"
    });

    return ratio;
  }

  function addRatioCurtain() {
    let curtain;

    curtain = group
      .append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("width",0)
      .attr("height",0)
      .attr("opacity",0);

    return curtain;
  }

  function addRatioText() {
    let text;

    text = new ExplorableHintedText({
      "where":group,
      "fontSize":"14pt",
      "color":fittsColors().ratio,
      "textAnchor":"middle",
      "fontWeight":"bold",
      "foregroundColor":fittsColors().ratio,
      "fontFamily":"Oswald"
    });

    return text;
  }

  function addSvg() {
    let svg;

    svg = explorableSvg({
      "where":where,
      "width":"100%",
      "height":100
    });

    return svg;
  }

  function centerEquation() {
    let containerWidth,
      groupWidth,
      offset;

    containerWidth = svg
      .node()
      .getBoundingClientRect()
      .width;

    groupWidth = group
      .node()
      .getBoundingClientRect()
      .width;

    offset = containerWidth - (groupWidth / 2);
    group
      .attr("transform","translate("+offset+",50)");

  }

  function layoutEquation() {

    fittsEquation.equation
      .addTerm(fittsEquation.indexOfDifficulty)
      .addTerm(fittsEquation.equalsSign)
      .addTerm(fittsEquation.logarithm)
      .addTerm(fittsEquation.openParenthesis)
      .addTerm(fittsEquation.ratio)
      .addTerm(fittsEquation.plusOne)
      .addTerm(fittsEquation.closeParenthesis)
      .layout();

  }

}
