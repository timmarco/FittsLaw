/* exported laptopInteractiveMouseOut */
function laptopInteractiveMouseOut(interactive) {
  return () => {

    interactive.tooltip
      .hide();

    return interactive;
  };
}
