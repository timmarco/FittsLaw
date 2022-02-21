/* exported laptopInteractiveCalculationDisplay */
/* global fittsColors */
/* global CalculationStepContainer */
function laptopInteractiveCalculationDisplay(parent) {
  let container,
    distanceLine,
    indexLine,
    logarithmicPlot,
    widthLine,
    ratioLine,
    ratioPlusOneLine,
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
    ratioPlusOneLine = addRatioPlusOneLine();
    logarithmicPlot = addLogarithmicPlot();
    indexLine = addIndexLine();

  }

  /* PUBLIC METHODS */
  function update(value) {

    distanceLine
      .update(value.distance);

    widthLine
      .update(value.width);

    ratioLine
      .update(value.ratio);

    ratioPlusOneLine
      .update(value.ratioPlusOne);

    logarithmicPlot
      .update(value.ratioPlusOne);

    indexLine
      .update(value.indexOfDifficulty);
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
      "domain":[0,1500]
    });

    return line;
  }

  function addIndexLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Index",
      "color":fittsColors().indexOfDifficulty,
      "fontFamily":"Oswald",
      "domain":[0,12]
    });

    return line;
  }

  function addLogarithmicPlot() {
    let plot;

    plot = container.addFunctionNumberLinePlot({
      "where":container.svg,
      "label":"log2",
      "range":[0,5],
      "domain":[0,12],
      "color":fittsColors().logarithm,
      "fontSize":"12pt",
      "lineHeight":30,
      "fontFamily":"Oswald",
      "lineTextColor":fittsColors().indexOfDifficulty,
      "labelText":"log<tspan baseline-shift='sub'>2</tspan>",
      "function":(x) => { return Math.log2(x); },
      "highlightColor":fittsColors().logarithm
    });

    return plot;
  }


  function addRatioLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Ratio",
      "color":fittsColors().ratio,
      "fontFamily":"Oswald",
      "lineHeight":40,
      "domain":[0,12]
    });

    return line;

  }

  function addRatioPlusOneLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Ratio + 1",
      "color":fittsColors().ratio,
      "fontFamily":"Oswald",
      "lineHeight":17,
      "domain":[0,12]
    }).addConstantValue({
      "value":1,
      "color":"black"
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
      "lineHeight":45,
      "domain":[0,1500]
    });

    return line;

  }


}
