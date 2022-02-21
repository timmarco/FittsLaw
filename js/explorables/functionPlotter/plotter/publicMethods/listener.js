/* global FunctionPlotter */
/* global d3 */

//TODO: REVIEW WHERE MARGINS ARE SUPPOSED TO COME FROME
FunctionPlotter.prototype.listener = function(listenerEvent,listenerMethod) {
  const plotter = this;

  plotter.hotspot
    .on(listenerEvent,() => {
      let mouseCoordinates;

      mouseCoordinates = {};
      mouseCoordinates.x = d3.event.offsetX - plotter.margins.left;
      mouseCoordinates.y = d3.event.offsetY - plotter.margins.top;

      listenerMethod({
        "coordinates":mouseCoordinates,
        "values":{
          "x":plotter.scales.x
            .invert(mouseCoordinates.x),
          "y":plotter.scales.y
            .invert(mouseCoordinates.y)
        }
        });

        plotter.lines
          .forEach((line) => {
            line.highlightValue(plotter.scales.x
                .invert(mouseCoordinates.x)
            );
          });
      });

  return plotter;
};
