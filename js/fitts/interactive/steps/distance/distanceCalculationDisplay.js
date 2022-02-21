/* exported distanceCalculationDisplay */
/* global CalculationStepContainer */
/* global fittsColors */
// TODO: NEED TO REFACTOR THIS!
function distanceCalculationDisplay(parent) {
  let container,
    distanceLine,
    publicObject;

  publicObject = {
      update:update
  };

  init();

  return publicObject;

  function init() {

    container = addContainer();
    distanceLine = addDistanceLine();

  }

  /* PUBLIC METHODS */
  function update(value) {

    distanceLine
      .update(value.distance);

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
      "domain":[0,750],
      "fontFamily":"Oswald",
      "fontSize":"14pt"
    });

    return line;
  }

}
