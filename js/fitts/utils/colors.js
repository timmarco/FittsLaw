/* jshint esversion:6*/
/* exported fittsColors */
/* global d3 */
function fittsColors() {
  let colors;

  colors = d3.schemeSet1;

  colors.target = colors[5];
  colors.distance = colors[1];
  colors.width = colors[0];
  colors.indexOfDifficulty = colors[4];
  colors.logarithm = colors[2];
  colors.hotspot = colors[4];
  colors.pointer = colors[7];
  colors.ratio = colors[3];
  colors.design = colors[8];

  return colors;
}
