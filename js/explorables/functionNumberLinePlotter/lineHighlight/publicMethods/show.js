/* global FunctionNumberLineHighlight */
FunctionNumberLineHighlight.prototype.show = function() {
  let highlight = this;

  highlight.inputText
    .show();

  highlight.line
    .attr("opacity",1);

  highlight.outputText
    .show();

  return highlight;
};
