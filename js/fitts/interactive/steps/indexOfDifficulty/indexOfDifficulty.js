/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepIndexOfDifficulty = function() {
  let interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepIndexOfDifficulty",
    "trigger":"fittsStepIndexOfDifficulty",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("indexOfDifficulty");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("A higher <span style='font-weight:bold;color:"+fittsColors().indexOfDifficulty+"'>Index of Difficulty</span> means an action will be <em>harder</em> for a user.");

    interactive.hotspot
      .attr("display","none");

    interactive.indexOfDifficultyDiagram
      .show();

  }

  function transitionOut() {

    interactive.indexOfDifficultyDiagram
      .hide();

    interactive.hotspot
      .attr("display","block");

  }

};
