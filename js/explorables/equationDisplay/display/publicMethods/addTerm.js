/* global EquationDisplay */
EquationDisplay.prototype.addTerm = function(term) {

  this.terms
    .push(term);

  return this;
};
