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
