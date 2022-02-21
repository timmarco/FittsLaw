/* exported explorableGroup */
// TODO: REFACTOR AS A CONSTRUCTOR
function explorableGroup(options) {
  let group;

  group = options.where
    .append("g");

  return group;
}
