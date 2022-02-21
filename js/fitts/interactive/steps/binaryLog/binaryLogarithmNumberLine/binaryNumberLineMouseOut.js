/* exported binaryLogarithmNumberLineMouseOut */
function binaryLogarithmNumberLineMouseOut(interactive) {
  return () => {

    interactive.numberLineInteractiveHighlight
      .hide();

  };
}
