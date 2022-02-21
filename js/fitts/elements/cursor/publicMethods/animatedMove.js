/* global FittsCursor */
/* global d3 */
FittsCursor.prototype.animatedMove = function(animation) {
  const cursor = this;

  repeatAnimation();

  function repeatAnimation() {

    cursor.imageGroup
      .attr("transform","translate(0,0)")
      .transition()
      .duration(animation.duration)
      .ease(animation.ease ? animation.ease : d3.easeQuad)
      .attr("transform","translate("+animation.coordinates.x+","+animation.coordinates.y+")")
      .transition()
      .duration(animation.delayEnd ? animation.delayEnd : 0)
      .on('end',animation.repeats ? repeatAnimation : null);
  }

  return cursor;
};
