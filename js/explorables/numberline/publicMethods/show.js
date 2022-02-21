/* global ExplorableNumberline */
ExplorableNumberline.prototype.show = function(options = {}) {
  const numberline = this;

  if(!numberline.hasTransitioned) {
    options.titleDuration = options.titleDuration ? options.titleDuration : 500;
    options.titleDelay = options.titleDelay ? options.titleDelay : 0;
    options.axisDuration = options.axisDuration ? options.axisDuration : 1500;
    options.axisDelay = options.axisDelay ? options.axisDelay : 0;

    if(numberline.title) { numberline.title.transitionIn(options.titleDuration,options.titleDelay); }
    if(numberline.axis) { numberline.axis.transitionIn(options.axisDuration,options.axisDelay); }

    numberline.indicators.forEach((indicator) => {
      indicator.transitionIn();
    });


    numberline.hasTransitioned = true;
  }


  return numberline;
};
