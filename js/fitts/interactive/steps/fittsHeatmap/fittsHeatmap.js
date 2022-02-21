/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepHeatmap = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepHeatmap",
    "trigger":"fittsStepHeatmap",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.fittsHeatmap
      .fade(650,0.9);

    interactive.caption
      .html("Fitts' Law can be calculated for <em>every possible</em> <span style='font-weight:bold; color:"+fittsColors().pointer+"'>initial pointer position</span> simultaneously. Here, darker shades of orange correspond to higher <span style='font-weight:bold; color:"+fittsColors().indexOfDifficulty+"'>Indexes of Difficulty</span>.");

  }

  function transitionOut() {

    interactive.fittsHeatmap
      .fade(375,0);

  }
};
