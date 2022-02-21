/* global FittsCursor */
/* global d3 */
FittsCursor.prototype.laptopAnimation = function() {

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

  this
    .animatedMove({
      "coordinates":{
        "x":0,
        "y":175
      },
      "delayEnd":500,
      "duration":1500,
      "repeats":true,
      "ease":d3.easeExpIn,
    });

  return this;
};
