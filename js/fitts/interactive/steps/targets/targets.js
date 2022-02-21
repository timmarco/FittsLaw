/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepTargets = function() {
  const interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepTargets",
    "trigger":"fittsStepTargets",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.target
      .show()
      .pulse();

    interactive.targetText
      .show();

    interactive.emailZoom
      .transition()
      .duration(1000)
      .attr("transform","scale(2.5) translate(-500,0)");

    interactive.caption
      .html("The <span style='color:black;font-weight:bold;background-color:"+fittsColors().target+"'>Target</span> is a specific region or object that a user might want to point to.");


  }

  function transitionOut() {

    interactive.targetText
      .hide(125);

    interactive.target
      .hide(125);

    interactive.emailZoom
      .transition()
      .duration(625)
      .attr("transform","scale(1)");

  }

};
