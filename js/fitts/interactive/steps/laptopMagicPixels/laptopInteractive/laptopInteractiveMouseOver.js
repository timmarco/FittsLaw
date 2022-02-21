/* exported laptopInteractiveMouseOver */
function laptopInteractiveMouseOver(interactive) {
  return () => {

    interactive.tooltip
      .show();
      
    return interactive;
  };
}
