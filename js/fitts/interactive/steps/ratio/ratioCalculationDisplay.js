/* exported ratioCalculationDisplay */
/* global CalculationStepContainer */
/* global fittsColors */

function ratioCalculationDisplay(parent) {
  let container,
    distanceLine,
    widthLine,
    ratioLine,
    publicObject;

  publicObject = {
      update:update
  };

  init();

  return publicObject;

  function init() {

    container = addContainer();
    distanceLine = addDistanceLine();
    widthLine = addWidthLine();
    ratioLine = addRatioLine();

  }

  /* PUBLIC METHODS */
  function update(value) {
    distanceLine
      .update(value.distance);

    widthLine
      .update(value.width);

    ratioLine
      .update(value.ratio);

    return publicObject;

  }


  /* PRVIATE METHODS */
  function addContainer() {
    let container;

    container = new CalculationStepContainer({
      "parent":parent
    });


    return container;
  }


  function addDistanceLine() {
    let line;

    //TODO: CONTAINER DOT SVG IS NOW UNNECESSARY!
    line = container.addLine({
      "where":container.svg,
      "label":"Distance",
      "color":fittsColors().distance,
      "fontFamily":"Oswald",
      "domain":[0,750]
    });

    return line;
  }

  function addRatioLine() {
    let line;

    //TODO: CONTAINER DOT SVG IS NOW UNNECESSARY!
    line = container.addLine({
      "where":container.svg,
      "label":"Ratio",
      "color":fittsColors().ratio,
      "fontFamily":"Oswald",
      "domain":[0,12]
    });

    return line;

  }

  function addWidthLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Width",
      "color":fittsColors().width,
      "fontFamily":"Oswald",
      "domain":[0,750]
    });

    return line;

  }


}
