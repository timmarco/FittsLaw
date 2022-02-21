/* exported FittsInteractive */
/* global fittsCalculations */
/* global FittsInteractivePrivateConstructor */
/* global d3 */
/* global window */

function FittsInteractive() {
  let interactive;

  interactive = this;


  init();

  return interactive;

  /* INITIALIZE */
  function init() {
    let _constructor;

    interactive.calculations = fittsCalculations();
    _constructor = new FittsInteractivePrivateConstructor(interactive);
    interactive.events = definePublicEvents();
    interactive.rescale();

  }

  /* PRIVATE METHODS */
  function definePublicEvents() {
    let events;

    events = {};
    //TODO: THESE SHOULD BE IN SCROLLER, NOT FITTS!
    d3.selectAll(".step")
      .each(function() {
        let toEval,
          trigger;

        trigger = d3.select(this)
          .attr("data-triggers");

        if(trigger) {
          toEval = trigger + "(interactive)";
          events[trigger] = window[trigger](interactive);
        }
      });
    return events;
  }

}
