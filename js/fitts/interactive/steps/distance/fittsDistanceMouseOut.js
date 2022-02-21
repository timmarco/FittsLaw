/* exported fittsDistanceMouseOut */
function fittsDistanceMouseOut(interactive) {

  return () => {
    interactive.tooltip
      .hide();

    interactive.distanceText
      .update("Distance");
  };
}
