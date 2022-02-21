/* exported explorableScroll */
/* global window */
/* global document */
/* global d3 */
function explorableScroll(interactive) {
  let currentlyActiveTrigger,
    scrollHasStarted,
    scroller,
    events,
    triggers,
    scrollOffset;
    // triggers;

  scroller = this;

  init();

  return scroller;

  /* INITALIZE */
  function init() {

    events = [];
    scrollHasStarted = false;
    window.onload = reset;
    window.onresize = reset;
  }

  function getTriggerPositions() {

    triggers = [];

    d3.selectAll(".step")
      .each(function() {
        let scrollStep = d3.select(this).attr("data-scroll-step");

        events.push(interactive[scrollStep]());

        events.forEach((event) => {
          let eventTrigger = event.getTriggerPosition();
          // TODO: SET THE ZERO TRIGGER!
          triggers.push({
            "event":event,
            "triggers":eventTrigger
          });
        });
      });

  }

  function scrollTrigger() {
    let documentElement,
      currentScrollPosition,
      matchedTrigger;

    documentElement = document.documentElement;
    currentScrollPosition = (window.pageYOffset || documentElement.scrollTop) - (document.clientTop || 0) + scrollOffset;

    matchedTrigger = triggers.find((triggerObject) => {
      return triggerObject.triggers.transitionOut > currentScrollPosition;
    });

    if(!currentlyActiveTrigger) {
      currentlyActiveTrigger = triggers[0];
    }

    if(currentlyActiveTrigger !== matchedTrigger) {
      currentlyActiveTrigger.event.transitionOut();
      if(matchedTrigger) {
        currentlyActiveTrigger = matchedTrigger;
        currentlyActiveTrigger.event.transitionIn();
        currentlyActiveTrigger.event.activate();
      }
    }

    if(!scrollHasStarted) {
      currentlyActiveTrigger = matchedTrigger;
      currentlyActiveTrigger.event.transitionIn();
      currentlyActiveTrigger.event.activate();
      scrollHasStarted = true;
    }

  }


  function reset() {

    scrollOffset = 200;

    getTriggerPositions();
    d3.select(window)
      .on('scroll',scrollTrigger);

    scrollTrigger(window.scrollY);
  }

}
