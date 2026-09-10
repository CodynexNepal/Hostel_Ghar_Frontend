// eslint-disable-next-line @typescript-eslint/no-require-imports
const React = require('react');

// Mock next/image as a plain <img> for Jest.
// Strips Next-only props (fill / priority) so they don't leak to the DOM.
module.exports = function NextImageMock(props) {
  const { fill, priority, ...rest } = props;
  void fill;
  void priority;
  return React.createElement('img', rest);
};
