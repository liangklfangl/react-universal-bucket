var styles = [
  'mixins',

  'bordered-pulled',
  'core',
  'fixed-width',
  'icons',
  'larger',
  'list',
  'path',
  'rotated-flipped',
  'animated',
  'stacked'
];

module.exports = function(content) {
  this.cacheable(true);
  var config = this.exec(content, this.resourcePath);
  var start =
    "@import          \"~font-awesome/scss/_variables.scss\";\n"
    + "$fa-font-path: \"~font-awesome/fonts/\";\n"
    + "@import          \"./font-awesome.config.scss\";\n";
  source = start + styles.filter(function(style) {
      return config.styles[style];
    }).map(function(style) {
      return "@import \"~font-awesome/scss/_" + style + ".scss\";";
    }).join("\n");
  return source;
};
