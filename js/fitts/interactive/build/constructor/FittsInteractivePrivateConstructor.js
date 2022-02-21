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
