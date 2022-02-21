/* exported fittsWidthMouseOver */
function fittsWidthMouseOver(interactive) {
  return () => {

    interactive.tooltip
      .show(125);

  };
}
