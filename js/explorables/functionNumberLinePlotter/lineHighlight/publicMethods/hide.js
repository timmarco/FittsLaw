/* global FunctionNumberLineHighlight */
FunctionNumberLineHighlight.prototype.hide = function() {
  let highlight = this;

  highlight.inputText
    .hide();

  highlight.line
    .attr("opacity",0);

  highlight.outputText
    .hide();

  return highlight;
};
