
function widthCalculationDisplay(parent) {
  let container,
    publicObject,
    widthLine;

  publicObject = {
      update:update
  };

  init(parent);

  return publicObject;

  function init(parent) {

    container = addContainer();
    widthLine = addWidthLine();

  }

  /* PUBLIC METHODS */
  function update(value) {
    widthLine
      .update(value.width);

  }


  /* PRVIATE METHODS */
  function addContainer() {
    let container;

    container = new CalculationStepContainer({
      "parent":parent
    });

    return container;
  }


  function addWidthLine() {
    let line;

    //TODO: CONTAINER DOT SVG IS NOW UNNECESSARY!
    line = container.addLine({
      "where":container.svg,
      "label":"Width",
      "color":fittsColors().width,
      "domain":[0,750],
      "fontSize":"14pt",
      "fontFamily":"Oswald",
    });

    return line;
  }

}
