/* exported fittsRatioMouseOut */
function fittsRatioMouseOut(interactive) {
  return () => {

    interactive.tooltip
      .hide(125);
  };
}
