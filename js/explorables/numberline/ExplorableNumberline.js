/* exported ExplorableNumberline */
/* global d3 */

function ExplorableNumberline(options) {
  let numberline,
    where;

  numberline = this;
  init(options);

  return numberline;

  function init(options) {

    _required(options);
    _defaults(options);

    numberline.group = addGroup();
    numberline.scale = defineScale();
    numberline.indicators = [];
    numberline.hasTransitioned = false;

  }

  function _defaults(options) {

    numberline.orientationYPosition = options.orientationYPosition ? options.oreintationYPosition : 300;
    numberline.domain = options.domain ? options.domain : [0,1];
    numberline.range = options.range ? options.range : [0,100];

  }

  function _required(options) {
    where = options.where;
  }

  function addGroup() {
    let group;

    group = where
      .append("g");

    return group;
  }


  function defineScale() {
    let scale;

    scale = d3.scaleLinear()
      .domain(numberline.domain)
      .range(numberline.range);

    return scale;
  }

}
