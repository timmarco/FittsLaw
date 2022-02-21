/* global FittsInteractivePrivateConstructor */
/* global ExplorableNumberline */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addIndexDiagram = function() {
  const interactive = this.interactive;

  let diagram;

  diagram = new ExplorableNumberline({
    "where":interactive.layers.indexOfDifficulty,
    "domain":[0,5],
    "range":[50,750]
  })
  .addTitle({
    "string":"Index of Difficulty",
    "backgroundColor":"#eee",
    "coordinates":{
      "x":400,
      "y":50
    },
    "fontFamily":"Oswald",
    "fontSize":"36pt",
    "fontWeight":"normal",
    "foregroundColor":fittsColors().indexOfDifficulty
  })
  .addAxis({
    "coordinates":{
      "x":0,
      "y":200
    },
    "backgroundColor":"#eee",
    "fontFamily":"Oswald",
    "fontSize":"16pt",
    "tickSize":15,
    "tickOffset":30
  })
  .addMinmumOrientationMarker({
    "string":"&larr; Easier to do",
    "fontFamily":"Oswald",
    "backgroundColor":"#eee",
    "fontSize":"18pt"
  })
  .addMaximumOrientationMarker({
    "string":"Harder to do &rarr;",
    "fontFamily":"Oswald",
    "backgroundColor":"#eee",
    "fontSize":"18pt"
  });
  
  return diagram;
};
