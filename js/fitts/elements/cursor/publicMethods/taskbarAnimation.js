/* global FittsCursor */
/* global d3 */
FittsCursor.prototype.taskbarAnimation = function() {
  const imageGroup = this.imageGroup;

  this
    .show();

  // this
    // .embiggen(3);

  this
    .showCircle();

  this
    .hideText();


  this
    .move({
      "x":525,
      "y":150
    });

  loop();

  function loop() {
    imageGroup
    .attr("transform","translate(0,0)")
    .transition()
    .duration(1000)
    .ease(d3.easeExpIn)
    .attr("transform","translate(0,175)")
    .transition()
    .delay(675)
    .duration(1000)
    .ease(d3.easePolyOut)
    .attr("transform","translate(0,0)")
    .on('end',loop);
  }


  return this;
};
