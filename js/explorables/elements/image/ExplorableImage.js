/* exported ExplorableImage */
function ExplorableImage(options) {
  let height,
    href,
    publicObject,
    width,
    where,
    x,
    y;

  publicObject = this;

  init(options);

  return publicObject;

  /* INITIALIZE */
  function init(options) {
    // _defaults(options);
    _required(options);

    publicObject.image = addImage(options.where,options.href);


  }

  /* PUBLIC METHODS */
  // function _defaults(options) {

  //}

  function _required(options) {

    href = options.href;
    where = options.where;
    height = options.height ? options.height : 100;
    width = options.width ? options.width :100;
    x = options.x ? options.x : 0;
    y = options.y ? options.y : 0;

  }


  /* PRIVATE METHODS */
  function addImage() {
    let image;

    image = where
      .append("image")
      .attr("xlink:href",href)
      .attr("height",height)
      .attr("width",width)
      .attr("x",x)
      .attr("y",y);

    return image;
  }
}
