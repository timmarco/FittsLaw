/* exported ExplorableScrollStep */
function ExplorableScrollStep(options) {
  const step = this;

  init(options);

  return step;

  function init(options) {
    // _defaults(options);
    _required(options);

    step.transitionIn = () => {};
    step.transitionOut = () => {};
  }

  // function _defaults(options) {

  // }

  function _required(options) {
    step.name = options.name;
    step.triggerId = options.trigger;
  }

}
