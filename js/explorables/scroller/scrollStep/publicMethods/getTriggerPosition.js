/* global ExplorableScrollStep */
/* global d3 */
/* global window */
ExplorableScrollStep.prototype.getTriggerPosition = function() {

  let boundingBox,
    node,
    returns,
    selection;

  selection = d3.select("#" + this.triggerId);
  node = selection.node();
  boundingBox = node.getBoundingClientRect();

  returns = {
    "transitionIn":boundingBox.top + window.scrollY,
    "transitionOut":boundingBox.top + boundingBox.height + window.scrollY
  };

  return returns;
};
