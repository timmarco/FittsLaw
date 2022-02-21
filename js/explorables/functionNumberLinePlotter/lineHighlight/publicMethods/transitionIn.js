/* global FunctionNumberLineHighlight */
FunctionNumberLineHighlight.prototype.transitionIn = function(duration,delay) {
  const highlight = this;

  const lineDuration = 500;

  if(!highlight.hasTransitioned) {

    highlight.line
      .transition()
      .duration(0)
      .attr("x2",highlight.coordinates.x1)
      .attr("y2",highlight.coordinates.y1)
      .transition()
      .duration(lineDuration)
      .delay(delay + duration)
      .attr("x2",highlight.coordinates.x2)
      .attr("y2",highlight.coordinates.y2);

    highlight.inputText
      .scaleIn(duration,delay);

    highlight.outputText
      .scaleIn(duration,delay + duration);


    highlight.hasTransitioned = true;
  }

  return highlight;
};
