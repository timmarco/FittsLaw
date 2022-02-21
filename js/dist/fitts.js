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

/*jshint esversion:6 */
function fittsCalculations() {
  return {
    calculateFittsLaw:calculateFittsLaw
  };

  /* PUBLIC METHODS */
  function calculateFittsLaw(target,cursor) {
    let candidateDistances,
      cursorCoordinates,
      distance,
      distanceMidpoint,
      indexOfDifficulty,
      intersections,
      nearestIntersection,
      returnObject,
      width;

    cursorCoordinates = cursor
      .getCoordinates();

    intersections = getIntersection(cursorCoordinates,target);

    candidateDistances = [];
    intersections.forEach((intersection) => {
      candidateDistances.push(distanceFormula(cursorCoordinates,intersection));
    });

    // TODO: INVESTIGATE WHAT'S GOING ON HERE!
    if(intersections[0],intersections[1]) {
      width = distanceFormula(intersections[0],intersections[1]);
      distance = d3.min(candidateDistances);
      nearestIntersectionIndex = candidateDistances.indexOf(distance);

      indexOfDifficulty = Math.log2((1 + distance / width));

      distanceMidpoint = midpoint(cursorCoordinates,intersections[nearestIntersectionIndex]);

      nearestIntersection = intersections[nearestIntersectionIndex];


      returnObject = {
        "distance":distance,
        "width":width,
        "indexOfDifficulty":indexOfDifficulty,
        "distanceMidpoint":distanceMidpoint,
        "cursorCoordinates":cursorCoordinates,
        "targetCentroid":target.centroid(),
        "intersections":intersections,
        "nearestIntersection":nearestIntersection
      };

      return returnObject;
    } else {

      return false;
    }

  }

  /* PRIVATE METHODS */
  function getIntersection(cursorCoordinates,target) {
    let equationFromCursor,
      intersections,
      lineFromCursor;


    lineFromCursor = {
      "x1":cursorCoordinates.x,
      "y1":cursorCoordinates.y,
      "x2":target.centroid().x,
      "y2":target.centroid().y
    };

    equationFromCursor = lineAsEquation(lineFromCursor);
    // TODO: EXPOSING INDICATOR IS LAZY. FIX THIS!
    intersections = lineRectangleIntersection(equationFromCursor,target.indicator);

    return intersections;
  }


}

/* exported FittsCircleTarget */
/* global explorableGroup */
/* global fittsColors */
function FittsCircleTarget(options) {
  const target = this;
  let coordinates,
    radius,
    where;

  init(options);

  return target;

  function init(options) {
    _required(options);

    target.group = addGroup();
    target.circle = addCircle();
  }

  function _required(options) {
    radius = options.radius;
    coordinates = options.coordinates;
    where = options.where;
  }

  function addCircle() {
    let circle;

    circle = target.group
      .append("circle")
      .attr("r",radius)
      .attr("cx",coordinates.x)
      .attr("cy",coordinates.y)
      .attr("fill",fittsColors().target)
      .attr("opacity",1);

    return circle;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }



}

/* exported FittsCursor */
/* global ExplorableImage */
/* global fittsColors */
/* global explorableGroup */
/* global ExplorableHintedText */
function FittsCursor(options) {
  let coordinates,
    cursor,
    publicObject,
    where;

  cursor = this;

  init(options);

  return publicObject;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    cursor.group = addGroup();
    cursor.circle = addCircle();
    cursor.text = addText();
    cursor.imageGroup = addImageGroup();
    cursor.image = addCursor();


    cursor.move(coordinates);


  }


  /* PRIVATE METHODS */

  function _defaults(options) {

    coordinates = options.coordinates ? options.coordinates : {"x":50,"y":60};

  }

  function _required(options) {

    where = options.where;

  }


  function addCursor() {
    let cursorToAdd;

    cursorToAdd = new ExplorableImage({
      "where":cursor.imageGroup,
      "href":"assets/cursor.png",
      "width":20,
      "height":29
    });

    return cursorToAdd;
  }

  function addCircle() {
    let circle;

    circle = cursor.group
      .append("circle")
      .attr("cx",0)
      .attr("cy",0)
      .attr("r",5)
      .attr("fill",fittsColors().pointer);

    return circle;
  }

  function addGroup() {
    let group;

    group =  explorableGroup({
      "where":where
    });

    return group;
  }

  function addImageGroup() {
    let imageGroup;
    imageGroup = explorableGroup({
      "where":cursor.group
    });

    return imageGroup;
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":cursor.group,
      "textAnchor":"end",
      "fontSize":"18pt",
      "foregroundColor":fittsColors().pointer,
      "fontWeight":"bold",
      "string":"Initial Position",
      "fontFamily":"Oswald",
      "coordinates": {
        "x":-10,
        "y":0
      }
    });

    return text;
  }
}

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

/* exported FittsExampleTargets */
/* global explorableGroup */
/* global fittsExampleTargetData */
/* global fittsColors */
function FittsExampleTargets(options) {
  let targets,
    where;

  targets = this;

  init(options);

  return targets;

  function init(options) {

    _required(options);
    _defaults(options);

    targets.group = addGroup().attr("opacity",0);
    targets.targets = addTargets();
    targets.pulsing = false;
  }

  /* PRIVATE */
  function _required() {

    where = options.where;

  }

  function _defaults() {

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addTargets() {
    let targetData,
      targetRects;

    targetData = fittsExampleTargetData();

    targetRects = targets.group
      .selectAll("rect")
      .data(targetData)
      .enter()
      .append("rect")
      .attr("x",(datum) => { return datum.x; })
      .attr("y",(datum) => { return datum.y; })
      .attr("width",(datum) => { return datum.width; })
      .attr("height",(datum) => { return datum.height; })
      .attr("fill",fittsColors().target)
      .attr("opacity",0.5);

    return targetRects;

  }
}

/* exported fittsExampleTargetData */
function fittsExampleTargetData() {
  return [
        {
          "name":"newMessage",
          "x":0,
          "y":105,
          "width":180,
          "height":35,
        },

        {
          "name":"inbox",
          "x":0,
          "y":150,
          "width":100,
          "height":25,
        },

        {
          "name":"favorites",
          "x":0,
          "y":180,
          "width":100,
          "height":25,
        },

        {
          "name":"sentMessages",
          "x":0,
          "y":210,
          "width":100,
          "height":25,
        },

        {
          "name":"savedDrafts",
          "x":0,
          "y":240,
          "width":100,
          "height":25,
        },

        {
          "name":"contacts",
          "x":0,
          "y":270,
          "width":100,
          "height":25,
        },

        {
          "name":"moreOptions",
          "x":0,
          "y":300,
          "width":100,
          "height":25,
        },

        {
          "name":"search",
          "x":195,
          "y":60,
          "width":305,
          "height":40,
        },

        {
          "name":"delete",
          "x":350,
          "y":105,
          "width":135,
          "height":40,
        },

        {
          "name":"saveDraft",
          "x":488,
          "y":105,
          "width":135,
          "height":40,
        },

        {
          "name":"linda",
          "x":230,
          "y":145,
          "width":110,
          "height":25,
        },

        {
          "name":"subjectLine",
          "x":265,
          "y":178,
          "width":145,
          "height":25,
        },

        {
          "name":"emailBody",
          "x":200,
          "y":205,
          "width":505,
          "height":395,
        },

        {
          "name":"backButton",
          "x":15,
          "y":22,
          "width":25,
          "height":24,
        },

        {
          "name":"forwardButton",
          "x":43,
          "y":22,
          "width":25,
          "height":24,
        },

        {
          "name":"refreshButton",
          "x":74,
          "y":22,
          "width":25,
          "height":24,
        },

        {
          "name":"urlBar",
          "x":110,
          "y":22,
          "width":640,
          "height":24,
        },

        {
          "name":"leftOSButton",
          "x":743,
          "y":2,
          "width":11,
          "height":14,
        },

        {
          "name":"middleOSButton",
          "x":759,
          "y":2,
          "width":11,
          "height":14,
        },

        {
          "name":"rightOSButton",
          "x":774,
          "y":2,
          "width":11,
          "height":14,
        },

      ];
}

/* exported FittsEquation */
/* global EquationDisplayTerm */
/* global EquationDisplay */
/* global explorableGroup */
/* global EquationDivisionTerm */
/* global explorableSvg */
/* global ExplorableHintedText */
/* global fittsColors */
function FittsEquation(options) {
  let group,
    fittsEquation,
    where,
    svg,
    termPadding;

  fittsEquation = this;

  init(options);

  return fittsEquation;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    svg = addSvg();
    group = addGroup();
    fittsEquation.equation = addEquation();
    fittsEquation.indexOfDifficulty = addIndexOfDifficulty();
    fittsEquation.equalsSign = addEquals();
    fittsEquation.logarithm = addLogarithm();
    fittsEquation.openParenthesis = addOpenParenthesis();
    fittsEquation.ratio = addRatio();
    fittsEquation.ratioCurtain = addRatioCurtain();
    fittsEquation.ratioText = addRatioText();
    fittsEquation.plusOne = addPlusOne();
    fittsEquation.closeParenthesis = addCloseParenthesis();

    layoutEquation();
    centerEquation();


  }

  function _defaults(options) {

    termPadding = options.termPadding ? options.termPadding : 5;

  }

  function _required(options) {

    where = options.where;

  }

  function addCloseParenthesis() {
    let parenthesis;

    parenthesis = new EquationDisplayTerm({
      "where":group,
      "string":")",
      "fontSize":"24pt",
      "anchorHorizontal":"end",
      "fontFamily":"Oswald"
    });

    return parenthesis;
  }

  function addEquals() {
    let equalsSign;

    equalsSign = new EquationDisplayTerm({
      "where":group,
      "string":"=",
      "textAnchor":"end",
      "anchorHorizontal":"end",
      "fontFamily":"Oswald"
    });

    return equalsSign;
  }

  function addEquation() {
    let equation;

    equation = new EquationDisplay({
      "where":group,
      "coordinates":{
        "x":0,
        "y":0
      },
      "termPadding":termPadding
    });

    return equation;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":svg
    });

    return group;
  }

  function addIndexOfDifficulty() {
    let indexOfDifficulty;

    indexOfDifficulty = new EquationDisplayTerm({
      "where":group,
      "string":"Index of Difficulty",
      "anchorHorizontal":"end",
      "fontSize":"18pt",
      "fontFamily":"Oswald"
    });

    return indexOfDifficulty;

  }

  function addLogarithm() {
    let logarithm;

    logarithm = new EquationDisplayTerm({
      "where":group,
      "string":"log<tspan baseline-shift='sub'>2</tspan>",
      "fontSize":"18pt",
      "fontFamily":"Oswald"
    });

    return logarithm;
  }

  function addOpenParenthesis() {
    let parenthesis;

    parenthesis = new EquationDisplayTerm({
      "where":group,
      "string":"(",
      "color":"black",
      "fontSize":"24pt",
      "anchorHorizontal":"end",
      "fontFamily":"Oswald"
    });


    return parenthesis;
  }

  function addPlusOne() {
    let plusOne;

    plusOne = new EquationDisplayTerm({
      "where":group,
      "string":"+1",
      "color":"black",
      "fontWeight":"bold",
      "fontSize":"18pt",
      "anchorHorizontal":"end",
      "fontFamily":"Oswald"
    });


    return plusOne;
  }

  function addRatio() {
    let ratio;

    ratio = new EquationDivisionTerm({
      "where":group,
      "anchorHorizontal":"end"
    })
    .denominator({
      "string":"Width",
      "fontSize":"10pt",
      "fontWeight":"bold",
      "fontFamily":"Oswald"
    })
    .numerator({
      "string":"Distance",
      "fontSize":"10pt",
      "fontWeight":"bold",
      "fontFamily":"Oswald"
    });

    return ratio;
  }

  function addRatioCurtain() {
    let curtain;

    curtain = group
      .append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("width",0)
      .attr("height",0)
      .attr("opacity",0);

    return curtain;
  }

  function addRatioText() {
    let text;

    text = new ExplorableHintedText({
      "where":group,
      "fontSize":"14pt",
      "color":fittsColors().ratio,
      "textAnchor":"middle",
      "fontWeight":"bold",
      "foregroundColor":fittsColors().ratio,
      "fontFamily":"Oswald"
    });

    return text;
  }

  function addSvg() {
    let svg;

    svg = explorableSvg({
      "where":where,
      "width":"100%",
      "height":100
    });

    return svg;
  }

  function centerEquation() {
    let containerWidth,
      groupWidth,
      offset;

    containerWidth = svg
      .node()
      .getBoundingClientRect()
      .width;

    groupWidth = group
      .node()
      .getBoundingClientRect()
      .width;

    offset = containerWidth - (groupWidth / 2);
    group
      .attr("transform","translate("+offset+",50)");

  }

  function layoutEquation() {

    fittsEquation.equation
      .addTerm(fittsEquation.indexOfDifficulty)
      .addTerm(fittsEquation.equalsSign)
      .addTerm(fittsEquation.logarithm)
      .addTerm(fittsEquation.openParenthesis)
      .addTerm(fittsEquation.ratio)
      .addTerm(fittsEquation.plusOne)
      .addTerm(fittsEquation.closeParenthesis)
      .layout();

  }

}

/* exported FittsInteractiveIndicator */
function FittsInteractiveIndicator(options) {
  let body,
    fittsIndicator,
    height,
    width,
    where;

  fittsIndicator = this;

  init(options);

  return fittsIndicator;

  function init(options) {
    _required(options);
    _defaults(options);

    fittsIndicator.foreignObject = addForeignObject();
    body = addBody();
    fittsIndicator.div = addContainerDiv();
  }

  function _defaults(options) {
    height = options.height ? options.height : 100;
    width = options.width ? options.width : 800;
  }

  function _required(options) {
    where = options.where;
  }

  function addForeignObject() {
    let foreignObject;

    foreignObject = where
      .append("foreignObject")
      .attr("width",width)
      .attr("height",height)
      .attr("x",0)
      .attr("y",0)
      .attr("opacity",0);

    return foreignObject;
  }

  function addBody() {
    let body;

    body = fittsIndicator.foreignObject
      .append("xhtml:body")
      .style("margin",0)
      .style("padding",0);

    return body;
  }

  function addContainerDiv() {
    let div;

    div = body
      .append("div")
      .classed("callout",true);

    return div;
  }

}

/* exported FittsIntroInteractive */
/* global d3 */
/* global fittsColors */
/* global Math */

function FittsIntroInteractive(options) {
  let introInteractive,
    where;

  introInteractive = this;

  init(options);

  return introInteractive;

  function init(options) {

    _required(options);

    introInteractive.isRunning = false;
    introInteractive.circles = addCircles();
    introInteractive.distanceLine = addDistanceLine();
    introInteractive.widthLine = addWidthLine();
    introInteractive.cursor = addCursor();

  }

  function _required(options) {
    where = options.where;
  }

  function addCircles() {
    let circles;

    circles = [];

    d3.range(0,10).forEach(() => {
      let baseOpacity,
        baseRadius,
        circle;

      baseRadius = d3.randomUniform(30,100)();
      baseOpacity = d3.randomUniform(0,0.5)();

      circle = where
        .append("circle")
        .attr("cx",d3.randomUniform(0,800))
        .attr("cy",d3.randomUniform(0,400))
        .attr("r",baseRadius)
        .attr("opacity",baseOpacity)
        .attr("fill",fittsColors().target)
        .attr("stroke","black")
        .attr("stroke-width",2)
        .attr("data-base-radius",baseRadius)
        .attr("data-base-opacity",baseOpacity);

      circles.push(circle);
    });


    return circles;
  }

  function addCursor() {
    let cursor;

    cursor = where.append("circle")
      .attr("cx",Math.floor(d3.randomUniform(50,750)()))
      .attr("cy",Math.floor(d3.randomUniform(25,375)()))
      .attr("r",10)
      .attr("fill",fittsColors().pointer);

    return cursor;
  }


  function addDistanceLine() {
    let line;

    line = where
      .append("line")
      .attr("stroke",fittsColors().distance)
      .attr("stroke-width",5)
      .attr("x1",0)
      .attr("x2",0)
      .attr("y1",40)
      .attr("y2",500);

    return line;
  }

  function addWidthLine() {
    let line;

    line = where
      .append("line")
      .attr("stroke",fittsColors().width)
      .attr("stroke-width",5);

    return line;
  }

}

/* exported FittsTarget */
/* global explorableGroup */
/* global fittsColors */

function FittsTarget(options) {
  let colors,
    group,
    target,
    where;

  target = this;

  init(options);

  return target;

  /* INITIALIZE */
  function init(options) {
    _required(options);
    _defaults(options);

    group = addGroup();
    target.indicator = addTargetIndicator();


    target.move(target.coordinates);
    target.resize(target.dimensions);

  }

  function _defaults(options) {

    target.coordinates = options.coordinates ? options.coordinates : {"x":125,"y":125};
    target.dimensions = options.dimensions ? options.dimensions : {"width":120,"height":50};

  }

  function _required(options) {

    colors = options.colors;
    where = options.where;

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addTargetIndicator() {
    let targetIndicator;

    targetIndicator = group
      .append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("fill","none")
      .attr("fill",fittsColors().target)
      .attr("opacity",0.75);

    return targetIndicator;
  }

}

/* exported FittsThumbIndicator */
/* global fittsColors */
function FittsThumbIndicator(options) {
  let fill,
    radius,
    stroke,
    strokeWidth,
    thumbIndicator,
    where;

  thumbIndicator = this;

  init(options);

  return thumbIndicator;

  function init(options) {

    _required(options);
    _defaults(options);
    thumbIndicator.opacity = addOpacity();
    thumbIndicator.circle = addCircle();

  }

  function _defaults(options) {

    fill = options.fill ? options.fill : fittsColors().pointer;
    radius = options.radius ? options.radius : 20;
    stroke = options.stroke ? options.stroke : "black";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 1;

  }

  function _required(options) {

    where = options.where;

  }

  function addCircle() {
    let circle;

    circle = thumbIndicator.opacity
      .append("circle")
      .attr("r",radius)
      .attr("cx",0)
      .attr("cy",0)
      .attr("fill",fill)
      .attr("stroke",stroke)
      .attr("stroke-width",strokeWidth)
      .attr("opacity",1);

    return circle;
  }

  function addOpacity() {
    let group;

    group = where
      .append("g");

    return group;
  }


}

/* exported FittsInteractive */
/* global fittsCalculations */
/* global FittsInteractivePrivateConstructor */
/* global d3 */
/* global window */

function FittsInteractive() {
  let interactive;

  interactive = this;


  init();

  return interactive;

  /* INITIALIZE */
  function init() {
    let _constructor;

    interactive.calculations = fittsCalculations();
    _constructor = new FittsInteractivePrivateConstructor(interactive);
    interactive.events = definePublicEvents();
    interactive.rescale();

  }

  /* PRIVATE METHODS */
  function definePublicEvents() {
    let events;

    events = {};
    //TODO: THESE SHOULD BE IN SCROLLER, NOT FITTS!
    d3.selectAll(".step")
      .each(function() {
        let toEval,
          trigger;

        trigger = d3.select(this)
          .attr("data-triggers");

        if(trigger) {
          toEval = trigger + "(interactive)";
          events[trigger] = window[trigger](interactive);
        }
      });
    return events;
  }

}

/* global FittsCircleTarget */
FittsCircleTarget.prototype.hide = function(duration = 0) {

  this.group
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};

/* global FittsCircleTarget */
FittsCircleTarget.prototype.pulse = function() {
  const target = this;

  repeatAnimation();

  return target;

  function repeatAnimation() {

    target.group
      .transition()
      .duration(750)
      .attr("opacity",0.75)
      .transition()
      .duration(1125)
      .attr("opacity",0)
      .on('end',repeatAnimation);

  }

};

/* global FittsCursor */
/* global d3 */
FittsCursor.prototype.animatedMove = function(animation) {
  const cursor = this;

  repeatAnimation();

  function repeatAnimation() {

    cursor.imageGroup
      .attr("transform","translate(0,0)")
      .transition()
      .duration(animation.duration)
      .ease(animation.ease ? animation.ease : d3.easeQuad)
      .attr("transform","translate("+animation.coordinates.x+","+animation.coordinates.y+")")
      .transition()
      .duration(animation.delayEnd ? animation.delayEnd : 0)
      .on('end',animation.repeats ? repeatAnimation : null);
  }

  return cursor;
};

/* global FittsCursor */
FittsCursor.prototype.attr = function(key,value) {

  this.image
    .attr(key,value);

  return this;
};

/* global FittsCursor */
FittsCursor.prototype.embiggen = function(scale) {

  this.image.image
    .attr("transform","scale("+scale+")");

  return this;
};

/* global FittsCursor */
FittsCursor.prototype.getCoordinates = function() {
  return this.coordinates;
};

/* global FittsCursor */
FittsCursor.prototype.hide = function(duration) {

  this.imageGroup
    .transition()
    .attr("transform","translate(0,0)");

  this.circle
    .transition()
    .duration(duration)
    .attr("opacity",0);

  this.text
    .hide(duration);

  this.image.image
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};

/* global FittsCursor */
FittsCursor.prototype.hideCircle = function() {

  this.circle
    .attr("display","none");

  return this;
};

/* global FittsCursor */
FittsCursor.prototype.hideText = function() {

  this.text
    .update("");

  return this;
};

/* global FittsCursor */
FittsCursor.prototype.killLaptopAnimation = function() {

  this.imageGroup
    .transition()
    .duration(0)
    .attr("transform","translate(0,0)");

  return this;
};

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

/* global FittsCursor */
FittsCursor.prototype.move  = function(newCoordinates) {

  this.coordinates = newCoordinates;

  this.group
    .transition()
    .duration(0)
    .attr("transform","translate("+this.coordinates.x+","+this.coordinates.y+")");

  return this;
};

/* global FittsCursor */
FittsCursor.prototype.reset = function() {

  this
    .move({
      "x":687,
      "y":325
    });

  return this;
};

/* global FittsCursor */
FittsCursor.prototype.show = function(duration = 0) {

  this.circle
    .transition()
    .duration(duration)
    .attr("opacity",1);

  this.text
    .show(duration);

  this.image.image
    .transition()
    .duration(duration)
    .attr("opacity",1);

  return this;
};

/* global FittsCursor */
FittsCursor.prototype.showCircle = function() {

  this.circle
    .attr("display","block");

  return this;
};

/* global FittsCursor */
FittsCursor.prototype.showText = function() {

  this.text
    .update("Initial Position");

  return this;
};

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

/* global FittsEmailBase */
FittsEmailBase.prototype.desaturated = function() {

  this.appImage
    .hide();

  this.desaturatedImage
    .show();

  return this;
};

/* global FittsEmailBase */
FittsEmailBase.prototype.fadeImage = function(opacity,duration) {

  this.appImage.image
    .transition()
    .duration(duration)
    .attr("opacity",opacity);

  return this;
};

/* global FittsEmailBase */
FittsEmailBase.prototype.saturated = function() {
  this.appImage
    .show();

  this.desaturatedImage
    .hide();

  return this;  
};

/* global FittsExampleTargets */
FittsExampleTargets.prototype.hide = function(duration = 0) {

  this.group
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};

/* global FittsExampleTargets */
FittsExampleTargets.prototype.pulse = function() {
  let parent = this;

  parent.pulsing = true;

  repeatAnimation();

  function repeatAnimation() {

    if(parent.pulsing) {
      parent.group
        .transition()
        .duration(1000)
        .attr("opacity",1)
        .transition()
        .duration(625)
        .attr("opacity",0)
        .on('end',repeatAnimation);
    }
  }
};

/* global FittsExampleTargets */
FittsExampleTargets.prototype.show = function(duration = 0) {

  this.group
    .transition()
    .duration(duration)
    .attr("opacity",1);

  return this;
};

/* global FittsEquation */
/* global fittsColors */
FittsEquation.prototype.highlightDistance = function() {

  this.ratio
    .highlightNumerator(fittsColors().distance);

  return this;
};

/* global FittsEquation */
/* global fittsColors */
FittsEquation.prototype.highlightIndexOfDifficulty = function() {

  this.indexOfDifficulty
    .changeColor(fittsColors().indexOfDifficulty,500)
    .makeBold();

  return this;
};

/* global FittsEquation */
/* global fittsColors */
FittsEquation.prototype.highlightLogarithm = function() {

  this.closeParenthesis
    .changeColor(fittsColors().logarithm)
    .makeBold();

  this.logarithm
    .changeColor(fittsColors().logarithm)
    .makeBold();

  this.openParenthesis
    .changeColor(fittsColors().logarithm)
    .makeBold();

  return this;

};

/* global FittsEquation */

FittsEquation.prototype.highlightPlusOne = function() {

  // TODO : FIGURE OUT A COLOR FOR PLUS ONE

  //publicObject.plusOne
    //.makeBold();

  return this;
};

/* global FittsEquation */
/* global fittsColors */
FittsEquation.prototype.highlightWidth = function() {

  this.ratio
    .highlightDenominator(fittsColors().width);

  return this;
};

/* global FittsEquation */

FittsEquation.prototype.layout = function() {

  this.equation
    .layout();

  return this;
};

/* global FittsEquation */

FittsEquation.prototype.updateDistance = function(newValue) {

  this.ratio.numeratorText
    .update(newValue)
    .embiggen(1.5);

  return this;
};

/* global FittsEquation */
FittsEquation.prototype.updateIndexOfDifficulty = function(value) {

  this.indexOfDifficulty.text
    .embiggen(1.5)
    .update(value);

  this.equation
    .layout();

  return this;
};

/* global FittsEquation */
FittsEquation.prototype.updateRatio = function(ratioValue) {
  const equation = this;
  let ratioBBox;

  ratioBBox = this.ratio.group
    .node()
    .getBBox();


  this.ratioCurtain
    .attr("x",equation.ratio.coordinates.x - ratioBBox.width)
    .attr("y",ratioBBox.y)
    .attr("width",ratioBBox.width)
    .attr("height",ratioBBox.height)
    .attr("fill","white")
    .attr("opacity",1);

  equation.ratioText
    .embiggen(1.5)
    .move({
      "x":equation.ratio.coordinates.x - ratioBBox.width / 2,
      "y":ratioBBox.y + ratioBBox.height / 2
    })
    .update(ratioValue);

  return this;
};

/* global FittsEquation */

FittsEquation.prototype.updateWidth = function(newValue) {

  this.ratio.denominatorText
    .update(newValue)
    .embiggen(1.5);

  return this;
};

/* global FittsInteractiveIndicator */
FittsInteractiveIndicator.prototype.deEmphasize = function() {

  this.div
    .transition()
    .duration(0)
    .style("color","black")
    .style("opacity",0.5);

  return this;
};

/* global FittsInteractiveIndicator */
FittsInteractiveIndicator.prototype.emphasize = function() {
  const indicator = this;

  loop();

  function loop() {
    indicator.div
      .transition()
      .duration(1000)
      .style("opacity",1);
  }

  return this;
};

/* global FittsInteractiveIndicator */
FittsInteractiveIndicator.prototype.hide = function() {

  this.foreignObject
    .transition()
    .duration(250)
    .attr("y",0)
    .attr("opacity",0);

  return this;
};

/* global FittsInteractiveIndicator */
/* global d3 */
FittsInteractiveIndicator.prototype.show = function() {

  let height = this.div
    .node()
    .getBoundingClientRect()
    .height;


  this.foreignObject
    .transition()
    .duration(750)
    .attr("y",-height * 2)
    .ease(d3.easeExpOut)
    .attr("opacity",1);

  return this;
};

/* global FittsInteractiveIndicator */
FittsInteractiveIndicator.prototype.update = function(newHtml) {

  this.div
    .html(newHtml);

  return this;
};

/* global FittsIntroInteractive */
/* global d3 */
/* global distanceFormula */
FittsIntroInteractive.prototype.run = function() {
  const introInteractive = this;

  let distanceToCenter,
    distanceToEdge,
    index,
    duration,
    selectedCircle,
    movement,
    endX,
    endY;

  if(introInteractive.isRunning) {

    index = Math.floor(d3.randomUniform(0,10)());
    selectedCircle = introInteractive.circles[index];
    duration = Math.floor(d3.randomUniform(750,3000)());

    introInteractive.circles.forEach((circle) => {

      circle
        .transition()
        .duration(125)
        .attr("opacity",function() {
          return d3.select(this).attr("data-base-opacity");
        });

    });

    endX = selectedCircle.attr("cx");
    endY = selectedCircle.attr("cy");


    distanceToCenter = distanceFormula(
      {
        "x":introInteractive.cursor.attr("cx"),
        "y":introInteractive.cursor.attr("cy")
      },
      {
        "x":selectedCircle.attr("cx"),
        "y":selectedCircle.attr("cy")
      }
    );
    distanceToEdge = distanceToCenter - selectedCircle.attr("r");


    selectedCircle
      .transition()
      .delay(125)
      .duration(250)
      .attr("opacity",1);


    let fittsValue = Math.log2(distanceToEdge / selectedCircle.attr("r") + 1);
    duration = 750 * fittsValue;

    movement = d3
      .transition()
      .duration(duration)
      .delay(375)
      .on('end',function() {
        introInteractive.run();
      });

    introInteractive.distanceLine
      .attr("x1",introInteractive.cursor.attr("cx"))
      .attr("y1",introInteractive.cursor.attr("cy"))
      .attr("x2",selectedCircle.attr("cx"))
      .attr("y2",selectedCircle.attr("cy"))
      .transition(movement)
      .attr("x1",endX)
      .attr("y1",endY);

    introInteractive.widthLine
      .attr("x1",selectedCircle.attr("cx"))
      .attr("y1",selectedCircle.attr("cy"))
      .attr("x2",introInteractive.cursor.attr("cx"))
      .attr("y2",introInteractive.cursor.attr("cy"))
      .attr("stroke-dasharray",selectedCircle.attr("r") +"," + distanceToEdge);

    introInteractive.cursor
      .transition(movement)
      .attr("cx",endX)
      .attr("cy",endY);

  }


};

/* global FittsIntroInteractive */
FittsIntroInteractive.prototype.start = function() {

  this.isRunning = true;
  this.run();

  return this;
};

/* global FittsIntroInteractive */
FittsIntroInteractive.prototype.stop = function() {

  this.isRunning = false;

  return this;
};

/* global FittsTarget */
FittsTarget.prototype.centroid = function() {
  return {
    "x":this.coordinates.x + this.dimensions.width / 2,
    "y":this.coordinates.y + this.dimensions.height / 2
  };
};

/* global FittsTarget */
FittsTarget.prototype.hide = function(duration) {

  this.indicator
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};

/* global FittsTarget */
FittsTarget.prototype.move = function(newCoordinates) {
  const target = this;

  target.coordinates = newCoordinates;

  target.indicator
    .attr("x",target.coordinates.x)
    .attr("y",target.coordinates.y);

  return target;
};

/* global FittsTarget */
FittsTarget.prototype.pulse = function(outDuration = 375,inDuration = 750) {
  const target = this;

  repeatAnimation();

  function repeatAnimation() {
    target.indicator
      .transition()
      .duration(outDuration)
      .attr("opacity",0.75)
      .transition()
      .duration(inDuration)
      .attr("opacity",0)
      .on('end',repeatAnimation);
  }

  return target;
};

/* global FittsTarget */
FittsTarget.prototype.resize = function(newDimensions) {
  const target = this;

  target.dimensions = newDimensions;

  target.indicator
    .attr("height",target.dimensions.height)
    .attr("width",target.dimensions.width);

  return target;
};

/* global FittsTarget */
FittsTarget.prototype.show = function(duration) {
  this.indicator
    .transition()
    .duration(duration)
    .attr("opacity",0.75);

  return this;
};

/* global FittsThumbIndicator */
FittsThumbIndicator.prototype.hide = function(duration = 500, delay = 0) {

  this.opacity
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("opacity",0);

  return this;
};

/* global FittsThumbIndicator */
FittsThumbIndicator.prototype.move = function(coordinates,duration = 500, delay = 0) {

  this.circle
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("cx",coordinates.x)
    .attr("cy",coordinates.y);

  return this;
};

/* global FittsThumbIndicator */
FittsThumbIndicator.prototype.show = function(duration = 500, delay = 0) {

  this.opacity
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("opacity",1);

  return this;
};

/* exported FittsInteractivePrivateConstructor */
/* global fittsColors */
function FittsInteractivePrivateConstructor(parent) {
  let privateConstructor;

  privateConstructor = this;
  privateConstructor.interactive = parent;

  parent.colors = fittsColors();
  parent.equations = privateConstructor.addEquations();
  parent.svg = privateConstructor.addSvg();
  parent.defs = privateConstructor.addDefs();
  parent.saturationFilter = privateConstructor.addSaturationFilter();
  parent.baseClip = privateConstructor.addBaseClip();
  parent.rootNode = privateConstructor.addRootNode();
  parent.indicator = privateConstructor.addInteractiveIndicator();

  parent.visibleLayer = privateConstructor.addVisibleLayer();

  parent.rootLayers = {};
  parent.rootLayers = privateConstructor.addLayers(["clipped","unclipped","caption","tooltip","hotspot"]);
  parent.rootLayers.clipped.attr("clip-path","url(#svgWindowClip)");
  parent.layers = {};
  //TODO: ARCHITECT THIS BETTER
  parent.layers.intro = parent.rootLayers.unclipped.append("g").attr("opacity",0);
  parent.layers.indexOfDifficulty = parent.rootLayers.unclipped.append("g").attr("opacity",0);
  parent.layers.email = parent.rootLayers.clipped.append("g").attr("opacity",0);
  parent.layers.logarithm = parent.rootLayers.unclipped.append("g").attr("opacity",0);
  parent.layers.logarithmNumberLine = parent.rootLayers.unclipped.append("g").attr("opacity",0);
  parent.layers.remote = parent.rootLayers.unclipped.append("g").attr("opacity",0);
  parent.layers.remoteSideView = parent.rootLayers.unclipped.append("g").attr("opacity",0);
  parent.layers.phone = parent.rootLayers.unclipped.append("g").attr("opacity",0);
  parent.layers.hardware = parent.rootLayers.unclipped.append("g").attr("opacity",0);
  parent.caption = privateConstructor.addCaption();

  parent.rootLayers.tooltip.attr("opacity",1);

  parent.introInteractive = privateConstructor.addIntroInteractive();
  parent.laptopClip = privateConstructor.addLaptopClip();
  parent.phoneClip = privateConstructor.addPhoneClip();
  parent.laptop = privateConstructor.addLaptop();
  parent.laptopTaskbar = privateConstructor.addLaptopTaskbar();
  parent.indexOfDifficultyDiagram = privateConstructor.addIndexDiagram();
  parent.emailZoom = privateConstructor.addEmailZoom();
  parent.base = privateConstructor.addBase();
  parent.cursor = privateConstructor.addCursor();
  parent.cursorText = privateConstructor.addCursorText();
  parent.logarithmicPlot = privateConstructor.addLogarithm();
  parent.logarithmNumberLinePlot = privateConstructor.addLogarithmNumberLine();
  parent.logarithmNegativeRegion = privateConstructor.addNegativeRegion();
  parent.numberLineInteractiveHighlight = privateConstructor.addNumberLineInteractiveHighlight();
  parent.numberLineHighlightOne = privateConstructor.addNumberHighlightOne();
  parent.numberLineDeltaHighlights = privateConstructor.addNumberLineDeltaHighlights();
  parent.target = privateConstructor.addTarget();
  parent.exampleTargets = privateConstructor.addExampleTargets();
  parent.targetText = privateConstructor.addTargetText();
  parent.laptopTopTarget = privateConstructor.addLaptopTopTarget();
  parent.laptopBottomTarget = privateConstructor.addLaptopBottomTarget();
  parent.laptopLeftTarget = privateConstructor.addLaptopLeftTarget();
  parent.laptopRightTarget = privateConstructor.addLaptopRightTarget();
  parent.phoneBottomTarget = privateConstructor.addPhoneBottomTarget();
  parent.phoneLeftTarget = privateConstructor.addPhoneLeftTarget();
  parent.phoneRightTarget = privateConstructor.addPhoneRightTarget();
  parent.phoneTopTarget = privateConstructor.addPhoneTopTarget();
  parent.phoneScrollTarget = privateConstructor.addPhoneScrollTarget();
  parent.distanceLine = privateConstructor.addDistanceLine();
  parent.distanceText = privateConstructor.addDistanceText();
  parent.widthLine = privateConstructor.addWidthLine();
  parent.widthText = privateConstructor.addWidthText();
  parent.ratioHeatmap = privateConstructor.addRatioHeatmap();
  parent.fittsHeatmap = privateConstructor.addFittsHeatmap();
  parent.tooltip = privateConstructor.addTooltip();
  parent.hardware = privateConstructor.addHardware();
  parent.remote = privateConstructor.addRemote();
  parent.remotes = privateConstructor.addRemotes();
  parent.remoteSideView = privateConstructor.addRemoteSideView();
  parent.remoteWithHand = privateConstructor.addRemoteWithHand();
  parent.remoteSelectTarget = privateConstructor.addRemoteSelectTarget();
  parent.remotePauseTarget = privateConstructor.addRemotePauseTarget();
  parent.remoteHeatmap = privateConstructor.addRemoteHeatmap();
  parent.menuBar = privateConstructor.addMenuBar();
  parent.phone = privateConstructor.addPhone();
  parent.phoneMenuBar = privateConstructor.addPhoneMenuBar();
  parent.phoneFittsWiki = privateConstructor.addPhoneFittsWiki();
  parent.thumbIndicator = privateConstructor.addThumbIndicator();
  parent.hotspot = privateConstructor.addHotspot();

  return privateConstructor;

}

/* global FittsInteractive */
FittsInteractive.prototype.getCurrentScale = function() {
  let scale,
    transform;

  transform = this.rootNode
    .attr("transform");

  scale = +transform
    .replace("scale(","")
    .replace(")","");

  return scale;
};

/* global FittsInteractive */
FittsInteractive.prototype.removeMouseEvents = function() {

  this.hotspot
    .on('mouseover',null)
    .on('mouseout',null)
    .on('mousemove',null)
    .on('mouseenter',null)
    .on('mouseleave',null);

  return this;
};

/* global FittsInteractive */
FittsInteractive.prototype.rescale = function() {
  let actualWidth,
    idealWidth,
    scale;

  actualWidth = this.svg
    .attr("width");

  idealWidth = 800;

  scale = actualWidth / idealWidth;

  this.rootNode
    .attr("transform","scale("+scale+")");


  return this;
};

/* global FittsInteractive */
FittsInteractive.prototype.showLayer = function(whichLayer) {

  Object.keys(this.layers).forEach((key) => {
    if(key == whichLayer) {
      this.layers[key]
        .transition()
        .duration(250)
        .attr("opacity",1);
    } else {
      if(key != "tooltip" && key != "hotspot") {
        this.layers[key]
          .transition()
          .duration(125)
          .attr("opacity",0);
      }
    }
  });

  return this;
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsDistanceMouseOut */
/* global fittsDistanceMouseOver */
/* global fittsDistanceMouseMove */
/* global distanceCalculationDisplay */
/* global fittsColors */

FittsInteractive.prototype.fittsStepDistance = function() {
  const interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepDistance",
    "trigger":"fittsStepDistance",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    let distanceCalculation,
      fittsResults;

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();


    interactive.cursor
      .reset()
      .show()
      .hideText()
      .showCircle();

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    interactive.distanceText
      .update("Distance")
      .move(fittsResults.distanceMidpoint)
      .show(250)
      .pulse(1000,1000);

    interactive.distanceLine
      .move({
        "x1":fittsResults.cursorCoordinates.x,
        "y1":fittsResults.cursorCoordinates.y,
        "x2":fittsResults.nearestIntersection.x,
        "y2":fittsResults.nearestIntersection.y
      })
      .show(250)
      .attr("stroke-dasharray","1,0")
      .attr("stroke-width",5);

    distanceCalculation = distanceCalculationDisplay(interactive);

    distanceCalculation
      .update(fittsResults);

    interactive.hotspot
      .on('mouseover',fittsDistanceMouseOver(interactive))
      .on('mouseout',fittsDistanceMouseOut(interactive))
      .on('mousemove',fittsDistanceMouseMove(interactive,distanceCalculation));

    interactive.caption
      .html("The <span style='font-weight:bold;color:"+fittsColors().distance+"'>Distance</span> is measured from where the pointer starts the action to the edge of the <span style='font-weight:bold;color:black;background-color:"+fittsColors().target+"'>target</span>.");

    interactive.base
      .desaturated();

    interactive.indicator
      .update("<strong>Interactive</strong>: Try moving your cursor around on the image to see how the <strong>Distance</strong> changes based on the Initial Position.")
      .show()
      .emphasize();

  }

  function transitionOut() {

    interactive.distanceText
      .hide(125)
      .killPulse();

    interactive.cursor
      .hideCircle();

    interactive.distanceLine
      .attr("stroke-width",0);

    interactive.indicator
      .hide();

  }





};

/* exported distanceCalculationDisplay */
/* global CalculationStepContainer */
/* global fittsColors */
// TODO: NEED TO REFACTOR THIS!
function distanceCalculationDisplay(parent) {
  let container,
    distanceLine,
    publicObject;

  publicObject = {
      update:update
  };

  init();

  return publicObject;

  function init() {

    container = addContainer();
    distanceLine = addDistanceLine();

  }

  /* PUBLIC METHODS */
  function update(value) {

    distanceLine
      .update(value.distance);

  }


  /* PRVIATE METHODS */
  function addContainer() {
    let container;

    container = new CalculationStepContainer({
      "parent":parent
    });

    return container;
  }


  function addDistanceLine() {
    let line;

    //TODO: CONTAINER DOT SVG IS NOW UNNECESSARY!
    line = container.addLine({
      "where":container.svg,
      "label":"Distance",
      "color":fittsColors().distance,
      "domain":[0,750],
      "fontFamily":"Oswald",
      "fontSize":"14pt"
    });

    return line;
  }

}

/* exported fittsDistanceMouseMove */
/* global d3 */
/* global fittsColors */
function fittsDistanceMouseMove(interactive,distanceCalculation) {
  return () => {

    let colors,
      coordinates,
      fittsResults,
      roundedDistance,
      scale;

    interactive.indicator
      .deEmphasize();

    interactive.distanceText
      .killPulse();


    interactive.tooltip
      .show();

    colors = fittsColors();

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    //TODO: FIGURE OUT WHAT'S UP HERE
    if(fittsResults) {

      roundedDistance = fittsResults.distance.toFixed(0);


      interactive.equations.distance
        .updateDistance(roundedDistance);

      distanceCalculation
        .update({
          "distance":roundedDistance,
        });
    }

    scale = interactive
      .getCurrentScale();

    coordinates = {
      "x":(1 / scale) * d3.event.offsetX,
      "y":(1 / scale) * d3.event.offsetY
    };

    interactive.tooltip
      .move({
        "x":coordinates.x,
        "y":coordinates.y + 20
      });

    interactive.cursor
      .move({
        "x":coordinates.x,
        "y":coordinates.y
      });

    // TODO: UPDATE DISTANCE TEXT
    interactive.distanceText
      .update("");

    interactive.distanceLine
      .move(
        {
          "x1":fittsResults.cursorCoordinates.x,
          "y1":fittsResults.cursorCoordinates.y,
          "x2":fittsResults.nearestIntersection.x,
          "y2":fittsResults.nearestIntersection.y
        }
      );


  };
}

/* exported fittsDistanceMouseOut */
function fittsDistanceMouseOut(interactive) {

  return () => {
    interactive.tooltip
      .hide();

    interactive.distanceText
      .update("Distance");
  };
}

/* exported fittsDistanceMouseOver */
function fittsDistanceMouseOver(interactive) {
  return () => {

    interactive.distanceText
      .hide(125)
      .killPulse();

  };
}

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepEmailIntro = function() {
  let interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepEmailIntro",
    "trigger":"fittsStepEmailIntro",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.base
      .saturated();

    interactive.caption
      .html("");

  }

  function transitionOut() {

  }

};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepHeatmap = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepHeatmap",
    "trigger":"fittsStepHeatmap",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.fittsHeatmap
      .fade(650,0.9);

    interactive.caption
      .html("Fitts' Law can be calculated for <em>every possible</em> <span style='font-weight:bold; color:"+fittsColors().pointer+"'>initial pointer position</span> simultaneously. Here, darker shades of orange correspond to higher <span style='font-weight:bold; color:"+fittsColors().indexOfDifficulty+"'>Indexes of Difficulty</span>.");

  }

  function transitionOut() {

    interactive.fittsHeatmap
      .fade(375,0);

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsFullEquationMouseOut */
/* global fittsFullEquationMouseOver */
/* global fittsFullEquationMouseMove */
/* global fullEquationCalculationDisplay */
/* global fittsColors */

FittsInteractive.prototype.fittsStepFullEquation = function() {
  const interactive = this;

  let equationCalculation;

  return new ExplorableScrollStep({
    "name":"fittsStepFullEquation",
    "trigger":"fittsStepFullEquation",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    let fittsResults;

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.cursor
      .reset();

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    equationCalculation = fullEquationCalculationDisplay(interactive);

    equationCalculation
      .update({
        "distance":fittsResults.distance.toFixed(0),
        "width":fittsResults.width.toFixed(0),
        "ratio":(fittsResults.distance.toFixed(0) / fittsResults.width.toFixed(0)).toFixed(2),
        "ratioPlusOne":(1 + fittsResults.distance.toFixed(0) / fittsResults.width.toFixed(0)).toFixed(2),
        "indexOfDifficulty":fittsResults.indexOfDifficulty.toFixed(2)
      });

      interactive.widthLine
        .move({
          "x1":fittsResults.intersections[0].x,
          "y1":fittsResults.intersections[0].y,
          "x2":fittsResults.intersections[1].x,
          "y2":fittsResults.intersections[1].y
        });

      interactive.distanceLine
        .move({
          "x1":fittsResults.cursorCoordinates.x,
          "y1":fittsResults.cursorCoordinates.y,
          "x2":fittsResults.targetCentroid.x,
          "y2":fittsResults.targetCentroid.y
        })
        .show()
        .attr("stroke-dasharray","1,0")
        .attr("stroke-width",5);



    interactive.hotspot
      .on('mouseover',fittsFullEquationMouseOver(interactive))
      .on('mouseout',fittsFullEquationMouseOut(interactive))
      .on('mousemove',fittsFullEquationMouseMove(interactive,equationCalculation));

    interactive.caption
      .html("Fitts' Law provides the <span style='font-weight:bold; color:"+fittsColors().indexOfDifficulty+"'>Index of Difficulty</span> for a <span style='font-weight:bold; color:black; background-color:"+fittsColors().target+"'>target</span> given an <span style='font-weight:bold; color:"+fittsColors().pointer+"'>initial pointer position</span>.");

    interactive.indicator
      .update("<strong>Interactive</strong> Move your cursor around to see the full calculation for Fitts' Law.")
      .show()
      .emphasize();

    interactive.cursor
      .show()
      .hideText()
      .showCircle();

    interactive.distanceLine
      .show();

    interactive.widthLine
      .show();

    interactive.base
      .desaturated();


  }

  function transitionOut() {

    interactive.distanceLine
      .hide();

    interactive.widthLine
      .hide();

    interactive.cursor
      .hide();

    interactive.tooltip
      .hide();

    interactive.indicator
      .hide();

  }


};

/* exported fullEquationCalculationDisplay */
/* global fittsColors */
/* global CalculationStepContainer */
function fullEquationCalculationDisplay(parent) {
  let container,
    distanceLine,
    indexLine,
    logarithmicPlot,
    widthLine,
    ratioLine,
    ratioPlusOneLine,
    publicObject;

  publicObject = {
      update:update
  };

  init();

  return publicObject;

  function init() {

    container = addContainer();
    distanceLine = addDistanceLine();
    widthLine = addWidthLine();
    ratioLine = addRatioLine();
    ratioPlusOneLine = addRatioPlusOneLine();
    logarithmicPlot = addLogarithmicPlot();
    indexLine = addIndexLine();

  }

  /* PUBLIC METHODS */
  function update(value) {
    
    distanceLine
      .update(value.distance);

    widthLine
      .update(value.width);

    ratioLine
      .update(value.ratio);

    ratioPlusOneLine
      .update(value.ratioPlusOne);

    logarithmicPlot
      .update(value.ratioPlusOne);

    indexLine
      .update(value.indexOfDifficulty);
  }


  /* PRVIATE METHODS */
  function addContainer() {
    let container;

    container = new CalculationStepContainer({
      "parent":parent
    });

    return container;
  }


  function addDistanceLine() {
    let line;

    //TODO: CONTAINER DOT SVG IS NOW UNNECESSARY!
    line = container.addLine({
      "where":container.svg,
      "label":"Distance",
      "lineHeight":30,
      "color":fittsColors().distance,
      "fontFamily":"Oswald",
      "domain":[0,750]
    });

    return line;
  }

  function addIndexLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Index",
      "color":fittsColors().indexOfDifficulty,
      "fontFamily":"Oswald",
      "domain":[0,12]
    });

    return line;
  }

  function addLogarithmicPlot() {
    let plot;

    plot = container.addFunctionNumberLinePlot({
      "where":container.svg,
      "label":"log2",
      "range":[0,5],
      "domain":[0,12],
      "color":fittsColors().logarithm,
      "lineHeight":35,
      "fontFamily":"Oswald",
      "fontSize":"12pt",
      "lineTextColor":fittsColors().indexOfDifficulty,
      "labelText":"log<tspan baseline-shift='sub' font-size='8pt'>2</tspan>",
      "function":(x) => { return Math.log2(x); },
      "highlightColor":fittsColors().logarithm
    });

    return plot;
  }


  function addRatioLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Ratio",
      "color":fittsColors().ratio,
      "fontFamily":"Oswald",
      "lineHeight":35,
      "domain":[0,12]
    });

    return line;

  }

  function addRatioPlusOneLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Ratio + 1",
      "color":fittsColors().ratio,
      "fontFamily":"Oswald",
      "lineHeight":17,
      "domain":[0,12]
    }).addConstantValue({
      "value":1,
      "color":"black"
    });

    return line;

  }

  function addWidthLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Width",
      "color":fittsColors().width,
      "fontFamily":"Oswald",
      "lineHeight":30,
      "domain":[0,750]
    });

    return line;

  }


}

/* exported fittsFullEquationMouseMove */
/* global fittsColors */
/* global d3 */
function fittsFullEquationMouseMove(interactive,equationCalculation) {
  return () => {

    let coordinates,
      colors,
      fittsResults,
      roundedDistance,
      roundedIndexOfDifficulty,
      roundedRatio,
      roundedWidth,
      scale;

    interactive.indicator
      .deEmphasize();

    colors = fittsColors();

    scale = interactive
      .getCurrentScale();

    coordinates = {
      "x":(1 / scale) * d3.event.offsetX,
      "y":(1 / scale) * d3.event.offsetY
    };

    interactive.cursor
      .move({
        "x":coordinates.x,
        "y":coordinates.y
      });

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    roundedDistance = fittsResults.distance.toFixed(0);
    roundedWidth = fittsResults.width.toFixed(0);
    roundedRatio = (roundedDistance / roundedWidth).toFixed(2);
    roundedIndexOfDifficulty = fittsResults.indexOfDifficulty.toFixed(2);

    equationCalculation
      .update({
        "distance":roundedDistance,
        "width":roundedWidth,
        "ratio":(roundedDistance / roundedWidth).toFixed(2),
        "ratioPlusOne":((roundedDistance / roundedWidth) + 1).toFixed(2),
        "indexOfDifficulty":roundedIndexOfDifficulty
      });

    interactive.tooltip
      .move({
        "x":coordinates.x,
        "y":coordinates.y + 20
      })
      .show();

    interactive.distanceText
      .update("");

    interactive.widthText
      .update("");

    interactive.widthLine
      .move({
        "x1":fittsResults.intersections[0].x,
        "y1":fittsResults.intersections[0].y,
        "x2":fittsResults.intersections[1].x,
        "y2":fittsResults.intersections[1].y
      });

    interactive.distanceLine
      .move({
        "x1":fittsResults.cursorCoordinates.x,
        "y1":fittsResults.cursorCoordinates.y,
        "x2":fittsResults.targetCentroid.x,
        "y2":fittsResults.targetCentroid.y
      });

    interactive.equations.fullEquation
      .updateRatio(roundedRatio)
      .updateIndexOfDifficulty(roundedIndexOfDifficulty);

  };
}

/* exported fittsFullEquationMouseOut */
function fittsFullEquationMouseOut(interactive) {
  return () => {

    interactive.tooltip
      .hide(125);

  };
}

/* function fittsFullEquationMouseOver */
function fittsFullEquationMouseOver(interactive) {
  return () => {

    interactive.tooltip
      .show(125);

  };
}

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepImplicationsContext = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepImplicationsContext",
    "trigger":"fittsStepImplicationsContext",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("laptop");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("By using contextual menus, designers can ensure that the Distance term is extremely small.");

  }

  function transitionOut() {

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepImplicationsDesign = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepImplicationsDesign",
    "trigger":"fittsStepImplicationsDesign",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("hardware");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Understanding the logic of Fitts' Law is crucial for designing things that humans can actually use.");

  }

  function transitionOut() {

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepImplicationsPhone = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepImplicationsPhone",
    "trigger":"fittsStepImplicationsPhone",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("fittsStepImplicationsPhone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Modern phones were designed with Fitts' Law in mind.");

  }

  function transitionOut() {

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepIndexOfDifficulty = function() {
  let interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepIndexOfDifficulty",
    "trigger":"fittsStepIndexOfDifficulty",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("indexOfDifficulty");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("A higher <span style='font-weight:bold;color:"+fittsColors().indexOfDifficulty+"'>Index of Difficulty</span> means an action will be <em>harder</em> for a user.");

    interactive.hotspot
      .attr("display","none");

    interactive.indexOfDifficultyDiagram
      .show();

  }

  function transitionOut() {

    interactive.indexOfDifficultyDiagram
      .hide();

    interactive.hotspot
      .attr("display","block");

  }

};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepIntro = function() {
  let interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepIntro",
    "trigger":"fittsStepIntro",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("intro");

    interactive
      .removeMouseEvents();

    interactive.introInteractive
      .start();

    interactive.caption
      .html("");
  }

  function transitionOut() {

    interactive.introInteractive
      .stop();

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepMultipleTargets = function() {
  const interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepMultipleTargets",
    "trigger":"fittsStepMultipleTargets",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.exampleTargets
      .pulse();

    interactive.caption
      .html("Most devices and applications will have many possible <span style='color:black;font-weight:bold;background-color:"+fittsColors().target+"'>targets</span>.");

    interactive.tooltip
      .hide();

    interactive.cursor
      .hide();

  }

  function transitionOut() {

    interactive.exampleTargets
      .hide(125);

  }

};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepPointingAction = function() {
  const interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepPointingAction",
    "trigger":"fittsStepPointingAction",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.base
      .fadeImage(1,250);

    interactive.base
      .desaturated();

    interactive.cursor
      .reset()
      .show(250)
      .showCircle()
      .showText()
      .animatedMove({
        "coordinates":{
          "x":0,
          "y":-195
        },
        "duration":2500,
        "repeats":true
      });

    interactive.caption
      .html("Fitts' Law tells predicts the relative difficulty of a particular <span style='font-weight:bold; color:"+fittsColors().pointer+"'>Pointing Action</span>.");

  }

  function transitionOut() {

    interactive.cursor
      .hide(125);

  }

};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global ratioCalculationDisplay */
/* global fittsRatioMouseOver */
/* global fittsRatioMouseOut */
/* global fittsRatioMouseMove */
/* global fittsColors */

FittsInteractive.prototype.fittsStepRatio = function() {
  const interactive = this;

  let ratioCalculation;

  return new ExplorableScrollStep({
    "name":"fittsStepRatio",
    "trigger":"fittsStepRatio",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    let fittsResults;

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.cursor
      .reset();

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    ratioCalculation = ratioCalculationDisplay(interactive);

    ratioCalculation
      .update({
        "distance":fittsResults.distance.toFixed(0),
        "width":fittsResults.width.toFixed(0),
        "ratio":(fittsResults.distance.toFixed(0) / fittsResults.width.toFixed(0)).toFixed(2)
      });

    interactive.caption
      .html("The <span style='font-weight:bold;color:"+fittsColors().ratio+"'>Ratio</span> between the <span style='font-weight:bold;color:"+fittsColors().distance+"'>Distance</span> and the <span style='font-weight:bold;color:"+fittsColors().width+"'>Width</span> determines the results of Fitts' Equation.");

    interactive.indicator
      .update("<strong>Interactive</strong>: Try moving your cursor around on the image to see how the <strong>Ratio</strong> changes based on the Initial Position.")
      .show()
      .emphasize();

    interactive.hotspot
      .on('mouseover',fittsRatioMouseOver(interactive))
      .on('mouseout',fittsRatioMouseOut(interactive))
      .on('mousemove',fittsRatioMouseMove(interactive,ratioCalculation));

    interactive.cursor
      .show()
      .hideText()
      .showCircle();

    interactive.widthLine
      .show()
      .attr("stroke-width",5);

    interactive.base
      .desaturated();

    interactive.distanceLine
      .show()
      .attr("stroke-dasharray","1,0")
      .attr("stroke-width",5);

  }

  function transitionOut() {

    interactive.distanceLine
      .hide();

    interactive.widthLine
      .hide();

    interactive.tooltip
      .hide();

    interactive.cursor
      .hideCircle();

    interactive.indicator
      .hide();

  }

};

/* exported ratioCalculationDisplay */
/* global CalculationStepContainer */
/* global fittsColors */

function ratioCalculationDisplay(parent) {
  let container,
    distanceLine,
    widthLine,
    ratioLine,
    publicObject;

  publicObject = {
      update:update
  };

  init();

  return publicObject;

  function init() {

    container = addContainer();
    distanceLine = addDistanceLine();
    widthLine = addWidthLine();
    ratioLine = addRatioLine();

  }

  /* PUBLIC METHODS */
  function update(value) {
    distanceLine
      .update(value.distance);

    widthLine
      .update(value.width);

    ratioLine
      .update(value.ratio);

    return publicObject;

  }


  /* PRVIATE METHODS */
  function addContainer() {
    let container;

    container = new CalculationStepContainer({
      "parent":parent
    });


    return container;
  }


  function addDistanceLine() {
    let line;

    //TODO: CONTAINER DOT SVG IS NOW UNNECESSARY!
    line = container.addLine({
      "where":container.svg,
      "label":"Distance",
      "color":fittsColors().distance,
      "fontFamily":"Oswald",
      "domain":[0,750]
    });

    return line;
  }

  function addRatioLine() {
    let line;

    //TODO: CONTAINER DOT SVG IS NOW UNNECESSARY!
    line = container.addLine({
      "where":container.svg,
      "label":"Ratio",
      "color":fittsColors().ratio,
      "fontFamily":"Oswald",
      "domain":[0,12]
    });

    return line;

  }

  function addWidthLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Width",
      "color":fittsColors().width,
      "fontFamily":"Oswald",
      "domain":[0,750]
    });

    return line;

  }


}

/* exported fittsRatioMouseMove */
/* global d3 */
/* global fittsColors */

function fittsRatioMouseMove(interactive,ratioCalculation) {
  return () => {
    let coordinates,
      colors,
      fittsResults,
      roundedDistance,
      roundedRatio,
      roundedWidth,
      scale;

    interactive.indicator
      .deEmphasize();

    colors = fittsColors();

    scale = interactive
      .getCurrentScale();

    coordinates = {
      "x":(1 / scale) * d3.event.offsetX,
      "y":(1 / scale) * d3.event.offsetY
    };

    interactive.cursor
      .move({
        "x":coordinates.x,
        "y":coordinates.y
      });

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    roundedDistance = fittsResults.distance.toFixed(0);
    roundedWidth = fittsResults.width.toFixed(0);
    roundedRatio = (roundedDistance / roundedWidth).toFixed(2);
    ratioCalculation
      .update({
        "distance":roundedDistance,
        "width":roundedWidth,
        "ratio":roundedRatio
      });

    interactive.tooltip
      .move({
        "x":coordinates.x,
        "y":coordinates.y + 20
      })
      .show();

    interactive.distanceText
      .update("");

    interactive.widthText
      .update("");

    interactive.widthLine
      .move({
        "x1":fittsResults.intersections[0].x,
        "y1":fittsResults.intersections[0].y,
        "x2":fittsResults.intersections[1].x,
        "y2":fittsResults.intersections[1].y
      });

    interactive.distanceLine
      .move({
        "x1":fittsResults.cursorCoordinates.x,
        "y1":fittsResults.cursorCoordinates.y,
        "x2":fittsResults.targetCentroid.x,
        "y2":fittsResults.targetCentroid.y
      });

    interactive.equations.ratio
      .updateRatio(roundedRatio);

  };
}

/* exported fittsRatioMouseOut */
function fittsRatioMouseOut(interactive) {
  return () => {

    interactive.tooltip
      .hide(125);
  };
}

/* exported fittsRatioMouseOver */
function fittsRatioMouseOver(interactive) {
  return () => {

    interactive.tooltip
      .hide(125);
  };
}

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepTargets = function() {
  const interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepTargets",
    "trigger":"fittsStepTargets",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.target
      .show()
      .pulse();

    interactive.targetText
      .show();

    interactive.emailZoom
      .transition()
      .duration(1000)
      .attr("transform","scale(2.5) translate(-500,0)");

    interactive.caption
      .html("The <span style='color:black;font-weight:bold;background-color:"+fittsColors().target+"'>Target</span> is a specific region or object that a user might want to point to.");


  }

  function transitionOut() {

    interactive.targetText
      .hide(125);

    interactive.target
      .hide(125);

    interactive.emailZoom
      .transition()
      .duration(625)
      .attr("transform","scale(1)");

  }

};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global widthCalculationDisplay */
/* global fittsWidthMouseOut */
/* global fittsWidthMouseMove */
/* global fittsWidthMouseOver */
/* global fittsColors */

FittsInteractive.prototype.fittsStepWidth = function() {
  const interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepWidth",
    "trigger":"fittsStepWidth",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    let fittsResults,
      widthCalculation;

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.distanceLine
      .show(250)
      .attr("stroke-dasharray","10,5")
      .attr("stroke-width",1);

    interactive.widthLine
      .show(250);

    interactive.widthText
      .show(250)
      .pulse(750,625);

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    widthCalculation = widthCalculationDisplay(interactive);

    widthCalculation
      .update({
        "width":fittsResults.width.toFixed(0)
      });

    interactive.widthLine
      .move({
        "x1":fittsResults.intersections[0].x,
        "y1":fittsResults.intersections[0].y,
        "x2":fittsResults.intersections[1].x,
        "y2":fittsResults.intersections[1].y
      });

    interactive.widthText
      .update("Width")
      .move({
        "x":fittsResults.targetCentroid.x,
        "y":fittsResults.targetCentroid.y
      });

    interactive.hotspot
      .on('mouseover',fittsWidthMouseOver(interactive))
      .on('mouseout',fittsWidthMouseOut(interactive))
      .on('mousemove',fittsWidthMouseMove(interactive,widthCalculation));

    interactive.cursor
      .showCircle();

    interactive.caption
      .html("The <span style='font-weight:bold; color:"+fittsColors().width+"'>Width</span> is measured by how large the target is <em>relative to the axis of motion</em>.");

    interactive.indicator
      .update("<strong>Interactive</strong>: Try moving your cursor around on the image to see how the <strong>Width</strong> changes based on the Initial Position.")
      .show()
      .emphasize();

    interactive.widthLine
      .attr("stroke-width",5);

    interactive.base
      .desaturated();

  }

  function transitionOut() {

    interactive.widthText
      .hide(125)
      .killPulse();

    interactive.cursor
      .hideCircle();

    interactive.widthLine
      .attr("stroke-width",0);

    interactive.indicator
      .hide();
  }

};


function widthCalculationDisplay(parent) {
  let container,
    publicObject,
    widthLine;

  publicObject = {
      update:update
  };

  init(parent);

  return publicObject;

  function init(parent) {

    container = addContainer();
    widthLine = addWidthLine();

  }

  /* PUBLIC METHODS */
  function update(value) {
    widthLine
      .update(value.width);

  }


  /* PRVIATE METHODS */
  function addContainer() {
    let container;

    container = new CalculationStepContainer({
      "parent":parent
    });

    return container;
  }


  function addWidthLine() {
    let line;

    //TODO: CONTAINER DOT SVG IS NOW UNNECESSARY!
    line = container.addLine({
      "where":container.svg,
      "label":"Width",
      "color":fittsColors().width,
      "domain":[0,750],
      "fontSize":"14pt",
      "fontFamily":"Oswald",
    });

    return line;
  }

}

/* exported fittsWidthMouseMove */
/* global fittsColors */
/* global d3 */
function fittsWidthMouseMove(interactive,widthCalculation) {
  return () => {

    let coordinates,
      colors,
      fittsResults,
      roundedWidth,
      scale;

    interactive.indicator
      .deEmphasize();

    colors = fittsColors();

    scale = interactive
      .getCurrentScale();

    coordinates = {
      "x":(1 / scale) * d3.event.offsetX,
      "y":(1 / scale) * d3.event.offsetY
    };

    interactive.widthText
      .killPulse();

    interactive.cursor
      .move({
        "x":coordinates.x,
        "y":coordinates.y
      });

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    roundedWidth = fittsResults.width.toFixed(0);

    interactive.equations.width
      .updateWidth(roundedWidth);

    interactive.tooltip
      .move({
        "x":coordinates.x,
        "y":coordinates.y + 20
      })
      .show();

    interactive.widthText
      .update("");

    interactive.widthLine
      .move({
        "x1":fittsResults.intersections[0].x,
        "y1":fittsResults.intersections[0].y,
        "x2":fittsResults.intersections[1].x,
        "y2":fittsResults.intersections[1].y
      });

    interactive.distanceLine
      .move({
        "x1":fittsResults.cursorCoordinates.x,
        "y1":fittsResults.cursorCoordinates.y,
        "x2":fittsResults.targetCentroid.x,
        "y2":fittsResults.targetCentroid.y
      });

    widthCalculation
      .update({
        "width":fittsResults.width.toFixed(0),
      });



  };
}

/* exported fittsWidthMouseOut */
function fittsWidthMouseOut(interactive) {
  return () => {

  };
}

/* exported fittsWidthMouseOver */
function fittsWidthMouseOver(interactive) {
  return () => {

    interactive.tooltip
      .show(125);

  };
}

/* global FittsInteractivePrivateConstructor */
/* global FittsEmailBase */
FittsInteractivePrivateConstructor.prototype.addBase = function() {
  let base,
  constructorObject;

  constructorObject = this;

  base = new FittsEmailBase({
    "where":constructorObject.interactive.emailZoom,
  });

  return base;
};

/* global FittsInteractivePrivateConstructor */

FittsInteractivePrivateConstructor.prototype.addBaseClip = function() {
    let clipPath,
      constructorObject;

    constructorObject = this;

    clipPath = constructorObject.interactive.defs
      .append("clipPath")
      .attr("id","svgWindowClip");

    clipPath
      .append("rect")
      .attr("width",800)
      .attr("height",400);

    return clipPath;
};

/* global FittsInteractivePrivateConstructor */
/* global d3 */
FittsInteractivePrivateConstructor.prototype.addCaption = function() {
    let body,
      foreignObject,
      caption;

    foreignObject = this.interactive.rootLayers.caption
      .append("foreignObject")
      .attr("x",0)
      .attr("y",425)
      .attr("width",800)
      .attr("height",200);

    body = foreignObject
      .append("xhtml:body")
      .attr("width","100%")
      .attr("height","100%");


    caption = body
      .append("div")
      .style("width","100%")
      .style("font-size","1.33em")
      .style("padding","0.5em")
      .html("");


    return caption;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
FittsInteractivePrivateConstructor.prototype.addContextMenu = function() {
    let constructorObject,
      text;

    constructorObject = this;

    text = new ExplorableHintedText({
      "where":constructorObject.interactive.layers.contextMenu,
      "fontSize":"32pt",
    })
    .update("CONTEXT MENU");
};

/* global FittsInteractivePrivateConstructor */
/* global FittsCursor */
FittsInteractivePrivateConstructor.prototype.addCursor = function() {
  let constructorObject,
    cursor;

  constructorObject = this;

  cursor = new FittsCursor({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "coordinates":{
      "x":687,
      "y":325
    }
  })
  .hide();

  return cursor;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addCursorText = function() {
  let constructorObject,
   text;

   constructorObject = this;

  text = new ExplorableHintedText({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "foregroundColor":fittsColors().pointer,
    "fontSize":"10pt",
    "fontWeight":"bold",
    "fontFamily":"Oswald"
  });

  return text;
};

/* global FittsInteractivePrivateConstructor */
FittsInteractivePrivateConstructor.prototype.addDefs = function() {
  let constructorObject,
    defs;

  constructorObject = this;

  defs = constructorObject.interactive.svg
    .append("defs");

  return defs;
};

/* global FittsInteractivePrivateConstructor */
/* global explorableLine */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addDistanceLine = function() {
  let constructorObject,
    line;

  constructorObject = this;

  line = explorableLine({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "stroke":fittsColors().distance,
    "strokeWidth":5
  });

  return line;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addDistanceText = function() {
  let constructorObject,
   text;

  constructorObject = this;

  text = new ExplorableHintedText({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "foregroundColor":fittsColors().distance,
    "fontSize":"18pt",
    "fontWeight":"bold",
    "alignmentBaseline":"center",
    "textAnchor":"middle",
    "fontFamily":"Oswald",
  });

  return text;
};

/* global FittsInteractivePrivateConstructor */
/* global explorableGroup */
FittsInteractivePrivateConstructor.prototype.addEmailZoom = function() {
  let group;


  group = explorableGroup({
    "where":this.interactive.layers.email
  });

  return group;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsEquation */
FittsInteractivePrivateConstructor.prototype.addEquations = function() {
  let constructorObject,
    equations;

  constructorObject = this;

  equations = {};

  equations.initial = new FittsEquation({
    "where":"#fittsEquation"
  });

  equations.indexOfDifficulty = new FittsEquation({
    "where":"#fittsEquationIndexOfDifficulty"
  }).highlightIndexOfDifficulty()
  .layout();

  equations.distance = new FittsEquation({
    "where":"#fittsEquationDistance"
  }).updateDistance("Distance")
  .highlightDistance()
  .layout();

  equations.width = new FittsEquation({
    "where":"#fittsEquationWidth"
  }).updateWidth("Width")
  .highlightWidth()
  .layout();

  equations.ratio = new FittsEquation({
    "where":"#fittsEquationRatio"
  }).highlightWidth()
  .highlightDistance()
  .layout();

  equations.logarithn = new FittsEquation({
    "where":"#fittsEquationLogarithm"
  }).highlightLogarithm()
  .layout();

  equations.plusOne = new FittsEquation({
    "where":"#fittsEquationPlusOne"
  }).highlightLogarithm()
    .highlightPlusOne()
    .layout();

  equations.fullEquation = new FittsEquation({
    "where":"#fittsFullEquation"
  }).highlightIndexOfDifficulty()
  .highlightLogarithm()
  .layout();


  return equations;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsExampleTargets */
FittsInteractivePrivateConstructor.prototype.addExampleTargets = function() {
  let constructorObject,
    targets;

  constructorObject = this;

  targets = new FittsExampleTargets({
    "where":constructorObject.interactive.emailZoom
  })
  .hide();

  return targets;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addFittsHeatmap = function() {
  let constructorObject,
    heatmap;

  constructorObject = this;

  heatmap = new ExplorableImage({
    "where":constructorObject.interactive.emailZoom,
    "href":"assets/fittsHeatmap.png",
    "width":800,
    "height":500
  })
  .hide();

  return heatmap;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addHardware = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.hardware,
    "href":"assets/hardware.png",
    "width":800,
    "height":400
  });

  return laptop;
};

/* global FittsInteractivePrivateConstructor */
FittsInteractivePrivateConstructor.prototype.addHotspot = function() {
  let constructorObject,
    hotspot;

  constructorObject = this;

  hotspot = constructorObject.interactive.rootLayers.hotspot
    .append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width",800)
    .attr("height",400)
    .attr("fill","rgba(0,0,0,0)");

  return hotspot;
};

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

/* global FittsInteractivePrivateConstructor */
/* global FittsInteractiveIndicator */
FittsInteractivePrivateConstructor.prototype.addInteractiveIndicator = function() {
  let indicator;

  indicator = new FittsInteractiveIndicator({
    "where":this.interactive.rootNode
  });

  return indicator;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsIntroInteractive */
FittsInteractivePrivateConstructor.prototype.addIntroInteractive = function() {
  const interactive = this.interactive;
  let introInteractive;

  introInteractive = new FittsIntroInteractive({
    "where":interactive.layers.intro
  });

  return introInteractive;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addLaptop = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.email,
    "href":"assets/laptop.png",
    "width":852,
    "height":412
  })
  .hide();

  return laptop;

};

/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addLaptopBottomTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":180,
      "y":328
    },
    "dimensions":{
      "height":1000,
      "width":472
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
FittsInteractivePrivateConstructor.prototype.addLaptopClip = function() {
  let clipPath,
    constructorObject;

  constructorObject = this;

  clipPath = constructorObject.interactive.defs
    .append("clipPath")
    .attr("id","laptopTaskbarClip");

  clipPath
    .append("rect")
    .attr("width",800)
    .attr("height",50)
    .attr("y",277);

  return clipPath;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addLaptopLeftTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":-100,
      "y":35
    },
    "dimensions":{
      "height":293,
      "width":280
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addLaptopRightTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":652,
      "y":35
    },
    "dimensions":{
      "height":293,
      "width":2000
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addLaptopTaskbar = function() {
  const contructor = this;
  let laptop;

  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.email,
    "href":"assets/menubar.png",
    "width":800,
    "height":400
  })
  .hide()
  .move({
    "x":0,
    "y":50
  });

  laptop.image
    .attr("clip-path","url(#laptopTaskbarClip)");

  return laptop;

};

/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addLaptopTopTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":180,
      "y":-465
    },
    "dimensions":{
      "height":500,
      "width":472
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
/* global explorableGroup */

FittsInteractivePrivateConstructor.prototype.addLayers = function(layersToAdd) {
  let constructorObject,
    layers;

  constructorObject = this;

  layers = {};

  layersToAdd.forEach((layerName) => {
    layers[layerName] = explorableGroup({
      "where":constructorObject.interactive.visibleLayer
    })
    // .attr("opacity",0)
    .attr("id",layerName);
  });

  return layers;
};

/* global FittsInteractivePrivateConstructor */
/* global FunctionPlotter */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addLogarithm = function() {
  let constructorObject,
    plot;

  constructorObject = this;

  plot = new FunctionPlotter({
    "where":constructorObject.interactive.layers.logarithm,
    "width":600,
    "height":400,
    "domain":[0,10],
    "range":[0,10],
    "hideGrid":true,
    "x":100,
    "fontFamily":"Oswald"
  })
  .addLine({
    "function":(x) => { return Math.log2(x); },
    "stroke":fittsColors().logarithm,
    "strokeWidth":5,
  })
  .xAxisTitle({
    "string":"Input",
    "fontSize":"18pt",
    "backgroundColor":"#eee"
  })
  .yAxisTitle({
    "string":"Output",
    "fontSize":"18pt",
    "backgroundColor":"#eee"
  })
  .plotTitle({
    "string":"The Binary Logarithm",
    "backgroundColor":"#eee"
  });

  return plot;
};

/* global FittsInteractivePrivateConstructor */
/* global FunctionNumberLinePlotter */
FittsInteractivePrivateConstructor.prototype.addLogarithmNumberLine = function() {
  let constructorObject,
    plot;

  constructorObject = this;

  plot = new FunctionNumberLinePlotter({
      "where":constructorObject.interactive.layers.logarithmNumberLine
  })
  .addFunction((x) => { return Math.log2(x); })
  .addInputAxis({})
  .addInputLabel({
    "string":"Input",
    "fontFamily":"Oswald",
    "fontSize":"18pt",
    "backgroundColor":"#eee"
  })
  .addOutputAxis({})
  .addOutputLabel({
    "string":"Output",
    "fontFamily":"Oswald",
    "fontSize":"18pt",
    "backgroundColor":"#eee"
  })
  .addGrid({
    "lineInterval":0.25,
  });

  return plot;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
FittsInteractivePrivateConstructor.prototype.addMenuBar = function() {
  let constructorObject,
    text;

  constructorObject = this;
  /*
  text = new ExplorableHintedText({
    "where":constructorObject.interactive.layers.menuBar,
    "coordinates":{
      "x":400,
      "y":200
    },
    "fontSize":"32pt",
  })
  .update("MENU BAR");
  */
  return text;
};

/* global FittsInteractivePrivateConstructor */
/* global FunctionNumberLineRegion */
FittsInteractivePrivateConstructor.prototype.addNegativeRegion = function() {
  let constructorObject,
    region;

  constructorObject = this;

  region = new FunctionNumberLineRegion({
    "parent":constructorObject.interactive.logarithmNumberLinePlot,
    "values":[
      0.25,
      1
    ],
    "color":"rgba(255,0,0,0.5)"
  })
  .hide();

  constructorObject.interactive.logarithmNumberLinePlot
    .addHighlightElement(region);

  return region;
};

/* global FittsInteractivePrivateConstructor */
/* global FunctionNumberLineHighlight */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addNumberLineDeltaHighlights = function() {
  let constructorObject,
    highlights;

  constructorObject = this;

  highlights = [];

  highlights.push(addHighlight(1,"#033D00",0));
  highlights.push(addHighlight(2,"#0F7609",500));

  highlights.push({
    "highlight":new FunctionNumberLineHighlight({
      "parent":constructorObject.interactive.logarithmNumberLinePlot,
      "value":6,
      "color":fittsColors().logarithm,
      "outputTextAnchor":"end",
      "outputFontSize":"16pt",
      "inputFontSize":"16pt",
      "significantDigits":2,
      "fontFamily":"Oswald",
      "backgroundColor":"#eee"
    }),
    "duration":1000,
    "delay":1000,
  });


  highlights.push({
    "highlight":new FunctionNumberLineHighlight({
      "parent":constructorObject.interactive.logarithmNumberLinePlot,
      "value":7,
      "color":"#6BC766",
      "inputFontSize":"16pt",
      "outputTextAnchor":"start",
      "outputFontSize":"16pt",
      "significantDigits":2,
      "fontFamily":"Oswald",
      "backgroundColor":"#eee"
    }),
    "duration":1000,
    "delay":1250,
  });


  highlights.forEach((highlight) => {

    constructorObject.interactive.logarithmNumberLinePlot
      .addHighlightElement(highlight.highlight);

    highlight.highlight
      .hide();

  });

  return highlights;

  function addHighlight(value,color,delay) {
    return {
      "highlight":new FunctionNumberLineHighlight({
        "parent":constructorObject.interactive.logarithmNumberLinePlot,
        "value":value,
        "color":color,
        "inputFontSize":"16pt",
        "outputFontSize":"16pt",
        "fontFamily":"Oswald",
        "backgroundColor":"#eee"
      }),
      "duration":1000,
      "delay":delay
    };
  }
};

/* global FittsInteractivePrivateConstructor */
/* global FunctionNumberLineHighlight */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addNumberHighlightOne = function() {
  const constructorObject = this;
  let highlight;


  highlight = new FunctionNumberLineHighlight({
    "parent":constructorObject.interactive.logarithmNumberLinePlot,
    "value":1,
    "color":fittsColors().logarithm,
    "inputFontSize":"16pt",
    "outputFontSize":"16pt",
    "fontFamily":"Oswald",
    "backgroundColor":"#eee"
  })
  .hide();

  constructorObject.interactive.logarithmNumberLinePlot
    .addHighlightElement(highlight);


  return highlight;
};

/* global FittsInteractivePrivateConstructor */
/* global FunctionNumberLineHighlight */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addNumberLineInteractiveHighlight = function() {
  const constructorObject = this;
  let highlight;

  highlight = new FunctionNumberLineHighlight({
    "parent":constructorObject.interactive.logarithmNumberLinePlot,
    "value":1,
    "color":fittsColors().logarithm,
    "inputFontSize":"18pt",
    "outputFontSize":"18pt",
    "fontFamily":"Oswald",
    "backgroundColor":"#eee"
  })
  .hide();

  constructorObject.interactive.logarithmNumberLinePlot
    .addHighlightElement(highlight);

  return highlight;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addPhone = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.phone,
    "href":"assets/phone.png",
    "width":800,
    "height":400
  });

  return laptop;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addPhoneBottomTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":323,
      "y":325
    },
    "dimensions":{
      "height":1000,
      "width":154
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
FittsInteractivePrivateConstructor.prototype.addPhoneClip = function() {
  let clipPath,
    constructorObject;

  constructorObject = this;

  clipPath = constructorObject.interactive.defs
    .append("clipPath")
    .attr("id","phoneClip");

  clipPath
    .append("rect")
    .attr("width",156)
    .attr("height",267)
    .attr("x",320)
    .attr("y",62);

  return clipPath;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addPhoneFittsWiki = function() {
  const contructor = this;
  let menuBar;


  menuBar = new ExplorableImage({
    "where":contructor.interactive.layers.phone,
    "href":"assets/fittsWiki.png",
    "width":800,
    "height":400,
    "x":0,
    "y":0
  })
  .hide();

  menuBar.image
    .attr("clip-path","url(#phoneClip)");

  return menuBar;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addPhoneLeftTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":-100,
      "y":63
    },
    "dimensions":{
      "height":264,
      "width":420
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addPhoneMenuBar = function() {
  const contructor = this;
  let menuBar;


  menuBar = new ExplorableImage({
    "where":contructor.interactive.layers.phone,
    "href":"assets/phoneMenuBar.png",
    "width":800,
    "height":400,
    "x":0,
    "y":325
  });

  menuBar.image
    .attr("clip-path","url(#phoneClip)");

  return menuBar;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addPhoneRightTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":477,
      "y":63
    },
    "dimensions":{
      "height":264,
      "width":1000
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addPhoneScrollTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":320,
      "y":63
    },
    "dimensions":{
      "height":264,
      "width":154
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addPhoneTopTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":323,
      "y":-937
    },
    "dimensions":{
      "height":1000,
      "width":154
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addRatioHeatmap = function() {
  let constructorObject,
    heatmap;

  constructorObject = this;

  heatmap = new ExplorableImage({
    "where":constructorObject.interactive.emailZoom,
    "href":"assets/ratioHeatmap.png"
  })
  .hide();

  return heatmap;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addRemote = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.remote,
    "href":"assets/remote.png",
    "width":800,
    "height":400
  })
  .hide();

  return laptop;

};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addRemoteHeatmap = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.remote,
    "href":"assets/remoteHeatmap.png",
    "width":800,
    "height":400
  })
  .hide();

  return laptop;

};

/* global FittsInteractivePrivateConstructor */
/* global FittsCircleTarget */
FittsInteractivePrivateConstructor.prototype.addRemotePauseTarget = function() {
  const constructorObject = this;

  let target;

  target = new FittsCircleTarget({
    "where":constructorObject.interactive.layers.remote,
    "radius":30,
    "coordinates":{
      "x":400,
      "y":200
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsCircleTarget */
FittsInteractivePrivateConstructor.prototype.addRemoteSelectTarget = function() {
  const constructorObject = this;

  let target;

  target = new FittsCircleTarget({
    "where":constructorObject.interactive.layers.remote,
    "radius":30,
    "coordinates":{
      "x":400,
      "y":88
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addRemoteSideView = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.remoteSideView,
    "href":"assets/sideRemote.png",
    "width":824,
    "height":420
  });

  return laptop;

};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addRemoteWithHand = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.remote,
    "href":"assets/remoteWithHand.png",
    "width":821,
    "height":431
  })
  .hide();

  return laptop;

};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addRemotes = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.remote,
    "href":"assets/twoRemotes.png",
    "width":800,
    "height":400
  })
  .hide();

  return laptop;

};

/* global FittsInteractivePrivateConstructor */
/* global explorableSvg */
FittsInteractivePrivateConstructor.prototype.addRootNode = function() {
  let constructorObject,
    group;

  constructorObject = this;

  group = explorableGroup({
    "where":constructorObject.interactive.svg
  });

  return group;
};

/* global FittsInteractivePrivateConstructor */
FittsInteractivePrivateConstructor.prototype.addSaturationFilter = function() {
  let constructorObject,
    filter,
    saturationMatrix;

  constructorObject = this;

  filter = constructorObject.interactive.defs
    .append("filter")
    .attr("id","saturation");

  saturationMatrix = filter
    .append("feColorMatrix")
    .attr("in","SourceGraphic")
    .attr("type","saturate")
    .attr("values",0);

  return saturationMatrix;
};

/* global FittsInteractivePrivateConstructor */
/* global explorableSvg */
FittsInteractivePrivateConstructor.prototype.addSvg = function() {
  let constructorObject,
    svg;

  constructorObject = this;

  svg = explorableSvg({
    "where":"#fittsInteractive",
    "responsive":true,
    "showOverflow":true
  });

  return svg;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addTarget = function() {
  let constructorObject,
    target;

  constructorObject = this;

  target = new FittsTarget({
    "where":constructorObject.interactive.emailZoom,
    "colors":fittsColors().target,
    "coordinates":{
      "x":625,
      "y":110
    },
    "dimensions":{
      "height":30,
      "width":125
    }
  })
  .hide();

  return target;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addTargetText= function() {
  let constructorObject,
    targetText;

  constructorObject = this;

  targetText = new ExplorableHintedText({
    "where":constructorObject.interactive.emailZoom,
    "foregroundColor":fittsColors().target,
    "backgroundColor":"#333",
    "alignmentBaseline":"text-before-edge",
    "fontSize":"18pt",
    "fontWeight":"bold",
    "fontFamily":"Oswald",
    "coordinates":{
      "x":687,
      "y":80
    }
  })
  .hide()
  .update("Target");

  return targetText;
};

/* global FittsInteractivePrivateConstructor */
/* global FittsThumbIndicator */
FittsInteractivePrivateConstructor.prototype.addThumbIndicator = function() {
  const interactive = this.interactive;
  let indicator;

  indicator = new FittsThumbIndicator({
    "where":interactive.rootLayers.unclipped
  })
  .hide();

  return indicator;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableTooltip */
FittsInteractivePrivateConstructor.prototype.addTooltip = function() {
  // TODO: CONSTRUCTOR OBJECTS AS CONSTANTS, NOT VARIABLES!;
  let constructorObject,
    tooltip;

  constructorObject = this;

  tooltip = new ExplorableTooltip({
    "where":constructorObject.interactive.rootLayers.tooltip
  })
  .update("")
  .move({"x":50,"y":50});

  return tooltip;
};

/* global FittsInteractivePrivateConstructor */
/* global explorableGroup */
FittsInteractivePrivateConstructor.prototype.addVisibleLayer = function() {
  let constructorObject,
    visibleLayer;

  constructorObject = this;

  visibleLayer = explorableGroup({
    "where":constructorObject.interactive.rootNode
  });

  return visibleLayer;
};

/* global FittsInteractivePrivateConstructor */
/* global explorableLine */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addWidthLine = function() {
  let constructorObject,
    line;

  constructorObject = this;

  line = explorableLine({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "stroke":fittsColors().width,
    "strokeWidth":5
  });

  return line;
};

/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addWidthText = function() {
  let constructorObject,
    text;

  constructorObject = this;

  text =  new ExplorableHintedText({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "foregroundColor":fittsColors().width,
    "fontSize":"18pt",
    "fontWeight":"bold",
    "fontFamily":"Oswald"
  });

  return text;
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global binaryLogarithmMouseOut */
/* global binaryLogarithmMouseMove */
/* global binaryLogarithmMouseOver */
/* global fittsColors */
FittsInteractive.prototype.fittsStepBinaryLogarithm = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepBinaryLogarithm",
    "trigger":"fittsStepBinaryLogarithm",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("logarithm");

    interactive
      .removeMouseEvents();

    interactive.logarithmicPlot
      .transitionIn(2000);

    interactive.hotspot
      .on('mouseover',binaryLogarithmMouseOver(interactive))
      .on('mouseout',binaryLogarithmMouseOut(interactive))
      .on('mousemove',binaryLogarithmMouseMove(interactive));

    interactive.caption
      .html("The <span style='font-weight:bold; color:"+fittsColors().logarithm+"'>binary logarithm</span> is a specific <em>mathematical function</em>.");

    interactive.indicator
      .update("<strong>Interactive</strong>: Move your mouse around the function to see how the <strong>input</strong> affects the <strong>output</strong>.")
      .show()
      .emphasize();

    interactive.cursor
      .hide();

  }

  function transitionOut() {

    interactive.indicator
      .hide();

  }
};

/* exported binaryLogarithmMouseMove */
/* global d3 */
function binaryLogarithmMouseMove(interactive) {
  return () => {
    let inputValue,
      outputValue,
      transformedXCoordinate,
      transformedYCoordinate,
      valuesAtCoordinates;

    interactive.indicator
      .deEmphasize();

    transformedXCoordinate = d3.event.offsetX / interactive.getCurrentScale();
    transformedYCoordinate = d3.event.offsetY / interactive.getCurrentScale();

    valuesAtCoordinates = interactive.logarithmicPlot
      .valuesAtMouseCoordinates(
        {
          "x":transformedXCoordinate,
          "y":transformedYCoordinate
        }
      );

    if(!isNaN(interactive.logarithmicPlot.lines[0].functionToPlot(valuesAtCoordinates.x))) {
      inputValue = "Input : " + valuesAtCoordinates.x
        .toFixed(2);

      if(valuesAtCoordinates.x <= 10) {
        interactive.logarithmicPlot.axisTitles.x
          .update(inputValue);

        outputValue = "Output: " + interactive.logarithmicPlot.lines[0]
          .functionToPlot(valuesAtCoordinates.x)
          .toFixed(2);

        interactive.logarithmicPlot.axisTitles.y
          .update(outputValue);

      }


    }


    interactive.logarithmicPlot.lines
      .forEach((line) => {
        line
          .highlightValue(valuesAtCoordinates.x);
      });

  };
}

/* exported binaryLogarithmMouseOut */
function binaryLogarithmMouseOut(interactive) {
  return() => {
    
  };
}

/* exported binaryLogarithmMouseOver */
function binaryLogarithmMouseOver(interactive) {
  return () => {

    interactive.logarithmicPlot.lines
      .forEach((line) => {
        line.valueCircle
          .attr("r",5);
      });

  };
}

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global binaryLogarithmNumberLineMouseOut */
/* global binaryLogarithmNumberLineMouseMove */
/* global binaryLogarithmNumberLineMouseOver */
/* global fittsColors */
FittsInteractive.prototype.fittsStepBinaryLogarithmNumberLine = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepBinaryLogarithmNumberLine",
    "trigger":"fittsStepBinaryLogarithmNumberLine",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("logarithmNumberLine");

    interactive
      .removeMouseEvents();

    interactive
      .tooltip
      .hide(125);

    interactive.logarithmNumberLinePlot
      .transitionIn(500);

    //TODO: SHOULD NOT HAVE TO CALL SHOW _AND_ TRANSITIONIN FOR LINE HIGHLIGHTS
    interactive.numberLineInteractiveHighlight
      .show()
      .transitionIn(1000,1000);


    interactive.caption
      .html("You can visualize <span style='font-weight:bold; color:"+fittsColors().logarithm+"'>log<sub>2</sub></span> as two number lines.");

    interactive.indicator
      .update("<strong>Interactive</strong>: Try moving your cursor around on the chart  to see how the <strong>Input Value</strong> changes the <strong>Output Value</strong>.")
      .show()
      .emphasize();

    interactive.hotspot
      .on('mouseover',binaryLogarithmNumberLineMouseOver(interactive))
      .on('mouseout',binaryLogarithmNumberLineMouseOut(interactive))
      .on('mousemove',binaryLogarithmNumberLineMouseMove(interactive));


  }

  function transitionOut() {

    interactive.numberLineInteractiveHighlight
      .hide();

    interactive.logarithmNumberLinePlot.grid
      .killTransition();

    interactive.logarithmNumberLinePlot.inputAxis
      .killTransition();

    interactive.logarithmNumberLinePlot.outputAxis
      .killTransition();

    interactive.indicator
      .hide();

  }
};

/* exported binaryLogarithmNumberLineMouseMove */
/* global d3 */
function binaryLogarithmNumberLineMouseMove(interactive) {
  return () => {
    let transformedXCoordinate,
      transformedYCoordinate,
      valuesAtCoordinates;

    interactive.indicator
      .deEmphasize();

    transformedXCoordinate = d3.event.offsetX / interactive.getCurrentScale();
    transformedYCoordinate = d3.event.offsetY / interactive.getCurrentScale();

    valuesAtCoordinates = interactive.logarithmNumberLinePlot
      .valuesAtMouseCoordinates({
        "x":transformedXCoordinate,
        "y":transformedYCoordinate
      });

    interactive.numberLineInteractiveHighlight
      .update(valuesAtCoordinates.x);

  };
}

/* exported binaryLogarithmNumberLineMouseOver */
function binaryLogarithmNumberLineMouseOver(interactive) {
  return () => {

  };
}

/* exported binaryLogarithmNumberLineMouseOut */
function binaryLogarithmNumberLineMouseOut(interactive) {
  return () => {

    interactive.numberLineInteractiveHighlight
      .hide();

  };
}

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepBinaryLogarithmNumberLineDeltas = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepBinaryLogarithmNumberLineDeltas",
    "trigger":"fittsStepBinaryLogarithmNumberLineDeltas",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("logarithmNumberLine");

    interactive
      .removeMouseEvents();

    // TODO: WHY ARE REGION AND LINE NOT WORKING PROPERLY?
    interactive.numberLineDeltaHighlights.forEach((highlightObject) => {
      highlightObject.highlight
        .show()
        .transitionIn(highlightObject.duration,highlightObject.delay);
    });

    interactive.caption
      .html("<span style='font-weight:bold; color:"+fittsColors().logarithm+"'>Log<sub>2</sub></span> is a <strong>non-linear</strong> function. Small changes to the input near zero will have a large effect on the output. Small changes to larger inputs will have a much smaller effect on the output.");

    interactive.cursor
      .hide();
  }

  function transitionOut() {

    interactive.numberLineDeltaHighlights.forEach((highlightObject) => {
      highlightObject.highlight
        .hide();
    });

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepBinaryLogarithmNegative = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepBinaryLogarithmNegative",
    "trigger":"fittsStepBinaryLogarithmNegative",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("logarithmNumberLine");

    interactive
      .removeMouseEvents();

    interactive.logarithmNegativeRegion
      .show()
      .transitionIn(2250,1250,true);

    interactive.numberLineHighlightOne
      .show()
      .transitionIn(500,250);

    interactive.caption
      .html("Inputs of less than one will result in <strong>negative values</strong> for  <span style='font-weight:bold; color:"+fittsColors().logarithm+"'>log<sub>2</sub></span>.");

  }

  function transitionOut() {

    interactive.numberLineHighlightOne
      .hide();

    interactive.logarithmNegativeRegion
      .hide();

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepImplicationsMenuBar = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepImplicationsMenuBar",
    "trigger":"fittsStepImplicationsMenuBar",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Applications exist in specific contexts. Here, the application runs in a browser, which runs in an operating system, which is displayed on a laptop.");

    interactive.emailZoom
      .transition()
      .duration(1500)
      .attr("transform","translate(300,75) scale(0.33)");

    interactive.laptop
      .show();


  }

  function transitionOut() {

    interactive.laptopBottomTarget
      .hide();

    interactive.laptopTopTarget
      .hide();

      interactive.emailZoom
        .transition()
        .duration(500)
        .attr("transform","scale(1)");

      // interactive.saturationFilter
        // .attr("values","0");

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global laptopInteractiveMouseOver */
/* global laptopInteractiveMouseOut */
/* global laptopInteractiveMouseMove */
/* global laptopInteractiveCalculationDisplay */
/* global fittsColors */
FittsInteractive.prototype.fittsStepLaptopInteractive = function() {

  const interactive = this;

  let equationCalculation,
    fittsResults;

  return new ExplorableScrollStep({
    "name":"fittsStepLaptopInteractive",
    "trigger":"fittsStepLaptopInteractive",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("");

    interactive.emailZoom
      .transition()
      .duration(0)
      .attr("transform","translate(300,75) scale(0.33)");

    // interactive.saturationFilter
      // .attr("values","1");

      interactive.cursor
        .move({
          "x":525,
          "y":150
        })
        .hideText()
        .show();


    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.laptopBottomTarget,interactive.cursor);

    equationCalculation = laptopInteractiveCalculationDisplay(interactive);

    interactive.widthLine
      .move({
        "x1":fittsResults.intersections[0].x,
        "y1":fittsResults.intersections[0].y,
        "x2":fittsResults.intersections[1].x,
        "y2":fittsResults.intersections[1].y
      });

    interactive.distanceLine
      .move({
        "x1":fittsResults.cursorCoordinates.x,
        "y1":fittsResults.cursorCoordinates.y,
        "x2":fittsResults.targetCentroid.x,
        "y2":fittsResults.targetCentroid.y
      });

    interactive.distanceLine
      .show();

    interactive.laptopBottomTarget
      .show();

    interactive.widthLine
      .show();


    interactive.hotspot
      .on('mouseover',laptopInteractiveMouseOver(interactive))
      .on('mouseout',laptopInteractiveMouseOut(interactive))
      .on('mousemove',laptopInteractiveMouseMove(interactive,equationCalculation));

    interactive.caption
      .html("The <span style='font-weight:bold; color:"+fittsColors().indexOfDifficulty+"'>Index of Difficulty</span> for targets on the edges is very low, regardless of the <span style='font-weight:bold; color:"+fittsColors().pointer+"'>initial pointer position</span>.");

    interactive.indicator
      .update("<strong>Interactive</strong> Move your cursor around to see the full calculation for Fitts' Law.")
      .show()
      .emphasize();

    interactive.laptop
      .show();

  }

  function transitionOut() {

    interactive.laptopBottomTarget
      .hide();

    interactive.laptopTopTarget
      .hide();

    interactive.distanceLine
      .hide();

    interactive.laptopBottomTarget
      .hide();

    interactive.tooltip
      .hide();

    interactive.widthLine
      .hide();

    interactive.emailZoom
      .transition()
      .duration(500)
      .attr("transform","scale(1)");

    interactive.indicator
      .hide();

  }
};

/* exported laptopInteractiveCalculationDisplay */
/* global fittsColors */
/* global CalculationStepContainer */
function laptopInteractiveCalculationDisplay(parent) {
  let container,
    distanceLine,
    indexLine,
    logarithmicPlot,
    widthLine,
    ratioLine,
    ratioPlusOneLine,
    publicObject;

  publicObject = {
      update:update
  };

  init();

  return publicObject;

  function init() {

    container = addContainer();
    distanceLine = addDistanceLine();
    widthLine = addWidthLine();
    ratioLine = addRatioLine();
    ratioPlusOneLine = addRatioPlusOneLine();
    logarithmicPlot = addLogarithmicPlot();
    indexLine = addIndexLine();

  }

  /* PUBLIC METHODS */
  function update(value) {

    distanceLine
      .update(value.distance);

    widthLine
      .update(value.width);

    ratioLine
      .update(value.ratio);

    ratioPlusOneLine
      .update(value.ratioPlusOne);

    logarithmicPlot
      .update(value.ratioPlusOne);

    indexLine
      .update(value.indexOfDifficulty);
  }


  /* PRVIATE METHODS */
  function addContainer() {
    let container;

    container = new CalculationStepContainer({
      "parent":parent
    });

    return container;
  }


  function addDistanceLine() {
    let line;

    //TODO: CONTAINER DOT SVG IS NOW UNNECESSARY!
    line = container.addLine({
      "where":container.svg,
      "label":"Distance",
      "color":fittsColors().distance,
      "fontFamily":"Oswald",
      "domain":[0,1500]
    });

    return line;
  }

  function addIndexLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Index",
      "color":fittsColors().indexOfDifficulty,
      "fontFamily":"Oswald",
      "domain":[0,12]
    });

    return line;
  }

  function addLogarithmicPlot() {
    let plot;

    plot = container.addFunctionNumberLinePlot({
      "where":container.svg,
      "label":"log2",
      "range":[0,5],
      "domain":[0,12],
      "color":fittsColors().logarithm,
      "fontSize":"12pt",
      "lineHeight":30,
      "fontFamily":"Oswald",
      "lineTextColor":fittsColors().indexOfDifficulty,
      "labelText":"log<tspan baseline-shift='sub'>2</tspan>",
      "function":(x) => { return Math.log2(x); },
      "highlightColor":fittsColors().logarithm
    });

    return plot;
  }


  function addRatioLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Ratio",
      "color":fittsColors().ratio,
      "fontFamily":"Oswald",
      "lineHeight":40,
      "domain":[0,12]
    });

    return line;

  }

  function addRatioPlusOneLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Ratio + 1",
      "color":fittsColors().ratio,
      "fontFamily":"Oswald",
      "lineHeight":17,
      "domain":[0,12]
    }).addConstantValue({
      "value":1,
      "color":"black"
    });

    return line;

  }

  function addWidthLine() {
    let line;

    line = container.addLine({
      "where":container.svg,
      "label":"Width",
      "color":fittsColors().width,
      "fontFamily":"Oswald",
      "lineHeight":45,
      "domain":[0,1500]
    });

    return line;

  }


}

/* exported laptopInteractiveMouseMove */
/* global fittsColors */
/* global d3 */

function laptopInteractiveMouseMove(interactive,equationDisplay) {
  return () => {
    let coordinates,
      colors,
      fittsResults,
      roundedDistance,
      roundedIndexOfDifficulty,
      roundedRatio,
      roundedWidth,
      scale;

    interactive.indicator
      .deEmphasize();

    colors = fittsColors();

    scale = interactive
      .getCurrentScale();

    coordinates = {
      "x":(1 / scale) * d3.event.offsetX,
      "y":(1 / scale) * d3.event.offsetY
    };


    if(coordinates.x < 180) { coordinates.x = 180; }
    if(coordinates.x > 650) { coordinates.x = 650; }
    if(coordinates.y < 35) { coordinates.y = 35; }
    if(coordinates.y > 328) { coordinates.y = 328; }


    interactive.cursor
      .move({
        "x":coordinates.x,
        "y":coordinates.y
      });

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.laptopBottomTarget,interactive.cursor);

    roundedDistance = fittsResults.distance.toFixed(0);
    roundedWidth = fittsResults.width.toFixed(0);
    roundedRatio = (roundedDistance / roundedWidth).toFixed(2);
    roundedIndexOfDifficulty = fittsResults.indexOfDifficulty.toFixed(2);

    equationDisplay
      .update({
        "distance":roundedDistance,
        "width":roundedWidth,
        "ratio":(roundedDistance / roundedWidth).toFixed(2),
        "ratioPlusOne":((roundedDistance / roundedWidth) + 1).toFixed(2),
        "indexOfDifficulty":roundedIndexOfDifficulty
      });

    interactive.tooltip
      .move({
        "x":coordinates.x,
        "y":coordinates.y + 20
      })
      .show();

    interactive.distanceText
      .update("");

    interactive.widthText
      .update("");

    interactive.widthLine
      .move({
        "x1":fittsResults.intersections[0].x,
        "y1":fittsResults.intersections[0].y,
        "x2":fittsResults.intersections[1].x,
        "y2":fittsResults.intersections[1].y
      });

    interactive.distanceLine
      .move({
        "x1":fittsResults.cursorCoordinates.x,
        "y1":fittsResults.cursorCoordinates.y,
        "x2":fittsResults.targetCentroid.x,
        "y2":fittsResults.targetCentroid.y
      });

    interactive.equations.fullEquation
      .updateRatio(roundedRatio)
      .updateIndexOfDifficulty(roundedIndexOfDifficulty);

  };

}

/* exported laptopInteractiveMouseOut */
function laptopInteractiveMouseOut(interactive) {
  return () => {

    interactive.tooltip
      .hide();

    return interactive;
  };
}

/* exported laptopInteractiveMouseOver */
function laptopInteractiveMouseOver(interactive) {
  return () => {

    interactive.tooltip
      .show();
      
    return interactive;
  };
}

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepLaptopIntro = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepLaptopIntro",
    "trigger":"fittsStepLaptopIntro",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Making the <strong>Send</strong> button larger is an obvious implication of Fitts' Law.");

    // interactive.saturationFilter
      // .attr("values","1");

    interactive.cursor
      .move({
        "x":525,
        "y":150
      })
      .hide();

    interactive.base
      .saturated();

    interactive.laptop
      .show();

  }

  function transitionOut() {
    interactive.laptop
      .hide();


  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepLaptopPointing = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepLaptopPointing",
    "trigger":"fittsStepLaptopPointing",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Cursors can't extend outside of the edges of the screen, no matter how hard users try.");

    interactive.emailZoom
      .transition()
      .duration(0)
      .attr("transform","translate(300,75) scale(0.33)");

    // interactive.saturationFilter
      // .attr("values","1");

    interactive.cursor
      .laptopAnimation();

    interactive.laptop
      .show();


  }

  function transitionOut() {

    interactive.cursor
      .killLaptopAnimation();

    interactive.laptopBottomTarget
      .hide();

    interactive.laptopTopTarget
      .hide();

      interactive.emailZoom
        .transition()
        .duration(500)
        .attr("transform","scale(1)");

      // interactive.saturationFilter
        // .attr("values","0");

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepLaptopTargets = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepLaptopTargets",
    "trigger":"fittsStepLaptopTargets",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("<span style='font-weight:bold; color:black; background-color:"+fittsColors().target+"'>Targets</span> that touch the edge extend infinitely beyond the monitor.");

    interactive.emailZoom
      .transition()
      .duration(0)
      .attr("transform","translate(300,75) scale(0.33)");

    interactive.laptop
      .show();

    interactive.laptopBottomTarget
      .pulse(1000,1000);

    interactive.laptopTopTarget
      .pulse(1000,1000);

    interactive.laptopLeftTarget
      .pulse(1000,1000);

    interactive.laptopRightTarget
      .pulse(1000,1000);

  }

  function transitionOut() {

    interactive.laptopBottomTarget
      .hide();

    interactive.laptopTopTarget
      .hide();

    interactive.laptopRightTarget
      .hide();

    interactive.laptopLeftTarget
      .hide();

    interactive.emailZoom
      .transition()
      .duration(500)
      .attr("transform","scale(1)");

    // interactive.saturationFilter
      // .attr("values","0");

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global laptopTaskbarAnimation */
FittsInteractive.prototype.fittsStepLaptopTaskbar = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepLaptopTaskbar",
    "trigger":"fittsStepLaptopTaskbar",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Clever designers exploit infinite edge size by triggering important actions on the edges.");

    interactive.emailZoom
      .transition()
      .duration(0)
      .attr("transform","translate(300,75) scale(0.33)");

      interactive.laptop
        .show();

    interactive.cursor
      .move({
        "x":525,
        "y":150
      })
      .hideText()
      .show();


    laptopTaskbarAnimation(interactive);

  }

  function transitionOut() {

    interactive.laptopBottomTarget
      .hide();

    interactive.laptopTopTarget
      .hide();

    interactive.emailZoom
      .transition()
      .duration(500)
      .attr("transform","scale(1)");

    // interactive.saturationFilter
      // .attr("values","0");

    interactive.laptopTaskbar
      .hide();

    interactive.cursor
      .hide();

  }
};

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

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global phoneBrowsingAnimation */
/* global fittsColors */
FittsInteractive.prototype.fittsStepPhoneBrowsing = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepPhoneBrowsing",
    "trigger":"fittsStepPhoneBrowsing",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("phone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("<span style='font-weight:bold; color:black; background-color:"+fittsColors().target+"'>Targets</span> touching the sides of the screen are very easy to access. Designers exploit this fact by using edges to navigate web histories.");

    interactive.phoneFittsWiki
      .show(500);

    phoneBrowsingAnimation(interactive);

    interactive.remote
      .show();

    interactive.remotes
      .hide();

  }

  function transitionOut() {

    interactive.phoneFittsWiki
      .hide();

    interactive.phoneLeftTarget
      .hide(375);

    interactive.phoneRightTarget
      .hide(375);

    interactive.thumbIndicator
      .hide(0,0);

  }
};

/* exported phoneBrowsingAnimation */
function phoneBrowsingAnimation(interactive) {
  const screenImage = interactive.phoneFittsWiki.image;
  const leftTarget = interactive.phoneLeftTarget;
  const rightTarget = interactive.phoneRightTarget;
  const thumbIndicator = interactive.thumbIndicator;

  loopImage();
  leftTarget
    .show();

  rightTarget
    .show();


  function loopImage() {

    screenImage
      .transition()
      .delay(1000)
      .duration(500)
      .attr("x",150)
      .transition()
      .delay(1000)
      .duration(500)
      .attr("x",0)
      .on('end',loopImage);

    thumbIndicator
      .show(500,325)
      .hide(250,1075)
      .show(500,1750)
      .hide(250,2500);

    thumbIndicator
      .move({"x":300,"y":200},0,0)
      .move({"x":350,"y":200},500,875)
      .move({"x":500,"y":200},0,1376)
      .move({"x":450,"y":200},500,2375);


  }

}

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepPhoneIntro = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepPhoneIntro",
    "trigger":"fittsStepPhoneIntro",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("phone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Magic Pixels can also be found on phones.");

    interactive.remote
      .show();

    interactive.remotes
      .hide();

    interactive.phoneBottomTarget
      .pulse(1000,1000);

    interactive.phoneTopTarget
      .pulse(1000,1000);

    interactive.phoneRightTarget
      .pulse(1000,1000);

    interactive.phoneLeftTarget
      .pulse(1000,1000);

  }

  function transitionOut() {
    interactive.phoneBottomTarget
      .hide();

    interactive.phoneTopTarget
      .hide();

    interactive.phoneRightTarget
      .hide();

    interactive.phoneLeftTarget
      .hide();

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsPhoneResolution = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsPhoneResolution",
    "trigger":"fittsPhoneResolution",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("phone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Thumbs and fingers have relatively low <em>resolution</em>, requiring larger targets.");

    interactive.remote
      .show();

    interactive.remotes
      .hide();

    interactive.phoneFittsWiki
      .show();
      

  }

  function transitionOut() {

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global phoneScrollAnimation */
/* global fittsColors */

FittsInteractive.prototype.fittsPhoneScroll = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsPhoneScroll",
    "trigger":"fittsPhoneScroll",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("phone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("The <span style='font-weight:bold; color:black; background-color:"+fittsColors().target+"'>Target</span> for scrolling is typically the entire screen.");

    interactive.remote
      .show();

    interactive.remotes
      .hide();

    interactive.phoneFittsWiki
      .show();

    interactive.phoneScrollTarget
      .show();

    interactive.phoneFittsWiki.image
      .attr("x",0)
      .attr("y",0);

    phoneScrollAnimation(interactive);

  }

  function transitionOut() {

    interactive.thumbIndicator
      .hide(0,0);

    interactive.phoneScrollTarget
      .hide();

  }
};

/* exported phoneScrollAnimation */
function phoneScrollAnimation(interactive) {

  const screenImage = interactive.phoneFittsWiki.image;

  loopScroll();

  function loopScroll() {

    screenImage
      .transition()
      .delay(1250)
      .duration(500)
      .attr("y",-60)
      .transition()
      .delay(1550)
      .duration(500)
      .attr("y",-15)
      .transition()
      .delay(500)
      .on('end',loopScroll);

    interactive.phoneScrollTarget
      .show(0)
      .hide(1250);

    interactive.thumbIndicator
      .move({"x":428,"y":255},0,0)
      .show(500,1000)
      .move({"x":428,"y":195},500,1250)
      .hide(375,2000)
      .move({"x":357,"y":135},0,2375)
      .show(500,2750)
      .move({"x":357,"y":180},625,3250)
      .hide(375,3875);

  }

}

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepPhoneMenuBar = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepPhoneMenuBar",
    "trigger":"fittsStepPhoneMenuBar",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("phone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("<span style='font-weight:bold; color:black; background-color:"+fittsColors().target+"'>Targets</span> touching the bottom of the screen are very easy to access. Designers exploit this by triggering control panels.");

    interactive.phoneBottomTarget
      .show();

    interactive.phoneMenuBar.image
      .transition()
      .duration(1125)
      .attr("y",-4);

    interactive.thumbIndicator
      .move({"x":400,"y":350},0,0)
      .show(0,0)
      .move({"x":400,"y":325},625,125)
      .hide(1000,125);

    interactive.remote
      .show();

    interactive.remotes
      .hide();

  }

  function transitionOut() {

    interactive.phoneMenuBar.image
      .transition()
      .duration(500)
      .attr("y",323);

    interactive.phoneBottomTarget
      .hide(375);

    interactive.thumbIndicator
      .hide();


  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepRemote = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemote",
    "trigger":"fittsStepRemote",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remote");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Physical devices are also subject to Fitts' Law.");

    interactive.remote
      .show();

    interactive.remotes
      .hide();

  }

  function transitionOut() {

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepRemoteHeatmaps = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemoteHeatmaps",
    "trigger":"fittsStepRemoteHeatmaps",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remote");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("The central location of the DVR Controls (<em>image on the right</em>) might make it seem like these buttons are easiest to reach.");

    interactive.remote
      .hide(125);

    interactive.remotes
      .show(250);

    interactive.remoteHeatmap
      .show(500,0.75);

  }

  function transitionOut() {
    interactive.remoteHeatmap
      .hide(250);

    interactive.remotes
      .hide(125);
  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepRemoteTargets = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemoteTargets",
    "trigger":"fittsStepRemoteTargets",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remote");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("With Fitts' Law in mind, the designers of this remote made important buttons larger.");

    interactive.remotePauseTarget
      .pulse();

    interactive.remoteSelectTarget
      .pulse();

    interactive.remote
      .show(250);
  }

  function transitionOut() {

    interactive.remotePauseTarget
      .hide();

    interactive.remoteSelectTarget
      .hide();

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepRemoteWithHand = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemoteWithHand",
    "trigger":"fittsStepRemoteWithHand",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remote");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Users will naturally hold the remote with their thumb directly on top of the Menu buttons. The <span style='font-weight:bold; color:"+fittsColors().distance+"'>Distance</span> is zero, so Fitts' Law tells us that it's infinitely easy to press these buttons.");

    interactive.remote
      .show(250);

    interactive.remotes
      .hide();

    interactive.remoteWithHand
      .show(250);

  }

  function transitionOut() {

    interactive.remoteWithHand
      .hide(125);

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepRemotes = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemotes",
    "trigger":"fittsStepRemotes",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remote");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Physical devices are also bound by Fitts' Law.");

    interactive.remote
      .hide(125);

    interactive.remotes
      .show(250);

  }

  function transitionOut() {

    interactive.remotes
      .hide(125);

  }
};

/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepRemoteSideView = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemoteSideView",
    "trigger":"fittsStepRemoteSideView",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remoteSideView");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("The physical design of this remote affects how it will be held");

  }

  function transitionOut() {

  }
};
