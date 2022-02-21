/* exported fittsFullEquationMouseOut */
function fittsFullEquationMouseOut(interactive) {
  return () => {

    interactive.tooltip
      .hide(125);

  };
}
