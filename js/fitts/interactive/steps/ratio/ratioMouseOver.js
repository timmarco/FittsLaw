/* exported fittsRatioMouseOver */
function fittsRatioMouseOver(interactive) {
  return () => {

    interactive.tooltip
      .hide(125);
  };
}
