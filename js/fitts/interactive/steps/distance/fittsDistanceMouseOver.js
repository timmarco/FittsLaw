/* exported fittsDistanceMouseOver */
function fittsDistanceMouseOver(interactive) {
  return () => {

    interactive.distanceText
      .hide(125)
      .killPulse();

  };
}
