/* exported FittsEmailBase */
/* global ExplorableImage */
/* global explorableGroup */

function FittsEmailBase(options) {
  let base,
    group,
    where;

  base = this;

  init(options);

  return base;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    // _defaults(options);

    group = addGroup();
    base.appImage = addAppImage();
    base.desaturatedImage = addDesaturatedImage();


  }

  /* PUBLIC METHODS */


  /* PRIVATE METHODS */
  // function _defaults(options) {

  // }

  function _required(options) {
    where = options.where;
  }


  function addAppImage() {
    let image;

    image = new ExplorableImage({
      "where":group,
      "href":"assets/interface.png",
      "width":800,
      "height":601
    });

    return image;
  }

  function addDesaturatedImage() {
    let image;

    image = new ExplorableImage({
      "where":group,
      "href":"assets/interfaceDesaturated.png",
      "width":800,
      "height":601
    });

    return image;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });
    return group;
  }




}
