/* exported CalculationStepContainer */
/* global explorableSvg */
function CalculationStepContainer(options) {
  let step;

  step = this;

  init(options);

  return step;

  /* INTIIALIZE */
  function init(options) {

    _required(options);

    addContainer(options.parent.tooltip);

    step.svg = addSvg();

  }

  function _required(options) {
    step.lines = [];
    step.parent = options.parent;
    step.width = 300;
  }

  /* PRIVATE METHODS */
  function addContainer(tooltip) {

    tooltip
      .update("<div id='fittsCalculationDisplay'>");

  }

  function addSvg() {
    let svg;

    svg = explorableSvg({
      "where": "#fittsCalculationDisplay",
      "width": step.width,
      "height": 120,
    });

    return svg;
  }


}
