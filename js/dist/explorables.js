/* exported explorableGroup */
// TODO: REFACTOR AS A CONSTRUCTOR
function explorableGroup(options) {
  let group;

  group = options.where
    .append("g");

  return group;
}

/* exported explorableLine */
//TODO: REFACTOR AS A CONSTRUCTOR
function explorableLine(options) {
  let line,
    publicObject,
    stroke,
    strokeDashArray,
    strokeWidth,
    where;

  publicObject = {
    attr:attr,
    hide:hide,
    move:move,
    show:show
  };

  init(options);

  return publicObject;

  /* INITIALIZE */
  function init(options) {

    where = options.where;

    stroke = options.stroke ? options.stroke : "black";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 1;
    strokeDashArray = options.strokeDashArray ? options.strokeDashArray : "1,0";

    line = addLine();


  }

  /* PUBLIC METHODS */
  function attr(key,value) {

    line
      .attr(key,value);

    return publicObject;
  }

  function move(coordinates) {

    line
      .attr("x1",coordinates.x1)
      .attr("x2",coordinates.x2)
      .attr("y1",coordinates.y1)
      .attr("y2",coordinates.y2);

    return publicObject;
  }

  function hide(duration) {

    line
      .transition()
      .duration(duration)
      .attr("opacity",0);

    return publicObject;
  }

  function show(duration) {

    line
      .transition()
      .duration(duration)
      .attr("opacity",1);

    return publicObject;
  }

  /* PRIVATE METHODS */
  function addLine() {
    let line;

    line = where
      .append("line")
      .attr("stroke",stroke)
      .attr("stroke-width",strokeWidth)
      .attr("stroke-dasharray",strokeDashArray)
      .attr("opacity",1);

    return line;
  }

}

/* exported explorableSvg */
/* global d3 */
// TODO: REFACTOR AS A CONSTRUCTOR
function explorableSvg(options) {
  let actualWidth,
    aspectRatio,
    svg;

  svg = d3.select(options.where)
    .append("svg")
    .attr("viewbox","0 0 800 400")
    .attr("preserveAspectRatio","xMinYMin")
    .attr("height",options.height ? options.height : 400)
    .attr("width",options.width ? options.width : 800);


  if(options.responsive) {
    //TODO: This only handles one case (constrainted by width). Add in height or find a better solution
    actualWidth = d3.select(options.where)
      .node()
      .getBoundingClientRect()
      .width;

    aspectRatio = svg.attr("height") / svg.attr("width");

    svg
      .attr("width",actualWidth)
      .attr("height",actualWidth * aspectRatio);
  }

  if(options.showOverflow) {
    svg
      .style("overflow","visible");
  }

  return svg;
}

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

/* exported explorableScroll */
/* global window */
/* global document */
/* global d3 */
function explorableScroll(interactive) {
  let currentlyActiveTrigger,
    scrollHasStarted,
    scroller,
    events,
    triggers,
    scrollOffset;
    // triggers;

  scroller = this;

  init();

  return scroller;

  /* INITALIZE */
  function init() {

    events = [];
    scrollHasStarted = false;
    window.onload = reset;
    window.onresize = reset;
  }

  function getTriggerPositions() {

    triggers = [];

    d3.selectAll(".step")
      .each(function() {
        let scrollStep = d3.select(this).attr("data-scroll-step");

        events.push(interactive[scrollStep]());

        events.forEach((event) => {
          let eventTrigger = event.getTriggerPosition();
          // TODO: SET THE ZERO TRIGGER!
          triggers.push({
            "event":event,
            "triggers":eventTrigger
          });
        });
      });

  }

  function scrollTrigger() {
    let documentElement,
      currentScrollPosition,
      matchedTrigger;

    documentElement = document.documentElement;
    currentScrollPosition = (window.pageYOffset || documentElement.scrollTop) - (document.clientTop || 0) + scrollOffset;

    matchedTrigger = triggers.find((triggerObject) => {
      return triggerObject.triggers.transitionOut > currentScrollPosition;
    });

    if(!currentlyActiveTrigger) {
      currentlyActiveTrigger = triggers[0];
    }

    if(currentlyActiveTrigger !== matchedTrigger) {
      currentlyActiveTrigger.event.transitionOut();
      if(matchedTrigger) {
        currentlyActiveTrigger = matchedTrigger;
        currentlyActiveTrigger.event.transitionIn();
        currentlyActiveTrigger.event.activate();
      }
    }

    if(!scrollHasStarted) {
      currentlyActiveTrigger = matchedTrigger;
      currentlyActiveTrigger.event.transitionIn();
      currentlyActiveTrigger.event.activate();
      scrollHasStarted = true;
    }

  }


  function reset() {

    scrollOffset = 200;

    getTriggerPositions();
    d3.select(window)
      .on('scroll',scrollTrigger);

    scrollTrigger(window.scrollY);
  }

}

/* exported ExplorableTooltip */
function ExplorableTooltip(options) {
  let bodyStyles,
    tooltip,
    where;

  tooltip = this;

  init(options);

  return tooltip;

  /* INITIALIZE */
  function init(options) {
    //TODO: FOLLOW THIS _defaults convention everywhere!
    _required(options);
    _defaults(options);

    tooltip.foreignObject = addForeignObject();
    tooltip.body = addBody();
    tooltip.divContainer = addDivContainer();

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    bodyStyles = options.bodyStyles ? options.bodyStyles : {};
    bodyStyles.backgroundColor = bodyStyles.backgroundColor ? bodyStyles.backgroundColor : "white";
    bodyStyles.border = bodyStyles.border ? bodyStyles.border : "1px solid black";
    bodyStyles.padding = bodyStyles.padding ? bodyStyles.padding : "0.25em";
    tooltip.width = options.width ? options.width : 300;
    //TODO: ACTUALLY EXPLICITLY STATE THIS IN CONSTRUCTOR
    tooltip.bounds = options.bound ? options.bounds : {"minX":0,"minY":140,"maxX":800,"maxY":800};

  }

  function _required() {
    where = options.where;
  }


  /* PRIVATE METHODS */
  function addBody() {
    let body;

    body = tooltip.foreignObject
      .append("xhtml:body")
      .style("padding",bodyStyles.padding)
      .style("background-color","rgba(0,0,0,0)");

    return body;
  }

  function addDivContainer() {
    let container;

    container = tooltip.body
      .append("div")
      .style("background-color",bodyStyles.backgroundColor)
      .style("border-radius","5px")
      .style("box-shadow","2px 2px 5px rgba(0,0,0,0.25)")
      .style("border",bodyStyles.border);



    return container;
  }

  function addForeignObject() {
    let foreignObject;

    foreignObject = where
      .append("foreignObject")
      .attr("display","none")
      .attr("height",tooltip.height)
      .attr("width",tooltip.width);

    return foreignObject;
  }

}

/* exported distanceFormula */
function distanceFormula(coordinatesOne,coordinatesTwo) {
  let xComponent,
    yComponent;

  if(!coordinatesOne) { return false; }
  if(!coordinatesTwo) { return false; }
  xComponent = Math.pow(coordinatesOne.x - coordinatesTwo.x,2);
  yComponent = Math.pow(coordinatesOne.y - coordinatesTwo.y,2);
  return Math.pow(xComponent + yComponent,0.5);
}

/* exported lineAsEquation */
function lineAsEquation(coordinates) {
  let returnObject;

  returnObject = {};
  returnObject.slope = (coordinates.y2 - coordinates.y1) / (coordinates.x2 - coordinates.x1);
  returnObject.intercept = (coordinates.y1 - returnObject.slope * coordinates.x1);
  returnObject.function = (x) => { return returnObject.slope * x + returnObject.intercept;} ;

  if(returnObject.intercept == Infinity || returnObject.intercept == -Infinity) {
    returnObject.vertical = true;
    returnObject.xValue = coordinates.x1;
  }

  if(returnObject.slope == 0) {
    returnObject.horizontal = true;
    returnObject.yValue = coordinates.y1;
  }

  return returnObject;
}

/* exported lineLineIntersectionCoordinates */
function lineLineIntersectionCoordinates(lineOneCoefficients,lineTwoCoefficients) {
  let coordinates;

  coordinates = {};

    coordinates.x = (lineTwoCoefficients.intercept-lineOneCoefficients.intercept) /
      (lineOneCoefficients.slope-lineTwoCoefficients.slope);

    coordinates.y = -(
      lineOneCoefficients.slope *
        ((lineTwoCoefficients.intercept-lineOneCoefficients.intercept) / (lineOneCoefficients.slope-lineTwoCoefficients.slope)) +
        lineOneCoefficients.intercept
    );

    if(lineOneCoefficients.slope == lineTwoCoefficients.slope) {
      // Handle Parallel!
    }

    if(lineOneCoefficients.vertical) {
      coordinates.x = lineOneCoefficients.xValue;
      coordinates.y = lineTwoCoefficients.slope * coordinates.x + lineTwoCoefficients.intercept;
    }


    if(lineOneCoefficients.horizontal) {
      coordinates.y *= -1;
    }
    return coordinates;
}

/* exported lineRectangleIntersection */
/* global lineAsEquation */
/* global lineLineIntersectionCoordinates */
function lineRectangleIntersection(lineEquation,rectangle) {
  let coordinates,
    dimensions,
    edgesAsEquations,
    edgesAsLines,
    intersections,
    intersectionsToReturn,
    vertices;

  coordinates = {
    "x":+rectangle.attr("x"),
    "y":+rectangle.attr("y")
  };

  dimensions = {
    "height":+rectangle.attr("height"),
    "width":+rectangle.attr("width")
  };

  vertices = [
    {"x":coordinates.x,"y":coordinates.y},
    {"x":coordinates.x + dimensions.width,"y":coordinates.y},
    {"x":coordinates.x + dimensions.width,"y":coordinates.y + dimensions.height},
    {"x":coordinates.x,"y":coordinates.y + dimensions.height}
  ];

  edgesAsLines = [
    {"x1":vertices[0].x,"y1":vertices[0].y,"x2":vertices[1].x,"y2":vertices[1].y},
    {"x1":vertices[1].x,"y1":vertices[1].y,"x2":vertices[2].x,"y2":vertices[2].y},
    {"x1":vertices[2].x,"y1":vertices[2].y,"x2":vertices[3].x,"y2":vertices[3].y},
    {"x1":vertices[3].x,"y1":vertices[3].y,"x2":vertices[0].x,"y2":vertices[0].y}
  ];

  edgesAsEquations = [];

  edgesAsLines.forEach((edge) => {
    edgesAsEquations.push(lineAsEquation(edge));
  });

  intersections = [];
  edgesAsEquations.forEach((equation) => {
    intersections.push(lineLineIntersectionCoordinates(equation,lineEquation));
  });

  intersectionsToReturn = [];
  intersections.forEach((intersection) =>{

    if(intersection.x == coordinates.x || intersection.x == coordinates.x + dimensions.width) {
      if(intersection.y >= coordinates.y && intersection.y <= coordinates.y + dimensions.height) {
        intersectionsToReturn.push(intersection);
      }
    }

    if(intersection.y == coordinates.y || intersection.y == coordinates.y + dimensions.height) {
      if(intersection.x >= coordinates.x && intersection.x <= coordinates.x + dimensions.width) {
        intersectionsToReturn.push(intersection);
      }
    }
  });

  return intersectionsToReturn;


}

/* exported midpoint */
function midpoint(pointA,pointB) {
  if(!pointA) { return false; }
  if(!pointB) { return false; }
  
  return {
    "x":(pointA.x + pointB.x) / 2,
    "y":(pointA.y + pointB.y) / 2
  };
}

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

/* exported ExplorableHintedText */
/* global explorableGroup */
function ExplorableHintedText(options) {
  let coordinates,
    text,
    string,
    alignmentBaseline,
    backgroundColor,
    backgroundStroke,
    fontFamily,
    fontWeight,
    fontSize,
    foregroundColor,
    textAnchor,
    where;


  text = this;

  init();

  return text;

  /* INITIALIZE */
  function init() {

    _required();
    _defaults();

    text.group = addGroup();
    text.innerGroup = addInnerGroup();
    text.background = addBackground();
    text.foreground = addForeground();

    text.move(coordinates);

  }


  /* PRIVATE METHODS */
  function _defaults() {
    alignmentBaseline = options.alignmentBaseline ? options.alignmentBaseline : "middle";
    backgroundColor = options.backgroundColor ? options.backgroundColor : "white";
    backgroundStroke = options.backgroundStroke ? options.backgroundStroke : 5;
    foregroundColor = options.foregroundColor ? options.foregroundColor : "black";
    fontSize = options.fontSize ? options.fontSize : "18pt";
    fontWeight = options.fontWeight ? options.fontWeight : "normal";
    textAnchor = options.textAnchor ? options.textAnchor : "middle";
    fontFamily = options.fontFamily ? options.fontFamily : "sans-serif";
    string = options.string ? options.string : "";
    coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
  }

  function _required() {

    where = options.where;

  }

  function addBackground() {
    let background;

    background = addText(text.innerGroup,string);

    background
      .attr("stroke",backgroundColor)
      .attr("stroke-width",backgroundStroke)
      .attr("alignment-baseline",alignmentBaseline)
      .attr("text-anchor",textAnchor)
      .attr("font-weight",fontWeight)
      .attr("font-size",fontSize)
      .attr("font-family",fontFamily)
      .attr("opacity",1);

    return background;
  }

  function addForeground() {
    let foreground;

    foreground = addText(text.innerGroup,string);

    foreground
      .attr("fill",foregroundColor)
      .attr("alignment-baseline",alignmentBaseline)
      .attr("text-anchor",textAnchor)
      .attr("font-weight",fontWeight)
      .attr("font-size",fontSize)
      .attr("font-family",fontFamily)
      .attr("opacity",1);

    return foreground;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addInnerGroup() {
    let innerGroup;

    innerGroup = explorableGroup({
      "where":text.group
    });

    return innerGroup;
  }

  function addText(where,string) {
    let text;

    text = where
      .append("text")
      .attr("x",0)
      .attr("y",0)
      .text(string);

    return text;
  }


}

/* exported CalculationStepContainer */
/* global explorableSvg */
function CalculationStepContainer(options) {
  let step;

  step = this;

  init(options);

  return step;

  /* INTIIALIZE */
  function init(options) {

    _required(options);

    addContainer(options.parent.tooltip);

    step.svg = addSvg();

  }

  function _required(options) {
    step.lines = [];
    step.parent = options.parent;
    step.width = 300;
  }

  /* PRIVATE METHODS */
  function addContainer(tooltip) {

    tooltip
      .update("<div id='fittsCalculationDisplay'>");

  }

  function addSvg() {
    let svg;

    svg = explorableSvg({
      "where": "#fittsCalculationDisplay",
      "width": step.width,
      "height": 120,
    });

    return svg;
  }


}

/* exported CalculationStepDivisionLine */
/* global CalculationStepLinearDivisionIndicator */
/* global EquationDisplay */
/* global d3 */
/* global explorableGroup */
function CalculationStepDivisionLine(options) {
  let colors,
    domain,
    fontSize,
    divisionLine,
    where;

  divisionLine = this;

  init(options);

  return divisionLine;

  /* INTIIALIZE */
  function init(options) {

    _required();
    _defaults(options);

    divisionLine.group = addGroup();
    divisionLine.columns = addColumns();
    divisionLine.scale = defineScale();
    divisionLine.label = addLabel();
    divisionLine.bar = addBar();


  }


  /* PRIVATE METHODS */
  function _defaults(options) {

    colors = options.colors ? options.colors : {"numerator":"black","denominator":"black","bar":"black"};
    fontSize = options.fontSize ? options.fontSize : "12pt";

  }

  function _required() {

    domain = options.domain;
    where = options.where;

  }

  function addBar() {
    let bar;

    bar = new CalculationStepLinearDivisionIndicator({
      "scale":divisionLine.scale,
      "where":divisionLine.columns.middle,
      "colors":colors
    });

    return bar;
  }

  function addColumns() {
    let columnGroup;

    columnGroup = {};

    //TODO: DONT HARDCODE THE TRANSLATE VALUES HERE!
    columnGroup.left = explorableGroup({
      "where":divisionLine.group
    })
    .attr("transform","translate(0,25)");
    columnGroup.middle = explorableGroup({
      "where":divisionLine.group
    })
    .attr("transform","translate(100,25)");

    return columnGroup;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addLabel() {
    let equation;

    equation = new EquationDisplay({
      "where":divisionLine.columns.left,
      "coordinates":{
        "x":90,
        "y":0
      }
    });

    return equation;
  }


  function defineScale() {
    let scale;

    //TODO: DONT HARD CODE DOMAIN AND RANGE
    scale = d3.scaleLinear()
      .domain(domain)
      .range([0,100]);

    return scale;
  }


}

/* exported CalculationStepLine */
/* global explorableGroup */
/* global ExplorableHintedText */
/* global CalculationStepLinearIndicator */
/* global d3 */

function CalculationStepLine(options) {
  // TODO: CLEAN ALL OF THIS CODE
  // TODO: GET RID OF CONSTANT COLUMN POSITIONS

  const leftColumnPosition = 100;
  const middleColumnPosition = 100;

  let barHeight,
    color,
    domain,
    fontFamily,
    fontSize,
    labelText,
    line,
    scale,
    where;

  line = this;

  init(options);

  return line;

  /* INTIIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    scale = defineScale();

    line.group = addGroup();
    line.columns = addColumns();

    line.label = addLabel()
      .update(labelText);

    line.bar = addBar();

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    barHeight = options.barHeight ? options.barHeight : 10;
    color = options.color ? options.color : "black";
    fontSize = options.fontSize ? options.fontSize : "15pt";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    labelText = options.label ? options.label +" =" : "=";
    domain = options.domain ? options.domain : [0,1];
    line.lineHeight = options.lineHeight ? options.lineHeight : 25;

  }

  function _required(options) {

    where = options.where;

  }

  function addBar() {
    let bar;

    bar = new CalculationStepLinearIndicator({
      "where":line.columns.middle,
      "color":color,
      "scale":scale,
      "fontSize":fontSize,
      "fontFamily":fontFamily,
      "height":barHeight
    });

    return bar;
  }

  function addColumns() {
    let groupObject;

    groupObject = {};

    groupObject.left = explorableGroup({
      "where":line.group,
    }).attr("transform","translate("+leftColumnPosition+",0)");


    groupObject.middle = explorableGroup({
      "where":line.group,
    }).attr("transform","translate("+middleColumnPosition+",0)");


    return groupObject;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    })
    .attr("transform","translate(0,50)");

    return group;
  }


  function addLabel() {
    let label;

    // TODO: DOES COLUMNS REALLY NEED TO BE PUBLIC?
    label = new ExplorableHintedText({
      "where":line.columns.left,
      "textAnchor":"end",
      "foregroundColor":color,
      "fontFamily":fontFamily,
      "fontWeight":"normal",
      "fontSize":fontSize
    })
    .move({
      "x":-5,
      "y":0
    });

    return label;
  }


  function defineScale() {
    let scale;

    //TODO: DONT HARD CODE DOMAIN AND RANGE
    scale = d3.scaleLinear()
      .domain(domain)
      .range([0,100]);

    return scale;
  }

}

/* exported CalculationStepLinearDivisionIndicator */
/* global explorableGroup */
/* global ExplorableHintedText */
function CalculationStepLinearDivisionIndicator(options) {
  let colors,
    fontSize,
    height,
    indicator,
    where;

  indicator = this;

  init(options);

  return indicator;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    indicator.barGroup = addBarGroup();
    indicator.barHint = addBarHint();

    indicator.numerator = addNumerator();
    indicator.denominator = addDenominator();

    indicator.text = addText();
    indicator.denominatorPathGenerator = denominatorPathGenerator;
    indicator.numeratorPathGenerator = numeratorPathGenerator;


  }


  /* PRIVATE METHODS */
  function _defaults(options) {

    height = options.height ? options.height : 10;
    fontSize = options.fontSize ? options.fontSize : "12pt";

  }

  function _required(options) {

    where = options.where;
    indicator.scale = options.scale;
    colors = options.colors;

  }

  function addBarGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addBarHint() {
    let hint;

    hint = where
      .append("rect")
      .attr("x",0)
      .attr("y",-height / 2)
      .attr("width",indicator.scale.range()[1])
      .attr("height",height)
      .attr("fill","none")
      .attr("stroke","#aaa")
      .attr("stroke-width",1);

    return hint;
  }

  function addDenominator() {
    let shape;

    // TODO: THIS CAN BE FURTHER SIMPLIFIED INTO A TRIANGLE MAKER!
    shape = where
      .append("path")
      .attr("d",denominatorPathGenerator(indicator.scale.range()[1]))
      .attr("fill",colors.denominator);

    return shape;
  }

  function addNumerator() {
    let shape;

    shape = where
      .append("path")
      .attr("d",numeratorPathGenerator(indicator.scale.range()[1]))
      .attr("fill",colors.numerator);

    return shape;
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":where,
      "fontSize":fontSize,
      "fontWeight":"bold",
      "foregroundColor":colors.bar,
      "coordinates":{
        "x":indicator.scale.range()[1],
        "y":0
      }
    })
    .update("0");

    return text;
  }

  function denominatorPathGenerator(value) {
    let path,
      points;

    points = makePoints(value);

    path = "M "+points.bottomLeft+" " + points.topRight +" " + points.bottomRight + " Z";

    return path;
  }

  function numeratorPathGenerator(value) {
    let path,
      points;

    points = makePoints(value);

    path = "M "+points.topLeft+" " + points.topRight +" " + points.bottomLeft + " Z";

    return path;
  }


  function makePoints(maxWidth) {
    let points;

    points = {};
    points.topLeft = "0," + (-height / 2);
    points.bottomLeft = "0," + (height / 2);
    points.topRight = maxWidth + "," + (-height / 2);
    points.bottomRight = maxWidth + "," + (height / 2);

    return points;
  }


}

/* exported CalculationStepLinearIndicator */
/* global ExplorableHintedText */
function CalculationStepLinearIndicator(options) {
  let barHeight,
    color,
    fontFamily,
    fontSize,
    height,
    indicator,
    where;

  indicator = this;

  init(options);

  return indicator;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);


    indicator.bar = addBar();
    indicator.barHint = addBarHint();
    indicator.text = addText();

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    barHeight = options.barHeight ? options.barHeight : 8;
    color = options.color ? options.color : "black";
    height = options.height ? options.height : 5;
    fontSize = options.fontSize ? options.fontSize : "12pt";
    fontFamily = options.fontFamily ? options.fontFamily : "";

    // TODO: THIS IS SLOPPY AND TEMPORARY
    indicator.barHeight = barHeight;


  }

  function _required(options) {

    indicator.scale = options.scale;
    where = options.where;

  }

  function addBar() {
    let bar;

    bar = where
      .append("rect")
      .attr("x",0)
      .attr("y",-height / 2)
      .attr("height",height)
      .attr("fill",color);

    return bar;
  }

  function addBarHint() {
    let hint;

    hint = where
      .append("rect")
      .attr("x",0)
      .attr("y",-height / 2)
      .attr("width",indicator.scale.range()[1])
      .attr("height",height)
      .attr("fill","none")
      .attr("stroke","#aaa")
      .attr("stroke-width",1);

    return hint;
  }

  function addText() {
    let text;
    
    text = new ExplorableHintedText({
      "where":where,
      "foregroundColor":color,
      "textAnchor":"start",
      "alignmentBaseline":"middle",
      "fontFamily":fontFamily,
      "fontSize":fontSize,
      "fontWeight":"bold"
    })
    .move({
      "x":0,
      "y":0
    });

    return text;
  }

}

/* exported CalculationStepNumberLinePlot */
/* global explorableGroup */
/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineHighlight */
/* global fittsColors */
/* global ExplorableHintedText */
function CalculationStepNumberLinePlot(options) {
  let color,
    fontFamily,
    fontSize,
    functionToPlot,
    labelText,
    linePlot,
    where;

  linePlot = this;

  init(options);

  return linePlot;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);
    linePlot.group = addGroup();
    linePlot.columns = addColumns();
    linePlot.label = addLabel()
      .update(labelText);

    linePlot.plot = addPlot();
    linePlot.highlight = addHighlight();
    // TODO: ADD THE LABEL HERE!

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    color = options.color ? options.color : "black";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    fontSize = options.fontSize ? options.fontSize : "15pt";
    labelText = options.labelText ? options.labelText : "";
    linePlot.lineHeight = options.lineHeight ? options.lineHeight : 35;

  }

  function _required(options) {

    where = options.where;
    functionToPlot = options.function;

  }


  function addColumns() {
    let groupObject;

    groupObject = {};

    groupObject.left = explorableGroup({
      "where":linePlot.group,
    }).attr("transform","translate(90,10)");


    groupObject.middle = explorableGroup({
      "where":linePlot.group,
    }).attr("transform","translate(90,0)");


    return groupObject;

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addHighlight() {
    let highlight;

    // TODO: PASS ONLY A COLOR, NOT AN EXPLICIT REFERENCE TO FITTS COLORS!
    highlight = new FunctionNumberLineHighlight({
      "parent":linePlot.plot,
      "value":1,
      "color":fittsColors().logarithm,
      "outputTextAnchor":"end",
      "inputFontSize":"0",
      "outputFontSize":"0pt",
      "significantDigits":2
    });
    return highlight;
  }

  function addLabel() {
    let label;

    label = new ExplorableHintedText({
      "where":linePlot.columns.left,
      "textAnchor":"end",
      "alignmentBaseline":"center",
      "foregroundColor":color,
      "fontFamily":fontFamily,
      "fontWeight":"bold",
      "fontSize":fontSize
    })
    .move({
      "x":-5,
      "y":0
    });

    return label;
  }

  function addPlot() {
    let plot;

    plot = new FunctionNumberLinePlotter({
      "where":linePlot.columns.middle,
      "coordinates":{
        "x":0,
        "y":-25
      },
      "width":100,
      "height":50,
      "axisTickCounts":1,
      "color":color,
      "margins":{
        "top":15,
        "bottom":0,
        "left":0,
        "right":0
      }
    })
    .addFunction(functionToPlot)
    .addGrid({});

    return plot;
  }
}

/* exported CalculationStepPlot */
/* global explorableGroup */
/* global ExplorableHintedText */
/* global functionPlotter */
function CalculationStepPlot(options) {

  //TODO: DONT HARDCODE THESE VALUES
  const leftColumnPosition = 100;
  const middleColumnPosition = 100;

  let columns,
    color,
    stepPlot,
    domain,
    range,
    height,
    width,
    where,
    functionToPlot,
    lineTextColor;

  stepPlot = {};

  init(options);

  return stepPlot;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    stepPlot.group = addGroup();
    stepPlot.columns = addColumns();
    stepPlot.plot = addPlot();
    stepPlot.label = addLabel();

  }



  /* PRIVATE METHODS */
  function _required(options) {

    where = options.where;

  }

  function _defaults() {

    width = options.width ? options.width : 100;
    height = options.height ? options.height : 70;
    domain = options.domain ? options.domain : [0,10];
    range = options.range ? options.range : [0,10];
    color = options.color ? options.color : "black";
    lineTextColor = options.lineTextColor ? options.lineTextColor : "black";
    functionToPlot = options.function ? options.function : (x) => { return x; };

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addColumns() {
    let groupObject;

    groupObject = {};

    groupObject.left = explorableGroup({
      "where":stepPlot.group,
    }).attr("transform","translate("+leftColumnPosition+",0)");


    groupObject.middle = explorableGroup({
      "where":stepPlot.group,
    }).attr("transform","translate("+middleColumnPosition+",0)");


    return groupObject;
  }

  function addLabel() {
    let label;

    label = new ExplorableHintedText({
      "where":columns.left,
      "textAnchor":"end",
      "foregroundColor":lineTextColor,
      "fontWeight":"bold",
      "fontSize":"10pt"
    })
    .move({
      "x":-5,
      "y":height / 2
    })
    .update("ID =");

    return label;
  }

  function addPlot() {
    let plot;

    plot = functionPlotter({
      "where":columns.middle,
      "width":width,
      "height":height,
      "domain":domain,
      "range":range,
      "hideGrid":true,
      "margins":{
        "left":0,
        "top":0,
        "right":0,
        "bottom":10
      },
      "circleRadius":2,
      "axisTicks":{
        "x":0,
        "y":0
      }
    })
    .addLine({
      "function":functionToPlot,
      "stroke":color,
      "textColor":lineTextColor,
      "strokeWidth":3,
    });

    return plot;
  }
}

/* exported FunctionNumberLineAxis */
/* global explorableGroup */
/* global d3 */
function FunctionNumberLineAxis(options) {
  let axis,
    axisDefinition,
    axisLocation,
    axisType,
    coordinates,
    parent,
    tickCount;

  axis = this;

  init(options);

  return axis;

  /* INITIALIZER */
  function init(options) {

    _required(options);
    _defaults(options);

    axis.group = addGroup();
    axisDefinition = defineAxis();

    applyAxisToGroup();
  }


  /* PRIVATE METHODS */
  function _required(options) {

    parent = options.parent;
    axisLocation = options.axisLocation;
    axisType = switchAxisType();
    coordinates = switchAxisCoordinates();

  }

  function _defaults(options) {

    tickCount = options.tickCount ? options.tickCount : 1;

  }


  function addGroup() {
    let group;

    group = explorableGroup({
      "where":parent.layers.axes
    });

    return group;
  }

  function applyAxisToGroup() {

    axis.group
      .call(axisDefinition)
      .attr("transform","translate("+coordinates.x+","+coordinates.y+")")
      .attr("font-size","14pt");

  }

  function defineAxis() {
    let axisDefinition;


    axisDefinition = axisType(parent.scale)
      .ticks(tickCount);

    return axisDefinition;
  }

  function switchAxisCoordinates() {
    switch(axisLocation) {
      case "top":
        return {
          "x":parent.scale.range()[0],
          "y":parent.inputY
        };
      case "bottom":
        return {
          "x":parent.scale.range()[0],
          "y":parent.outputY
        };
    }
  }

  function switchAxisType() {
    switch(axisLocation) {
      case "top":
        return d3.axisTop;
      case "bottom":
        return d3.axisBottom;
    }
  }




}

/* exported FunctionNumberLineAxisLabel */
/* global ExplorableHintedText */
function FunctionNumberLineAxisLabel(options) {
  let alignmentBaseline,
    backgroundColor,
    color,
    coordinates,
    fontFamily,
    fontSize,
    fontWeight,
    label,
    location,
    parent,
    string,
    text,
    where;

  label = this;

  init(options);

  return label;

  /* INITIALIZER */
  function init(options) {

    _required(options);
    _defaults(options);

    text = addText();

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    color = options.color ? options.color : "black";
    backgroundColor = options.backgroundColor ? options.backgroundColor : "white";
    fontSize = options.fontSize ? options.fontSize : "12pt";
    fontWeight = options.fontWeight ? options.fontWeight : "bold";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    string = options.string ? options.string : "";

  }

  function _required(options) {

    where = options.where;
    parent = options.parent;
    location = options.location;
    alignmentBaseline = switchAlignmentBaseline();
    coordinates = switchCoordinates();
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":parent.group,
      "coordinates":coordinates,
      "alignmentBaseline":alignmentBaseline,
      "foregroundColor":color,
      "fontSize":fontSize,
      "fontWeight":fontWeight,
      "fontFamily":fontFamily,
      "backgroundColor":backgroundColor
    })
    .update(string);

  }

  function switchAlignmentBaseline() {

    switch(location) {
      case "top":
        return "text-after-edge";
      case "bottom":
        return "text-before-edge";
    }

  }

  function switchCoordinates() {

    switch(location) {
      case "top":
        return {
          "x":parent.width / 2,
          "y":0
        };
      case "bottom":
        return {
          "x":parent.width / 2,
          "y":parent.height
        };
    }

  }
}

/* exported FunctionNumberLineGrid */
/* global explorableGroup */
/* global d3 */
function FunctionNumberLineGrid(options) {
  let grid,
    lineInterval,
    strokeWidth,
    stroke,
    group,
    where;

  grid = this;

  init(options);

  return grid;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    group = addGroup();
    grid.gridLines = addgridLines();
    grid.hasTransitioned = false;

  }



  /* PRIVATE METHODS */
  function _defaults(options) {

    lineInterval = options.lineInterval ? options.lineInterval : 1;
    stroke = options.stroke ? options.stroke : "rgba(0,0,0,0.25)";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 1;

  }

  function _required(options) {

    grid.hasTransitioned = false;
    grid.parent = options.parent;
    grid.functionToPlot = grid.parent.functionToPlot;
    grid.inputY = grid.parent.inputY;
    grid.outputY = grid.parent.outputY;
    grid.scale = grid.parent.scale;

    where = grid.parent.layers.data;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addgridLines() {
    let data,
      finiteData,
      lines;

    data = d3.range(grid.scale.domain()[0],grid.scale.domain()[1] + lineInterval,lineInterval);

    finiteData = data.filter(validateDatum);

    lines = group
      .selectAll("line")
      .data(finiteData)
      .enter()
      .append("line")
      .attr("x1",(datum) => { return grid.scale(datum); })
      .attr("x2",(datum) => { return grid.scale(grid.functionToPlot(datum)); })
      .attr("y1",grid.inputY)
      .attr("y2",grid.outputY)
      .attr("stroke",stroke)
      .attr("stroke-width",strokeWidth);

    return lines;
  }

  function validateDatum(datum) {
    let acceptable,
      functionValue;

    functionValue = grid
      .functionToPlot(datum);

    acceptable = true;

    if(!isFinite(functionValue)) { acceptable = false; }
    if(functionValue < grid.scale.domain()[0]) { acceptable = false; }
    if(functionValue > grid.scale.domain()[1]) { acceptable = false; }

    return acceptable;
  }

}

/* exported FunctionNumberLineHighlight */
/* global ExplorableHintedText */
function FunctionNumberLineHighlight(options) {
  let backgroundColor,
    color,
    fontFamily,
    highlight,
    inputFontSize,
    outputFontSize,
    outputTextAnchor,
    outputValue,
    significantDigits,
    strokeWidth;

  highlight = this;

  init(options);

  return highlight;

  /* INITIALZE */
  function init(options) {

    _required(options);
    _defaults(options);

    highlight.line = addLine();
    highlight.inputText = addInputText();
    highlight.outputText = addOutputText();

  }


  /* PRIVATE METHODS */
  function _defaults(options) {

    color = options.color ? options.color : "black";
    backgroundColor = options.backgroundColor ? options.backgroundColor : "white";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    inputFontSize = options.inputFontSize ? options.inputFontSize : "14pt";
    outputTextAnchor = options.outputTextAnchor ? options.outputTextAnchor : "middle";
    outputFontSize = options.outputFontSize ? options.outputFontSize : "14pt";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 3;
    significantDigits = options.significantDigits ? options.significantDigits : 0;
    outputValue = highlight.parent.functionToPlot(highlight.value).toFixed(significantDigits);
  }

  function _required(options) {

    highlight.parent = options.parent;
    highlight.value = options.value;
    highlight.hasTransitioned = false;

  }

  function addLine() {
    let line;

    //TODO MOVE COORDINATES TO DEFINE COORDINATES
    highlight.coordinates = highlight.parent
      .lineCoordinatesForValue(highlight.value);

    line = highlight.parent.layers.highlights
      .append("line")
      .attr("x1",highlight.coordinates.x1)
      .attr("x2",highlight.coordinates.x2)
      .attr("y1",highlight.coordinates.y1)
      .attr("y2",highlight.coordinates.y2)
      .attr("stroke",color)
      .attr("stroke-width",strokeWidth);

    return line;
  }

  function addInputText() {
    let text;

    text = new ExplorableHintedText({
      "where":highlight.parent.layers.highlights,
      "coordinates":{
        "x":highlight.coordinates.x1,
        "y":highlight.parent.inputY
      },
      "fontWeight":"bold",
      "backgroundColor":backgroundColor,
      "foregroundColor":color,
      "fontSize":inputFontSize,
      "fontFamily":fontFamily
    })
    .update(highlight.value);

    return text;
  }

  function addOutputText() {
    let text;

    text = new ExplorableHintedText({
      "where":highlight.parent.layers.highlights,
      "coordinates":{
        "x":highlight.parent.scale(outputValue),
        "y":highlight.parent.outputY
      },
      "fontWeight":"bold",
      "backgroundColor":backgroundColor,
      "foregroundColor":color,
      "textAnchor":outputTextAnchor,
      "fontSize":outputFontSize,
      "fontFamily":fontFamily
    })
    .update(outputValue);

    return text;
  }




}

/* exported FunctionNumberLineRegion */
/* global d3 */
/* global exporableGroup */
function FunctionNumberLineRegion(options) {
  let color,
    parent,
    region,
    values;

  region = this;

  init(options);

  return region;

  function init(options) {
    _required(options);
    _defaults(options);

    region.coordinates = getCoordinates();
    region.lineGenerator = defineLineGenerator();
    region.group = addGroup();
    region.path = addPath();

  }

  /* PRIVATE */
  function _defaults(options) {

    color = options.color ? options.color : "white";

  }

  function _required(options) {

    parent = options.parent;
    values = options.values;

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":parent.layers.highlights
    });

    return group;
  }

  function addPath() {
    let path;

    path = region.group
      .append("path")
      .attr("d",region.lineGenerator(region.coordinates))
      .attr("fill",color);

    return path;
  }

  function getCoordinates() {
    let coordinates,
      firstCorners,
      secondCorners;

    //TODO: THIS IS GROSS AND NEEDS A BETTER SOLUTION!

    firstCorners = parent
      .lineCoordinatesForValue(values[0]);

    secondCorners = parent
      .lineCoordinatesForValue(values[1]);

    coordinates = [];
    coordinates[0] = {
      "x":firstCorners.x1,
      "y":firstCorners.y1
    };

    coordinates[1] = {
      "x":firstCorners.x2,
      "y":firstCorners.y2
    };

    coordinates[2] = {
      "x":secondCorners.x2,
      "y":secondCorners.y2
    };

    coordinates[3] = {
      "x":secondCorners.x1,
      "y":secondCorners.y1
    };

    return coordinates;
  }

  function defineLineGenerator() {
    let generator;

    generator = d3.line()
      .x((datum) => { return datum.x; })
      .y((datum) => { return datum.y ;});

    return generator;
  }


}

/* exported FunctionNumberLinePlotter */
/* global explorableGroup */
/* global d3 */
function FunctionNumberLinePlotter(options) {
  let domain,
    highlightColor,
    plotter,
    where;

  plotter = this;

  init(options);

  return plotter;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    plotter.scale = defineScale();
    plotter.group = addGroup();
    plotter.layers = addLayers();
    plotter.highlightElements = [];


  }



  /* PRIVATE METHODS */
  function _defaults() {

    //TODO: COORDINATES RIGHT NOW ARE FOR convenience. SHOULD BE (0,0) !
    plotter.coordinates = options.coordinates ? options.coordinates : {"x":150,"y":125};
    domain = options.domain ? options.domain : [-2,12];
    highlightColor = options.color ? options.color : "black";

    plotter.margins = options.margins ? options.margins : {"top":30,"bottom":30};

    plotter.width = options.width ? options.width : 500;
    plotter.height = options.height ? options.height : 200;

    plotter.inputY = plotter.margins.top;
    plotter.outputY = plotter.height - plotter.margins.bottom;


  }

  function _required(options) {

    where = options.where;

  }


  function addLayers() {
    let layers;

    layers = {};

    layers.axes = explorableGroup({
      "where":plotter.group
    });

    layers.data = explorableGroup({
      "where":plotter.group
    });

    layers.highlights = explorableGroup({
      "where":plotter.group
    });

    return layers;
  }


  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    })
    .attr("transform","translate("+plotter.coordinates.x+","+plotter.coordinates.y+")");

    return group;
  }


  function defineScale() {
    let scale;

    scale = d3.scaleLinear()
      .domain(domain)
      .range([0,plotter.width]);

    return scale;
  }


}

/* exported EquationDisplay */
/* global explorableGroup */

// TODO: REVIEW IF ANCHOR HORIZONTAL AND ANCHOR VERTICAL ARE ACTUALLY USED HERE
function EquationDisplay(options) {
  let anchorHorizontal,
    anchorVertical,
    coordinates,
    display,
    where;

  display = this;

  init(options);

  return display;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);
    display.group = addGroup();
    display.innerGroup = addInnerGroup();

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    anchorHorizontal = options.anchorHorizontal ? options.anchorHorizontal : "middle";
    anchorVertical = options.anchorVertical ? options.anchorVertical : "middle";
    coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    display.termPadding = options.termPadding ? options.termPadding : 3;

    display.terms = [];

  }

  function _required() {

    where = options.where;

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    })
    .attr("transform","translate("+coordinates.x+","+coordinates.y+")");

    return group;
  }

  function addInnerGroup() {
    let innerGroup;

    innerGroup = explorableGroup({
      "where":display.group
    });

    return innerGroup;
  }


}

/* exported EquationDisplayTerm */
/* global explorableGroup */
/* global ExplorableHintedText */
function EquationDisplayTerm(options) {
  let color,
    fontFamily,
    fontSize,
    fontWeight,
    displayTerm,
    string,
    where;

  displayTerm = this;

  init(options);

  return displayTerm;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);
    displayTerm.outerGroup = addGroup();
    displayTerm.innerGroup = addInnerGroup();
    displayTerm.text = addText();

    displayTerm.animateHighlightColor = displayTerm.text.animateHighlightColor;

  }


  /* PRIVATE METHODS */
  function _defaults(options) {

    displayTerm.anchorHorizontal = options.anchorHorizontal ? options.anchorHorizontal : "end";
    displayTerm.anchorVertical = options.anchorVertical ? options.anchorVertical : "middle";
    color = options.color ? options.color : "black";
    displayTerm.coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    fontSize = options.fontSize ? options.fontSize : "12pt";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    fontWeight = options.fontWeight ? options.fontWeight : "normal";
    string = options.string ? options.string : " ";

  }

  function _required(options) {

    where = options.where;

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addInnerGroup() {
    let innerGroup;

    innerGroup = explorableGroup({
      "where":displayTerm.outerGroup,
    });

    return innerGroup;
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":displayTerm.innerGroup,
      "fontFamily":fontFamily,
      "fontSize":fontSize,
      "fontWeight":fontWeight,
      "foregroundColor":color
    })
    .update(string);
    return text;
  }


}

/* exported EquationDivisionTerm */
/* global explorableGroup */
function EquationDivisionTerm(options) {
  let term,
    where;

  term = this;

  init(options);

  return term;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    term.group = addGroup();
    term.innerGroup = addInnerGroup();
    term.viniculum = addViniculum();


  }

  /* PRIVATE METHODS */

  function _defaults(options) {

    term.coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    term.anchorHorizontal = options.anchorHorizontal ? options.anchorHorizontal : "middle";
    term.anchorVertical = options.anchorVertical ? options.anchorVertical : "middle";

  }

  function _required(options) {

    where = options.where;

  }


  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    })
    .attr("transform","translate("+term.coordinates.x+","+term.coordinates.y+")");

    return group;
  }

  function addInnerGroup() {
    let innerGroup;

    innerGroup = explorableGroup({
      "where":term.group
    });

    return innerGroup;
  }

  function addViniculum() {
    let line;

    line = term.innerGroup
      .append("line")
      .attr("x1",0)
      .attr("x2",0)
      .attr("y1",0)
      .attr("y2",0)
      .attr("stroke","black")
      .attr("stroke-width",2);

    return line;
  }



}

/* exported FunctionPlotterAxis */
/* global explorableGroup */
/* global d3 */
function FunctionPlotterAxis(options) {
  let axis,
    axisType,
    fontSize,
    fontWeight,
    position,
    tickCount,
    where;

  axis = this;

  init(options);

  return axis;

  function init(options) {
    _required(options);
    _defaults(options);

    position = definePosition();

    axis.group = addGroup();
    axis.axisDefinition = defineAxis();

    applyAxisToGroup();

  }

  function _defaults(options) {

    fontSize = options.fontSize ? options.fontSize : "14pt";
    fontWeight = options.fontWeight ? options.fontWeight : "normal";
    tickCount = options.tickCount ? options.tickCount : 1;

  }

  function _required(options) {


    axis.scales = options.scales;
    axisType = options.axisType;
    where = options.where;

  }


  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;

  }

  function applyAxisToGroup() {

    axis.group
      .call(axis.axisDefinition.ticks(tickCount))
      .attr("transform","translate("+position.x+","+position.y+")")
      .attr("font-size",fontSize)
      .attr("font-weight",fontWeight);

  }


  function defineAxis() {
    let axisDefinition;


    switch(axisType) {
      case "left":
        axisDefinition = d3.axisLeft(axis.scales.y);
        break;
      case "bottom":
        axisDefinition = d3.axisBottom(axis.scales.x);
        break;
    }

    return axisDefinition;
  }

  function definePosition() {
    let position;

    switch(axisType) {
      case "left":
        position = {
          "x":axis.scales.x(0),
          "y":0
        };
        break;
      case "bottom":
        position = {
          "x":0,
          "y":axis.scales.y(0)
        };
        break;
    }

    return position;
  }


}

/* exported FunctionPlotterGrid */
/* global d3 */
function FunctionPlotterGrid(options) {
  let domain,
    grid,
    range,
    scales,
    where,
    tickEvery;

  grid = this;

  init(options);

  return grid;

  /* INITIALIZE */
  function init(options) {
    _required(options);
    // _default(options);

    grid.xTicks = addXTicks();
    grid.yTicks = addYTicks();


  }

  /* PRIVATE METHODS */
  // function _default(options) {
  //
  //}

  function _required(options) {
    tickEvery = options.tickEvery;
    grid.scales = options.scales;
    where = options.where;
    grid.domain = options.domain;
    grid.range = options.range;
  }

  function addXTicks() {
    let data,
      group,
      lines;

    group = where
      .append("g");

    data = d3.range(domain[0],domain[1] + 1,tickEvery);

    lines = group
      .selectAll("line")
      .data(data)
      .enter()
      .append("line")
      .attr("x1",(d) => { return scales.x(d) ;})
      .attr("x2",(d) =>{  return scales.x(d) ;})
      .attr("y1",scales.y(range[0]))
      .attr("y2",scales.y(range[1]))
      .attr("stroke","#ddd")
      .attr("stroke-width",1)
      .attr("stroke-dasharray","1,0");

    return lines;
  }

  function addYTicks() {
    let data,
      group,
      lines;

    group = where
      .append("g");

    data = d3.range(domain[0],domain[1],tickEvery);

    lines = group
      .selectAll("line")
      .data(data)
      .enter()
      .append("line")
      .attr("x1",scales.x(domain[0]))
      .attr("x2",scales.x(domain[1]))
      .attr("y1",(d) => { return scales.y(d); })
      .attr("y2",(d) => { return scales.y(d); })
      .attr("stroke","#ddd")
      .attr("stroke-width",1)
      .attr("stroke-dasharray","1,0");

    return lines;
  }

}

/* exported FunctionPlotterLine */
/* global d3 */
/* global ExplorableHintedText */
//TODO: THIS IS GETTING A LITTLE LONG
function FunctionPlotterLine(options) {
  let circleRadius,
    numberOfSamples,
    line,
    sampledPoints,
    stroke,
    strokeWidth,
    strokeDashArray,
    where,
    valueTextColor;

  line = this;

  init(options);

  return line;

  /* INTIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);


    sampledPoints = samplePoints();
    line.lineGenerator = defineLineGenerator();
    line.path = addPath();
    line.valueCircle = addValueCircle();
    line.valueText = addValueText();

    line
      .updatePlot();

  }


  /* PRIVATE METHODS */

  function _defaults(options) {

    circleRadius = options.circleRadius ? options.circleRadius : 0;
    numberOfSamples = options.samples ? options.samples : 100;
    stroke = options.stroke ? options.stroke : "black";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 1;
    strokeDashArray = options.strokeDashArray ? options.strokeDasharray : "1,0";
    valueTextColor = options.textColor ? options.textColor : stroke;

  }

  function _required(options) {

    where = options.where;
    line.functionToPlot = options.function;
    line.domain = options.domain;
    line.scales = options.scales;

  }

  function addPath() {
    let path,
      pathDefinition;

    pathDefinition = line.lineGenerator(sampledPoints);

    path = where
      .append("path")
      .attr("stroke",stroke)
      .attr("fill","none")
      .attr("stroke-width",strokeWidth)
      .attr("stroke-dasharray",strokeDashArray)
      .attr("d",pathDefinition);


    return path;
  }

  function addValueCircle() {
    let circle;

    circle = where
      .append("circle")
      .attr("r",circleRadius)
      .attr("fill",stroke);

    return circle;
  }

  function addValueText() {
    let text;

    text = new ExplorableHintedText({
      "where":where,
      "fontSize":"22pt",
      "foregroundColor":valueTextColor,
      "fontWeight":"bold"
    });

    return text;
  }

  function defineLineGenerator() {
    let generator;

    generator = d3.line()
      .x((d) => { return line.scales.x(d.x); })
      .y((d) => { return line.scales.y(d.y); });

    return generator;
  }

  function samplePoints() {
    let sampleStep,
      sampledData;

    sampleStep = (line.domain[1] - line.domain[0]) / numberOfSamples;
    sampledData = [];

    d3.range(line.domain[0],line.domain[1] + sampleStep,sampleStep).forEach((sample) => {
      if(isFinite(line.functionToPlot(sample))) {
        sampledData.push({
          "x":sample,
          "y":line.functionToPlot(sample),
        });
      }
    });

    return sampledData;
  }
}

/* exported FunctionPlotter */
/* global explorableGroup */
/* global FunctionPlotterGrid */
/* global FunctionPlotterLine */
/* global FunctionPlotterAxis */
/* global d3 */
// TODO: THIS NEEDS TO BE FURTHER BROKEN DOWN. UNMANAGABLY LARGE
function FunctionPlotter(options) {
  let axisTickCounts,
    functions,
    gridBoolean,
    group,
    hasTransitioned,
    plotArea,
    plotter,
    range,
    width,
    where,
    x,
    y;

  plotter = this;

  init(options);

  return plotter;

  /* INITIALIZE */
  function init(options) {
    let curtain;

    _required(options);
    _defaults(options);


    curtain = addCurtain();
    plotter.scales = defineScales();
    plotter.axisTitles = {};
    group = addGroup();
    plotArea = addPlotArea();
    plotter.layers = addLayers();
    plotter.grid = addGrid();
    plotter.axes = addAxes();
    plotter.lines = addLines(functions);
    plotter.hotspot = addHotspot();

    plotter.hasTransitioned = false;

    // valueCircle = false;


  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    axisTickCounts = options.axisTicks ? options.axisTicks : {"x":1,"y":1};
    functions = options.functions ? options.functions : [];
    plotter.height = options.height ? options.height : 400;
    plotter.width = options.width ? options.width : 800;
    plotter.domain = options.domain ? options.domain : [0,10];
    plotter.range = options.range ? options.range : [0,10];
    plotter.margins = options.margins ? options.margins : defaultMargins();
    //TODO: THIS IS SLOPPY. GRID SHOULD BE CLEARER
    gridBoolean = options.hideGrid ? false : true;
    x = options.x ? options.x : 0;
    y = options.y ? options.y : 0;
    plotter.coordinates = options.coordinates ? options.coordinates : {"x":x,"y":y};
    plotter.fontFamily  = options.fontFamily ? options.fontFamily : "";

  }

  function _required(options) {

    hasTransitioned = false;
    where = options.where;

  }


  /* PRIVATE METHODS */
  function addAxes() {
    let axes;

    axes = {};

    axes.x = addXAxis();
    axes.y = addYAxis();

    return axes;
  }

  function addCurtain() {
    let clipPath,
      rect;

    clipPath = where
      .select("defs")
      .append("clipPath")
      .attr("id","plotterClipPath");

    rect = clipPath
      .append("rect")
      .attr("x",-1)
      .attr("y",-1)
      .attr("width",width - plotter.margins.left - plotter.margins.right + 1)
      .attr("height",plotter.height - plotter.margins.top - plotter.margins.bottom + 1);

    return clipPath;
  }

  function addGroup() {
    let group;

    group = explorableGroup({"where":options.where})
      .attr("transform","translate("+plotter.coordinates.x+","+plotter.coordinates.y+")");

    return group;
  }

  function addGrid() {
    let grid;

    if(gridBoolean) {
      grid = new FunctionPlotterGrid({
        "axisTickCounts":axisTickCounts,
        "domain":plotter.domain,
        "range":range,
        "scales":plotter.scales,
        "where":plotter.layers.grid,
        "tickEvery":1
      });
    }

    return grid;
  }

  function addHotspot() {
    let hotspot;

    hotspot = group
      .append("rect")
      .attr("x",plotter.margins.left)
      .attr("y",plotter.margins.top)
      .attr("width",plotter.width - plotter.margins.left - plotter.margins.right)
      .attr("height",plotter.height - plotter.margins.top - plotter.margins.bottom)
      .attr("fill","rgba(0,0,0,0)");

    return hotspot;
  }

  function addPlotArea() {
    let plotGroup;

    plotGroup = explorableGroup({
      "where":group
    })
    .attr("transform","translate("+plotter.margins.left+","+plotter.margins.top+")");

  return plotGroup;
  }

  function addLayers() {
    let layers;

    layers = {};
    layers.plot = explorableGroup({"where":group})
      .attr("transform","translate("+plotter.margins.left+","+plotter.margins.top+")");

    layers.grid = explorableGroup({"where":layers.plot})
      .attr("clip-path","url(#plotterClipPath)");

    layers.axes = explorableGroup({"where":layers.plot});
    layers.lines = explorableGroup({"where":layers.plot});


    layers.indicators = explorableGroup({"where":group});
    layers.tooltip = explorableGroup({"where":group});

    return layers;
  }


  function addLines(functions) {
    let lines;

    if(functions.length == 0) {
      lines = [];

      return lines;
    }

    functions.forEach((aFunction) => {
      let line = new FunctionPlotterLine({
          "function":aFunction,
          "where":plotter.layers.lines,
          "domain":plotter.domain,
          "scales":plotter.scales,
      });

      lines.push(line);
    });

    return lines;
  }

  function addXAxis() {
    let axis;

    axis = new FunctionPlotterAxis({
      "axisType":"bottom",
      "scales":plotter.scales,
      "tickCount":axisTickCounts.x,
      "where":plotter.layers.axes
    });

    return axis;
  }

  function addYAxis() {
    let axis;

    axis = new FunctionPlotterAxis({
      "axisType":"left",
      "scales":plotter.scales,
      "tickCount":axisTickCounts.y,
      "where":plotter.layers.axes
    });

    return axis;
  }

  function defaultMargins() {
    return {
      "left":100,
      "right":10,
      "top":30,
      "bottom":50
    };
  }

  function defineScale(inputDomain,outputRange) {
    let scale;

    scale = d3.scaleLinear()
      .domain(inputDomain)
      .range(outputRange);

    return scale;
  }

  function defineScales() {
    let scales;

    scales = {};
    scales.x = defineScale(plotter.domain,[0,plotter.width - plotter.margins.right - plotter.margins.left]);
    scales.y = defineScale(plotter.range,[plotter.height - plotter.margins.bottom - plotter.margins.top,0]);

    return scales;
  }


}

/* exported ExplorableNumberlineAxis */
/* global d3 */
function ExplorableNumberlineAxis(options) {
  let axis,
    axisDefinition,
    axisType,
    color,
    coordinates,
    fontFamily,
    fontSize,
    fontWeight,
    scale,
    tickOffset,
    tickSize,
    where;

  axis = this;

  init(options);

  return axis;

  function init(options) {

    _required(options);
    _defaults(options);

    axisDefinition = defineAxis();
    axis.group = addGroup();

  }

  function _defaults(options) {

    axisType = options.axisType ? options.axisType : d3.axisBottom;
    color = options.color ? options.color : "black";
    coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    fontSize = options.fontSize ? options.fontSize : "14pt";
    fontWeight = options.fontWeight ? options.fontWeight : "normal";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    tickOffset = options.tickOffset ? options.tickOffset : 0;
    tickSize = options.tickSize ? options.tickSize : 5;

  }

  function _required(options) {
    scale = options.scale;
    where = options.where;
  }

  function addGroup() {
    let group;

    group = where.append("g")
      .call(axisDefinition)
      .attr("transform","translate("+coordinates.x+","+coordinates.y+")");

    group.selectAll("text")
      .attr("font-family",fontFamily)
      .attr("font-weight",fontWeight)
      .attr("font-size",fontSize)
      .attr("dy",tickOffset);

    return group;
  }

  function defineAxis() {
    let axisDefinition;

    axisDefinition = axisType()
      .scale(scale)
      .tickSize(tickSize);

    return axisDefinition;
  }

}

/* exported ExplorableNumberlineIndicator */
function ExplorableNumberlineIndicator(options) {
  let activeRadius,
    activeColor,
    activeStroke,
    activeStrokeWidth,
    color,
    coordinates,
    indicator,
    radius,
    stroke,
    strokeWidth,
    transitionDuration,
    where;

  indicator = this;

  init(options);

  return indicator;

  function init(options) {

    _required(options);
    _defaults(options);

    indicator.circle = addCircle();

  }

  function _defaults(options) {

    activeRadius = options.activeRadius ? options.activeRadius : 5;
    activeColor = options.activeColor ? options.activeColor : "black";
    activeStroke = options.activeStroke ? options.activeStroke : "black";
    activeStrokeWidth = options.activeStrokeWidth ? options.activeStrokeWidth : 0;
    color = options.color ? options.color : "black";
    radius = options.radius ? options.radius : 5;
    stroke = options.stroke ? options.stroke : "black";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 0;
    transitionDuration = options.transitionDuration ? options.transitionDuration : 500;

  }

  function _required(options) {

    coordinates = options.coordinates;
    where = options.where;

  }

  function addCircle() {
    let circle;

    circle = where
      .append("circle")
      .attr("cx",coordinates.x)
      .attr("cy",coordinates.y)
      .attr("fill",color)
      .attr("r",radius)
      .attr("stroke",stroke)
      .attr("strokeWidth",strokeWidth)
      .attr("cursor","pointer")
      .on('mouseover',mouseover);

    return circle;
  }

  function mouseover() {

    indicator.circle
      .transition()
      .duration(transitionDuration)
      .attr("r",activeRadius)
      .attr("fill",activeColor)
      .attr("stroke",activeStroke)
      .attr("stroke-width",activeStrokeWidth);

  }

}

/* exported ExplorableNumberlineOrientationMarker */
/* global ExplorableHintedText */

function ExplorableNumberlineOrientationMarker(options) {
  let backgroundColor,
    coordinates,
    fontFamily,
    fontSize,
    fontWeight,
    foregroundColor,
    marker,
    string,
    textAnchor,
    where;

  marker = this;

  init(options);

  return marker;

  function init(options) {

    _required(options);
    _defaults(options);

    marker.text = addText();

  }

  function _defaults(options) {

    backgroundColor = options.backgroundColor ? options.backgroundColor : "white";
    coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    fontFamily = options.fontFamily ? options.fontFamily : "";
    fontSize = options.fontSize ? options.fontSize : "14pt";
    fontWeight = options.fontWeight ? options.fontWeight : "normal";
    foregroundColor = options.foregroundColor ? options.foregroundColor : "black";
    string = options.string ? options.string : "";
    textAnchor = options.textAnchor ? options.textAnchor : "start";

  }

  function _required(options) {
    where = options.where;
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":where,
      "backgroundColor":backgroundColor,
      "coordinates":coordinates,
      "fontSize":fontSize,
      "fontFamily":fontFamily,
      "fontWeight":fontWeight,
      "foregroundColor":foregroundColor,
      "textAnchor":textAnchor
    })
    .update(string);

  }

}

/* global ExplorableNumberline */
/* global ExplorableNumberlineAxis */
ExplorableNumberline.prototype.addAxis = function(options) {
  const numberline = this;

  options.where = numberline.group;
  options.scale = numberline.scale;

  numberline.axis = new ExplorableNumberlineAxis(options);

  return numberline;
};

/* global ExplorableNumberline */
/* global ExplorableNumberlineIndicator */
ExplorableNumberline.prototype.addIndicator = function(options) {
  const numberline = this;

  let indicator;

  options.where = numberline.group;
  options.scale = numberline.scale;
  options.coordinates = {
    "x":numberline.scale(options.value),
    "y":200
  };

  indicator = new ExplorableNumberlineIndicator(options);
  numberline.indicators.push(indicator);

  return numberline;
};

/* global ExplorableNumberline */
/* global ExplorableNumberlineOrientationMarker */
ExplorableNumberline.prototype.addMaximumOrientationMarker = function(options) {
  const numberline = this;

  options.where = numberline.group;
  options.textAnchor = "end";
  options.coordinates = {
      "x":numberline.range[1],
      "y":numberline.orientationYPosition
  };

  numberline.minimumOrientationMarker = new ExplorableNumberlineOrientationMarker(options);

  return numberline;
};

/* global ExplorableNumberline */
/* global ExplorableNumberlineOrientationMarker */
ExplorableNumberline.prototype.addMinmumOrientationMarker = function(options) {
  const numberline = this;

  options.where = numberline.group;
  options.textAnchor = "start";
  options.coordinates = {
      "x":numberline.range[0],
      "y":numberline.orientationYPosition
  };

  numberline.minimumOrientationMarker = new ExplorableNumberlineOrientationMarker(options);

  return numberline;
};

/* global ExplorableNumberline */
/* global ExplorableNumberlineTitle */
ExplorableNumberline.prototype.addTitle = function(options) {
  const numberline = this;

  options.where = numberline.group;

  numberline.title = new ExplorableNumberlineTitle(options);

  return numberline;
};

/* global ExplorableNumberline */
ExplorableNumberline.prototype.hide = function() {
  const numberline = this;


  return numberline;
};

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

/* exported ExplorableNumberlineTitle */
/* global ExplorableHintedText */
function ExplorableNumberlineTitle(options) {
  let backgroundColor,
    coordinates,
    fontSize,
    fontFamily,
    fontWeight,
    foregroundColor,
    string,
    textAnchor,
    title,
    where;

  title = this;

  init(options);

  return title;

  function init(options) {

    _required(options);
    _defaults(options);

    title.text = addText();

  }

  function _defaults(options) {

    backgroundColor = options.backgroundColor ? options.backgroundColor : "white";
    coordinates = options.coordinates ? options.coordinates : {"x":0,"y":0};
    fontSize = options.fontSize ? options.fontSize : "36pt";
    fontWeight = options.fontWeight ? options.fontWeight : "bold";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    foregroundColor = options.foregroundColor ? options.foregroundColor : "black";
    string = options.string ? options.string : "";
    textAnchor = options.textAnchor ? options.textAnchor : "middle";

  }

  function _required(options) {
    where = options.where;
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":where,
      "backgroundColor":backgroundColor,
      "coordinates":coordinates,
      "fontSize":fontSize,
      "fontWeight":fontWeight,
      "fontFamily":fontFamily,
      "foregroundColor":foregroundColor,
      "textAnchor":textAnchor
    })
    .update(string)
    .hide();

    return text;
  }


}

/* exported ExplorableScrollStep */
function ExplorableScrollStep(options) {
  const step = this;

  init(options);

  return step;

  function init(options) {
    // _defaults(options);
    _required(options);

    step.transitionIn = () => {};
    step.transitionOut = () => {};
  }

  // function _defaults(options) {

  // }

  function _required(options) {
    step.name = options.name;
    step.triggerId = options.trigger;
  }

}

/* global ExplorableTooltip */
ExplorableTooltip.prototype.changeHeight = function(newHeight) {

  this.foreignObject
    .attr("height",newHeight);

  return this;
};

/* global ExplorableTooltip */
ExplorableTooltip.prototype.changeWidth = function(newWidth) {

  this.foreignObject
    .attr("width",newWidth);

  return this;
};

/* global ExplorableTooltip */
ExplorableTooltip.prototype.hide = function() {

  this.foreignObject
    .attr("display","none");

  return this;
};

/* global ExplorableTooltip */
ExplorableTooltip.prototype.move = function(coordinates) {
  let edges,
    objectSize,
    tooltipCoordinates;

  try {
    objectSize = this.foreignObject
      .node()
      .getBBox();
  } catch (e) {
    objectSize = {
      "height":0,
      "width":0,
      "x":0,
      "y":0
    };
  }

  tooltipCoordinates = {};
  edges = {};


  tooltipCoordinates.x = coordinates.x - (objectSize.width / 2);
  tooltipCoordinates.y = coordinates.y;
  edges.right = tooltipCoordinates.x + (objectSize.width);
  edges.left = tooltipCoordinates.x;
  edges.top = tooltipCoordinates.y;
  edges.bottom = tooltipCoordinates.y + objectSize.height;
  if(edges.left < this.bounds.minX) {
    tooltipCoordinates.x = this.bounds.minX;
  }

  if(edges.right > this.bounds.maxX) {
    tooltipCoordinates.x = this.bounds.maxX - objectSize.width;
  }

  if(edges.top < this.bounds.minY) {
    tooltipCoordinates.y = this.bounds.minY;
  }

  if(edges.bottom > this.bounds.maxY) {
    tooltipCoordinates.y = this.bounds.maxY - objectSize.height;
  }


  // tooltipCoordinates.x = tooltipCoordinates.x < this.bounds.minX ? this.bounds.minX : tooltipCoordinates.x;
  this.foreignObject
    .attr("x",tooltipCoordinates.x)
    .attr("y",tooltipCoordinates.y);

  return this;
};

/* global ExplorableTooltip */
ExplorableTooltip.prototype.show = function() {

  this.foreignObject
    .attr("display","block");

  return this;
};

/* global ExplorableTooltip */
ExplorableTooltip.prototype.update = function(newHtml) {

  this.divContainer
    .html(newHtml);

  return this;
};

/* global ExplorableImage */
ExplorableImage.prototype.attr = function(key,value) {

  this.image
    .attr(key,value);

  return this;
};

/* global ExplorableImage */
ExplorableImage.prototype.fade = function(duration = 0,opacity = 0) {

  this.image
    .transition()
    .duration(duration)
    .attr("opacity",opacity);

  return this;
};

/* global ExplorableImage */
ExplorableImage.prototype.hide = function(duration = 0) {

  this.image
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};

/* global ExplorableImage */
ExplorableImage.prototype.move = function(options) {

  this.image
    .transition()
    .delay(1500)
    .duration(options.duration)
    .attr("x",options.x)
    .attr("y",options.y);

  return this;
};

/* global ExplorableImage */
ExplorableImage.prototype.show = function(duration = 0, opacity = 1) {

  this.image
    .transition()
    .duration(duration)
    .attr("opacity",opacity);

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.changeBackgroundColor = function(newColor,duration = 0, delay = 0) {

  this.background
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("stroke",newColor);

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.changeForegroundColor = function(newColor,duration = 0, delay = 0) {

  this.foreground
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("fill",newColor);

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.embiggen = function(scale) {

  this.foreground
    .attr("transform","scale("+scale+")");

  this.background
    .attr("transform","scale("+scale+")");

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.hide = function(duration) {

  this.foreground
    .transition()
    .duration(duration)
    .attr("opacity",0);

  this.background
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.killPulse = function() {

  this.innerGroup
    .transition()
    .duration(0)
    .attr("transform","scale(1)");

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.makeBold = function() {

  this.foreground
    .attr("font-weight","bold");

  this.background
    .attr("font-weight","bold");

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.move = function(newCoordinates) {

  this.coordinates = newCoordinates;
  this.group
    .attr("transform","translate("+this.coordinates.x+","+this.coordinates.y+")");

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.moveX = function(newX) {

  this.coordinates.x = newX;

  this.group
    .attr("transform","translate("+this.coordinates.x+","+this.coordinates.y+")");

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.moveY = function(newY) {

  this.coordinates.y = newY;

  this.group
    .attr("transform","translate("+this.coordinates.x+","+this.coordinates.y+")");

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.pulse = function(pulseDurationIn,pulseDurationOut) {
  let text = this;

  repeatAnimation();

  function repeatAnimation() {
    text.innerGroup
      .transition()
      .duration(pulseDurationIn)
      .attr("transform","scale(1.25)")
      .transition()
      .duration(pulseDurationOut)
      .attr("transform","scale(1)")
      .on('end',repeatAnimation);
  }

  return text;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.scaleIn = function(duration,delay) {

  this.innerGroup
    .transition()
    .duration(0)
    .attr("transform","scale(0)")
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("transform","scale(1)");

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.show = function(duration) {

  this.foreground
    .transition()
    .duration(duration)
    .attr("opacity",1);

  this.background
    .transition()
    .duration(duration)
    .attr("opacity",1);

  return this;
};

/* global ExplorableHintedText */
ExplorableHintedText.prototype.update = function(string) {

  this.foreground
    .html(string);

  this.background
    .html(string);

    return this;
};

/* global CalculationStepContainer */
/* global CalculationStepDivisionLine */

CalculationStepContainer.prototype.addDivisionLine = function(options) {
  let line;

  line = new CalculationStepDivisionLine(options);

  this.lines
    .push(line);

  this
    .layout();

  return line;
};

/* global CalculationStepContainer */
/* global CalculationStepNumberLinePlot */
CalculationStepContainer.prototype.addFunctionNumberLinePlot = function(options) {
  let plot;

  plot = new CalculationStepNumberLinePlot(options);

  this.lines
    .push(plot);

  this
    .layout();

  return plot;
};

/* global CalculationStepContainer */
/* global CalculationStepPlot */
CalculationStepContainer.prototype.addFunctionPlot = function(options) {
  let plot;

  plot = new CalculationStepPlot(options);

  this.lines
    .push(plot);

  this
    .layout();

  return plot;

};

/* global CalculationStepContainer */
/* global CalculationStepLine */
CalculationStepContainer.prototype.addLine = function(options) {
  let line;

  line = new CalculationStepLine(options);

  this.lines
    .push(line);

  this
    .layout();

  return line;
};

/* global CalculationStepContainer */
CalculationStepContainer.prototype.layout = function() {
  let currentY,
    totalY;

  currentY = 25;
  totalY = 50;

  this.lines.forEach((line) => {
    line
      .group
      .attr("transform","translate(0,"+currentY+")");

    currentY += line.getHeight();
  });

  totalY = currentY;

  this.svg
    .attr("height",totalY);

  this.parent.tooltip
    .changeWidth(this.width);

  this.parent.tooltip
    .changeHeight(totalY + 30);
};

/* global CalculationStepDivisionLine */
/* global EquationDivisionTerm */
CalculationStepDivisionLine.prototype.addDivisionTermToLabel = function(termOptions) {
  let divisionLine = this,
    term;

  term = new EquationDivisionTerm({
    "where":divisionLine.label.innerGroup,
    "coordinates":{
      "x":0,
      "y":0
    },
    "anchorHorizontal":"end"
  })
  .denominator({
    "string":termOptions.labels.denominator,
    "fontSize":divisionLine.fontSize,
    "fontWeight":"bold",
    "color":termOptions.colors.denominator
  })
  .numerator({
    "string":termOptions.labels.numerator,
    "fontSize":divisionLine.fontSize,
    "fontWeight":"bold",
    "color":termOptions.colors.numerator
  })
  .layout();

  divisionLine.label
    .addTerm(term);

  return divisionLine;
};

/* global CalculationStepDivisionLine */
/* global EquationDisplayTerm */
CalculationStepDivisionLine.prototype.addTextTermToLabel = function(termOptions) {
  let divisionLine,
    term;

  divisionLine = this;

  term = new EquationDisplayTerm({
    "where":divisionLine.label.innerGroup,
    "coordinates":{
      "x":0,
      "y":0
    },
    "string":termOptions.string
  });

  return divisionLine;
};

/* global CalculationStepDivisionLine */
CalculationStepDivisionLine.prototype.getHeight = function() {
//TODO: THIS SOULD RETURN A REAL VALUE NOT A HARD CODED ONE!
  return 50;
};

/* global CalculationStepDivisionLine */
CalculationStepDivisionLine.prototype.layout = function() {

  this.label
    .layout();

  return this;
};

/* global CalculationStepDivisionLine */
CalculationStepDivisionLine.prototype.update = function(value) {

    this.label
      .layout();

    this.bar
      .update(value);


    return this;
  };

/* global CalculationStepLine */
CalculationStepLine.prototype.addConstantValue = function(options) {
  const line = this;
  const bar = line.bar;

  let rect;

  rect = line.columns.middle
    .append("rect")
    .attr("x",0)
    .attr("y",-bar.barHeight / 2)
    .attr("width",bar.scale(options.value))
    .attr("height",bar.barHeight)
    .attr("fill",options.color);

  return line;
};

/* global CalculationStepLine */
CalculationStepLine.prototype.getHeight = function() {
  //TODO: MAKE A REAL METHOD HERE
  return this.lineHeight;
  // return 30;
};

/* global CalculationStepLine */
CalculationStepLine.prototype.update = function(value) {

  this.bar
    .update(value);

  return this;
};

/* global CalculationStepLinearDivisionIndicator */
CalculationStepLinearDivisionIndicator.prototype.update = function(value) {

  let indicator = this;

  indicator.numerator
    .attr("d",indicator.numeratorPathGenerator(indicator.scale(value)));

  indicator.denominator
    .attr("d",indicator.denominatorPathGenerator(indicator.scale(value)));

  indicator.text
    .move({
      "x":indicator.scale(value) + 20,
      "y":0
    })
    .update(value);

  return indicator;
};

/* global CalculationStepLinearIndicator */
CalculationStepLinearIndicator.prototype.update = function(value) {

  this.bar
    .attr("width",this.scale(value));

  this.text
    .update(value)
    .move({
      "x":this.scale(value) + 10,
      "y":0
  });

  return this;
};

/* global CalculationStepNumberLinePlot */
CalculationStepNumberLinePlot.prototype.getHeight = function() {
  //TODO: GIVE A REAL VALUE AND NOT A HARD CODED ONE@
  return this.lineHeight;
};

/* global CalculationStepNumberLinePlot */
CalculationStepNumberLinePlot.prototype.update = function(value) {

  this.plot
    .update(value);

  this.highlight
    .update(value);

  return this;
};

/* global CalculationStepPlot */
CalculationStepPlot.prototype.getHeight = function() {
  return this.height;
};

/* global CalculationStepPlot */
CalculationStepPlot.prototype.update = function(value) {

  this.plot
    .highlightValue(value);

  return this;
};

/* global FunctionNumberLineAxis */
FunctionNumberLineAxis.prototype.killTransition = function( ) {
  let axis = this;

  killDomainTransition();
  killTickTransition();

  return axis;

  function killDomainTransition() {
    let length,
    path;

    path = axis.group
      .select(".domain");

    length = path
      .node()
      .getTotalLength();

    path
      .transition()
      .duration(0)
      .attr("stroke-dasharray",length + "," + length);

  }

  function killTickTransition(duration) {
    let ticks,
      tickStep;

    ticks = axis.group
      .selectAll(".tick");

    tickStep = duration / ticks.size();

    ticks
      .transition()
      .duration(0)
      .attr("opacity",1);

  }

};

/* global FunctionNumberLineAxis */
/* global d3 */
FunctionNumberLineAxis.prototype.transitionIn = function(duration,delay) {
  let axis = this;

  domainTransitionIn(duration,delay);
  tickTransitionIn(duration,delay);

  return axis;

    function domainTransitionIn(duration,delay) {
      let length,
        path;

      path = axis.group
        .select(".domain");

      length = path
        .node()
        .getTotalLength();

      path
        .attr("stroke-dasharray","0," + length)
        .transition()
        .duration(duration)
        .delay(delay)
        .attrTween("stroke-dasharray",tweenDash);

      function tweenDash() {
        let interpolator,
          length;

        length = path
          .node()
          .getTotalLength();

        interpolator = d3
          .interpolateString("0," + length, length + "," + length);

        return(timeStep) => {
          return interpolator(timeStep);
        };
      }
    }

    function tickTransitionIn(duration,delay) {
      let ticks,
        tickStep;

      ticks = axis.group
        .selectAll(".tick");

      tickStep = duration / ticks.size();


      ticks
        .attr("opacity",0)
        .transition()
        .delay((datum,index) => { return delay + (index) * tickStep; })
        .duration(tickStep)
        .attr("opacity",1);

  }

};

/* global FunctionNumberLineGrid */
FunctionNumberLineGrid.prototype.killTransition = function() {
  let grid = this;

  //TODO: THAT ATTR X2 LINE IS UGLY! CLEAN IT UP!
  grid.gridLines
    .transition()
    .duration(0)
    .attr("x2",(datum) => { return grid.scale(grid.functionToPlot(datum));})
    .attr("y2",grid.outputY);

  return grid;
};

/* global FunctionNumberLineGrid */
FunctionNumberLineGrid.prototype.transitionIn = function(duration,delay) {
  let grid = this;

  grid.gridLines
    .attr("x1",(datum) => { return grid
      .scale(datum);
    })
    .attr("x2",(datum) => { return grid
        .scale(datum);
    })
    .attr("y1",grid.inputY)
    .attr("y2",grid.inputY)
    .transition()
    .delay((datum,index) => { return delay + 10 * index; })
    .duration(duration)
    .attr("x2",(datum) => { return grid
        .scale(
          grid
            .functionToPlot(datum)
          );
        })
    .attr("y2",grid.outputY);

  return grid;

};

/* global FunctionNumberLineHighlight */
FunctionNumberLineHighlight.prototype.hide = function() {
  let highlight = this;

  highlight.inputText
    .hide();

  highlight.line
    .attr("opacity",0);

  highlight.outputText
    .hide();

  return highlight;
};

/* global FunctionNumberLineHighlight */
FunctionNumberLineHighlight.prototype.show = function() {
  let highlight = this;

  highlight.inputText
    .show();

  highlight.line
    .attr("opacity",1);

  highlight.outputText
    .show();

  return highlight;
};

/* global FunctionNumberLineHighlight */
FunctionNumberLineHighlight.prototype.transitionIn = function(duration,delay) {
  const highlight = this;

  const lineDuration = 500;

  if(!highlight.hasTransitioned) {

    highlight.line
      .transition()
      .duration(0)
      .attr("x2",highlight.coordinates.x1)
      .attr("y2",highlight.coordinates.y1)
      .transition()
      .duration(lineDuration)
      .delay(delay + duration)
      .attr("x2",highlight.coordinates.x2)
      .attr("y2",highlight.coordinates.y2);

    highlight.inputText
      .scaleIn(duration,delay);

    highlight.outputText
      .scaleIn(duration,delay + duration);


    highlight.hasTransitioned = true;
  }

  return highlight;
};

/* global FunctionNumberLineHighlight */
FunctionNumberLineHighlight.prototype.update = function(value) {
  const line = this;
  const outputValue = line.parent.functionToPlot(value).toFixed(2);

  if(isNaN(outputValue)) { return line; }
  if(value > line.parent.scale.domain()[1]) { return line; }
  if(outputValue < line.parent.scale.domain()[0]) { return line; }

  value = +value;
  value = value.toFixed(2);

  line.coordinates = line.parent
    .lineCoordinatesForValue(value);

  line.line
    .attr("x1",line.coordinates.x1)
    .attr("x2",line.coordinates.x2)
    .attr("y1",line.coordinates.y1)
    .attr("y2",line.coordinates.y2);

  line.inputText
    .update(value)
    .move({"x":line.coordinates.x1,"y":line.coordinates.y1});

  line.outputText
    .update(outputValue)
    .move({"x":line.parent.scale(outputValue),"y":line.coordinates.y2});

  return line;

};

/* global FunctionNumberLineRegion */
FunctionNumberLineRegion.prototype.hide = function(duration = 0) {

  this.group
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};

/* global FunctionNumberLineRegion */
FunctionNumberLineRegion.prototype.show = function(duration = 0) {

  this.group
    .transition()
    .duration(duration)
    .attr("opacity",1);

  return this;
};

/* global FunctionNumberLineRegion */
FunctionNumberLineRegion.prototype.transitionIn = function(duration,delay,reverseDirection) {
  let initialCoordinates,
    initialPath,
    finalPath,
    region;

  region = this;

  if(!region.hasTransitioned) {

      finalPath = region.path
        .attr("d");

      if(!reverseDirection) {

        initialCoordinates = [];
        initialCoordinates[0] = region.coordinates[0];
        initialCoordinates[1] = region.coordinates[1];
        initialCoordinates[2] = region.coordinates[1];
        initialCoordinates[3] = region.coordinates[0];

      } else {

        initialCoordinates = [];
        initialCoordinates[0] = region.coordinates[3];
        initialCoordinates[1] = region.coordinates[2];
        initialCoordinates[2] = region.coordinates[2];
        initialCoordinates[3] = region.coordinates[3];

      }

      initialPath = region
        .lineGenerator(initialCoordinates);

      region.path
        .transition()
        .duration(0)
        .attr("d",initialPath)
        .transition()
        .delay(delay)
        .duration(duration)
        .attr("d",finalPath);

      region.hasTransitioned = true;
  }

  return region;
};

/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.addFunction = function(functionToAdd) {
  let plotter = this;

  plotter.functionToPlot = functionToAdd;

  return plotter;
};

/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineGrid */
FunctionNumberLinePlotter.prototype.addGrid = function(gridOptions) {
  let plotter = this;

  gridOptions.parent = plotter;
  plotter.grid = new FunctionNumberLineGrid(gridOptions);

  return plotter;
};

/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.addHighlightElement = function(element) {
  let plotter = this;

  plotter.highlightElements
    .push(element);

  return plotter;
};

/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineAxis */
FunctionNumberLinePlotter.prototype.addInputAxis = function(axisOptions) {
  const plotter = this;

  axisOptions.parent = plotter;
  axisOptions.axisLocation = "top";

  plotter.inputAxis = new FunctionNumberLineAxis(axisOptions);

  return plotter;
};

/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineAxisLabel */
FunctionNumberLinePlotter.prototype.addInputLabel = function(labelOptions) {
  const plotter = this;

  labelOptions.parent = plotter;
  labelOptions.location = "top";

  plotter.inputLabel = new FunctionNumberLineAxisLabel(labelOptions);

  return plotter;
};

/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineAxis */
FunctionNumberLinePlotter.prototype.addOutputAxis = function(axisOptions) {
  const plotter = this;

  axisOptions.parent = plotter;
  axisOptions.axisLocation = "bottom";

  plotter.outputAxis = new FunctionNumberLineAxis(axisOptions);

  return plotter;

};

/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineAxisLabel */
FunctionNumberLinePlotter.prototype.addOutputLabel = function(labelOptions) {
  const plotter = this;

  labelOptions.parent = plotter;
  labelOptions.location = "bottom";

  plotter.inputLabel = new FunctionNumberLineAxisLabel(labelOptions);

  return plotter;

};

/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.clearHighlights = function() {
  const plotter = this;

  plotter.highlightElements.forEach((element) => {
    element
      .hide();
  });

  return plotter;
};

/* global FunctionNumberLinePlotter */
//TODO: WHERE ARE MARGINS AND HEIGHT COMING FROM HERE?
function functionNumberLineHighlightValue(publicObject) {
  return (value) => {
    let line;

    line = group
      .append("line")
      .attr("x1",publicObject.scale(value))
      .attr("x2",publicObject.scale(publicObject.functionToPlot(value)))
      .attr("y1",margins.top)
      .attr("y2",height - margins.bottom)
      .attr("stroke","blue")
      .attr("stroke-width",3);


    return publicObject;
  };
}

/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.lineCoordinatesForValue = function(value) {
  const plotter = this;

  return {
    "x1":plotter.scale(value),
    "x2":plotter.scale(plotter.functionToPlot(value)),
    "y1":plotter.margins.top,
    "y2":plotter.height - plotter.margins.bottom
  };
};

/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.transitionIn = function(duration) {
  const plotter = this;

  if(!plotter.hasTransitioned) {
    plotter.inputAxis
      .transitionIn(duration,0);

    plotter.outputAxis
      .transitionIn(duration,250);

    plotter.grid
      .transitionIn(duration * 2,375);

    plotter.hasTransitioned = true;

  }

  return plotter;
};

/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.update = function(update) {

  return this;
};

/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.valuesAtMouseCoordinates = function(coordinates) {
  const plotter = this;
  let returnCoordinates;

  returnCoordinates = {};
  returnCoordinates.x = plotter.scale.invert(coordinates.x - plotter.coordinates.x);

  return returnCoordinates;
};

/* global EquationDisplay */
EquationDisplay.prototype.addTerm = function(term) {

  this.terms
    .push(term);

  return this;
};

/* global EquationDisplay */
EquationDisplay.prototype.layout = function() {
  let currentX;

  currentX = 0;

  this.terms
    .slice()
    .reverse()
    .forEach((term) => {


      term
        .layout();

      term
        .move({
          "x":currentX,
          "y":0
        });

      currentX -= term
        .getWidth();

      currentX -= this.termPadding;

    });

  return this;
};

/* global EquationDisplay */
EquationDisplay.prototype.scaleToBoundingBos = function() {
  //TODO: BUILD SCALE TO BOUNDING BOX FUNCTIONALITY
  return this;
};

/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.changeBackgroundColor = function(newColor,duration = 0, delay = 0) {

  this.text
    .changeBackgroundColor(newColor,duration,delay);

  return this;
};

/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.changeColor = function(newColor,duration = 0, delay = 0) {

  this.text
    .changeForegroundColor(newColor,duration,delay);

  return this;
};

/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.getWidth = function() {
  let bbox,
    width;

  bbox = this.innerGroup
    .node()
    .getBBox();

  width = bbox.width;

  return width;
};

/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.layout = function() {

  let displayTerm = this;

  layoutAlign();

  return this;

  function layoutAlign() {
    let translateX,
      translateY;

    translateX = layoutAnchorHorizontal();
    translateY = layoutAnchorVertical();

    displayTerm.innerGroup
      .attr("transform","translate("+translateX+","+translateY+")");

    return displayTerm;
  }

  function layoutAnchorHorizontal() {
    let width;

    width = displayTerm.getWidth();

    switch(displayTerm.anchorHorizontal) {
      case "start":
        return width / 2;
      case "middle":
        return 0;
      case "end":
        return -width / 2;
    }

  }

  function layoutAnchorVertical() {
    let height;

    height = displayTerm.innerGroup
      .node()
      .getBBox()
      .height;

    switch(displayTerm.anchorVertical) {
      case "top":
        return -height / 2;
      case "middle":
        return 0;
      case "bottom":
        return height / 2;
    }
  }

};

/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.makeBold = function() {

  this.text
    .makeBold();

  return this;
};

/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.move = function(newCoordinates) {

  this.coordinates = newCoordinates;
  this.outerGroup
    .attr("transform","translate("+this.coordinates.x+","+this.coordinates.y+")");

  return this;
};

/* global EquationDivisionTerm */
/* global ExplorableHintedText */
EquationDivisionTerm.prototype.denominator = function(options) {
  let term = this;

  term.denominatorText = new ExplorableHintedText({
    "where":term.innerGroup,
    "coordinates":{
      "x":0,
      "y":10
    },
    "fontSize":"10pt",
    "foregroundColor":options.color,
    "fontWeight":"bold",
    "fontFamily":options.fontFamily,
    "textAnchor":"middle",
    "alignmentBaseline":"hanging",
  })
  .update(options.string);

  term
    .layout();

  return term;

};

/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.getWidth = function() {
  let width;

  width = this.group
    .node()
    .getBBox()
    .width;

  return width;
};

/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.highlightDenominator = function(newColor) {

  this.denominatorText
    .changeForegroundColor(newColor)
    .makeBold();

  return this;
};

/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.highlightNumerator = function(newColor) {

  this.numeratorText
    .changeForegroundColor(newColor)
    .makeBold();

  return this;
};

/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.layout = function() {
  let bbox,
    term = this;


  bbox = term.innerGroup
    .node()
    .getBBox();


  layoutAlign();

  term.viniculum
    .attr("x1",bbox.x)
    .attr("x2",bbox.x + bbox.width)
    .attr("y1",0)
    .attr("y2",0);


  return term;

  function layoutAlign() {
    let translateX,
      translateY;

    translateX = layoutAnchorHorizontal();
    translateY = layoutAnchorVertical();

    term.innerGroup
      .attr("transform","translate("+translateX+","+translateY+")");

  }

  function layoutAnchorHorizontal() {
    let width;

    width = term.group
      .node()
      .getBBox()
      .width;


    switch(term.anchorHorizontal) {
      case "start":
        return 0;
      case "middle":
        return 0;
      case "end":
        return -width / 2;
    }
  }

  function layoutAnchorVertical() {
    let height;

    height = term.innerGroup
      .node()
      .getBBox()
      .height;

    switch(term.anchorVertical) {
      case "top":
        return -height / 2;
      case "middle":
        return 0;
      case "bottom":
        return height / 2;
    }
  }



};

/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.maxXExtent = function() {
  let bounding;

  bounding = this.group.node()
    .getBBox();

  return this.coordinates.x + bounding.x + bounding.width;
};

/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.move = function(newCoordinates) {

  let term = this;

  if(newCoordinates) { term.coordinates = newCoordinates; }

  term.group
    .attr("transform","translate("+term.coordinates.x+","+term.coordinates.y+")");

  return term;
};

/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.moveAdjacentTo = function(adjacentObject,padding) {

  let newXPosition;

  newXPosition = adjacentObject
    .maxXExtent() + padding;

  this
    .moveX(newXPosition);

  return this;
};

/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.moveX = function(newValue) {

  this.coordinates.x = xPosition;

  this.move();

  return this;
};

/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.numerator = function(options) {
  let term = this;

  term.numeratorText = new ExplorableHintedText({
    "where":term.innerGroup,
    "coordinates":{
      "x":0,
      "y":-25
    },
    "fontSize":"10pt",
    "fontFamily":options.fontFamily,
    "foregroundColor":options.color,
    "fontWeight":"bold",
    "textAnchor":"middle",
    "alignmentBaseline":"hanging",
  })
  .update(options.string);

  term.layout();

  return term;

};

/* global FunctionPlotterAxis */
/* global d3 */
FunctionPlotterAxis.prototype.transitionIn = function(duration) {

  const axis = this;

  domainTransitionIn(duration);
  tickTransitionIn(duration);

  return axis;

  function domainTransitionIn(duration) {
    let length,
      path;

    path = axis.group
      .select(".domain");

    length = path
      .node()
      .getTotalLength();

    path
      .transition()
      .duration(duration)
      .attrTween("stroke-dasharray",tweenDash);

    function tweenDash() {
      let interpolator,
        length;

      length = path
        .node()
        .getTotalLength();

      interpolator = d3
        .interpolateString("0," + length, length + "," + length);

      return(timeStep) => {
        return interpolator(timeStep);
      };
    }
  }

  function tickTransitionIn(duration) {
    let ticks,
      tickStep;

    ticks = axis.group
      .selectAll(".tick");

    tickStep = duration / ticks.size();


    ticks
      .attr("opacity",0)
      .transition()
      .delay((datum,index) => { return (index - 1) * tickStep; })
      .duration(tickStep)
      .attr("opacity",1);


  }
};

/* global FunctionPlotterGrid */
FunctionPlotterGrid.prototype.transitionIn = function() {

  this.xTicks
    .attr("y2",this.scales.y(this.range[0]))
    .transition()
    .delay((datum,index) => { return 100 * index; })
    .duration(1000)
    .attr("y2",this.scales.y(this.range[1]));

  this.yTicks
    .attr("x2",this.scales.x(this.domain[0]))
    .transition()
    .delay((datum,index) => { return 100 * index; })
    .duration(1000)
    .attr("x2",this.scales.x(this.domain[1]));

};

/* global FunctionPlotterLine */
FunctionPlotterLine.prototype.highlightValue = function(xValue) {

  const computedValue = this.functionToPlot(xValue);

  if(!isFinite(computedValue)) { return this; }
  if(isNaN(computedValue)) { return this; }
  if(xValue > this.scales.x.domain()[1]) { return this; }

  this.valueCircle
    .attr("cx",this.scales
      .x(xValue)
    )
    .attr("r",10)
    .attr("cy",this.scales.y(this.functionToPlot(xValue)));

  this.valueText
    .move({
      "x":this.scales.x(xValue),
      "y":this.scales.y(this.functionToPlot(xValue)) - 25})
    .update(this.functionToPlot(xValue).toFixed(2));

  return this;
};

/* global FunctionPlotterLine */
/* global d3 */
FunctionPlotterLine.prototype.transitionIn = function(duration) {
  const line = this;

  this.path
    .transition()
    .duration(duration)
    .attrTween("stroke-dasharray",tweenDash);

  function tweenDash() {
    let length,
      interpolator;

    length = line.path
      .node()
      .getTotalLength();

    interpolator = d3
      .interpolateString("0," + length, length + "," + length);

    return (timeStep) => {
      return interpolator(timeStep);
    };
  }
};

/* global FunctionPlotterLine */

// TODO: GET THIS WORKING AGAIN!
FunctionPlotterLine.prototype.updatePlot = function() {
  const line = this;
  /*

  let calculatedSamples;

  calculatedSamples = calculateSamples();

  line.path
    .attr("d",line
      .lineGenerator(calculatedSamples)
    );
  */
  return line;

};

/* global FunctionPlotter */
/* global FunctionPlotterLine */
FunctionPlotter.prototype.addLine = function(lineOptions) {
  const plotter = this;
  let line;

  line = new FunctionPlotterLine({
      "function":lineOptions.function,
      "where":plotter.layers.lines,
      "domain":plotter.domain,
      "scales":plotter.scales,
      "stroke":lineOptions.stroke,
      "strokeWidth":lineOptions.strokeWidth,
      "strokeDasharray":lineOptions.strokeDasharray,
      "circleRadius":lineOptions.circleRadius,
      "textColor":lineOptions.textColor
  });

  plotter.lines
    .push(line);

  return plotter;
};

/* global FunctionPlotter */
FunctionPlotter.prototype.addMouseMoveListener = function(callback) {

  this.hotspot
    .on('mousemove',callback);


  return this;
};

/* global FunctionPlotter */
FunctionPlotter.prototype.addMouseOutListener = function(callback) {

  this.hotspot
    .on('mouseout',callback);

  return this;
};

/* global FunctionPlotter */
FunctionPlotter.prototype.addMouseOverListener = function(callback) {

  this.hotspot
    .on('mouseover',callback);

  return this;
};

/* global FunctionPlotter */
FunctionPlotter.prototype.highlightValue = function(value) {

  this.lines
    .forEach((line) => {
      line
        .highlightValue(value);
    });

  return this;
};

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

/* global FunctionPlotter */
/* global ExplorableHintedText */

FunctionPlotter.prototype.plotTitle = function(axisTitleOptions) {

  const plotter = this;

  plotter.axisTitles.plot = new ExplorableHintedText({
    "where":plotter.layers.axes,
    "string":axisTitleOptions.string,
    "textAnchor":"middle",
    "fontSize":"22pt",
    "fontWeight":"bold",
    "fontFamily":plotter.fontFamily,
    "alignmentBaseline":"text-after-edge",
    "backgroundColor":axisTitleOptions.backgroundColor,
    "coordinates":{
      "x":plotter.scales.x((plotter.domain[1] - plotter.domain[0]) / 2),
      "y":0
    }
  });

  return plotter;
};

/* global FunctionPlotter */
FunctionPlotter.prototype.transitionIn = function(duration) {
  if(!this.hasTransitioned) {
    if(this.grid) {
      this.grid
        .transitionIn(duration);
    }

    this.axes.x
      .transitionIn(duration);

    this.axes.y
      .transitionIn(duration);

    this.lines
      .forEach((line) => {
        line.transitionIn(duration);
      });

    this.hasTransitioned = true;
  }
};

/* global FunctionPlotter */
FunctionPlotter.prototype.valuesAtMouseCoordinates = function(coordinates) {
  const plotter = this;
  let returnCoordinates;

  returnCoordinates = {};
  returnCoordinates.x = this.scales.x.invert(coordinates.x - plotter.margins.left - plotter.coordinates.x);
  returnCoordinates.y = this.scales.y.invert(coordinates.y - plotter.margins.bottom - plotter.coordinates.y);

  return returnCoordinates;
};

/* global FunctionPlotter */
/* global ExplorableHintedText */
FunctionPlotter.prototype.xAxisTitle = function(axisTitleOptions) {
  const plotter = this;

  plotter.axisTitles.x = new ExplorableHintedText({
    "where":plotter.layers.axes,
    "string":axisTitleOptions.string,
    "textAnchor":"middle",
    "fontSize":axisTitleOptions.fontSize,
    "fontWeight":"normal",
    "fontFamily":plotter.fontFamily,
    "alignmentBaseline":"text-before-edge",
    "backgroundColor":axisTitleOptions.backgroundColor,
    "coordinates":{
      "x":plotter.scales.x((plotter.domain[1] - plotter.domain[0]) / 2),
      "y":plotter.height - plotter.margins.bottom
    }
  });

  return plotter;
};

/* global FunctionPlotter */
/* global ExplorableHintedText */
FunctionPlotter.prototype.yAxisTitle = function(axisTitleOptions) {
  const plotter = this;

  plotter.axisTitles.y = new ExplorableHintedText({
    "where":plotter.layers.axes,
    "string":axisTitleOptions.string,
    "textAnchor":"end",
    "fontSize":axisTitleOptions.fontSize,
    "fontWeight":"normal",
    "alignment-baseline":"middle",
    "fontFamily":plotter.fontFamily,
    "backgroundColor":axisTitleOptions.backgroundColor,
    "coordinates":{
      "x":-20,
      "y":plotter.scales.y((plotter.range[1] - plotter.range[0]) / 2)
    }
  });

  return plotter;
};

/* global ExplorableNumberlineAxis */
/* global d3 */
ExplorableNumberlineAxis.prototype.transitionIn = function(duration = 2000) {
  const axis = this;

  domainTransitionIn(duration);
  tickTransitionIn(duration);

  return axis;

  function domainTransitionIn(duration) {
    let length,
      path;

    path = axis.group
      .select(".domain");

    length = path
      .node()
      .getTotalLength();

    path
      .transition()
      .duration(duration)
      .attrTween("stroke-dasharray",tweenDash);

    function tweenDash() {
      let interpolator,
        length;

      length = path
        .node()
        .getTotalLength();

      interpolator = d3
        .interpolateString("0," + length, length + "," + length);

      return(timeStep) => {
        return interpolator(timeStep);
      };
    }
  }

  function tickTransitionIn(duration) {
    let ticks,
      tickStep;

    ticks = axis.group
      .selectAll(".tick");

    tickStep = duration / ticks.size();


    ticks
      .attr("opacity",0)
      .transition()
      .delay((datum,index) => { return (index - 1) * tickStep; })
      .duration(tickStep)
      .attr("opacity",1);


  }

};

/* global ExplorableNumberlineIndicator */
ExplorableNumberlineIndicator.prototype.transitionIn = function() {

  return this;
}

/* global ExplorableNumberlineTitle */
ExplorableNumberlineTitle.prototype.show = function(duration = 375,delay = 0) {
  this.text
    .hide(duration,delay);

  return this;
};

/* global ExplorableNumberlineTitle */
ExplorableNumberlineTitle.prototype.transitionIn = function(duration = 500,delay = 0) {

  this.text
    .show(duration,delay);

  return this;
};

/* global ExplorableScrollStep */
/* global d3 */
ExplorableScrollStep.prototype.activate = function() {

  d3.selectAll(".step")
    .classed("active",false);

  d3.select("#" + this.triggerId)
    .classed("active",true);

  return this;
};

/* global ExplorableScrollStep */
/* global d3 */
/* global window */
ExplorableScrollStep.prototype.getTriggerPosition = function() {

  let boundingBox,
    node,
    returns,
    selection;

  selection = d3.select("#" + this.triggerId);
  node = selection.node();
  boundingBox = node.getBoundingClientRect();

  returns = {
    "transitionIn":boundingBox.top + window.scrollY,
    "transitionOut":boundingBox.top + boundingBox.height + window.scrollY
  };

  return returns;
};

/* global ExplorableScrollStep */
ExplorableScrollStep.prototype.setTransitionIn = function(callback) {

  this.transitionIn = callback;

  return this;
};

/* global ExplorableScrollStep */
ExplorableScrollStep.prototype.setTransitionOut = function(callback) {

  this.transitionOut = callback;

  return this;
};
