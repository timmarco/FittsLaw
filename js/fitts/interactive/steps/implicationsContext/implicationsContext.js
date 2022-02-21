/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepImplicationsContext = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepImplicationsContext",
    "trigger":"fittsStepImplicationsContext",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("laptop");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("By using contextual menus, designers can ensure that the Distance term is extremely small.");

  }

  function transitionOut() {

  }
};
