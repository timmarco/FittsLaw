/* exported binaryLogarithmMouseOver */
function binaryLogarithmMouseOver(interactive) {
  return () => {

    interactive.logarithmicPlot.lines
      .forEach((line) => {
        line.valueCircle
          .attr("r",5);
      });

  };
}
