/* exported laptopTaskbarAnimation */
function laptopTaskbarAnimation(interactive) {
  const taskbar = interactive.laptopTaskbar.image;

  interactive.cursor
    .taskbarAnimation();

  interactive.laptopTaskbar
    .show();


  loopTaskbar();

  function loopTaskbar() {
    taskbar
      .attr("y",50)
      .transition()
      .delay(875)
      .duration(375)
      .attr("y",0)
      .transition()
      .delay(500)
      .duration(250)
      .attr("y",50)
      .transition()
      .duration(675)
      .on('end',loopTaskbar);
  }


}
