export const CHANGE_SVG_STROKE_COLOR = 'CHANGE_SVG_STROKE_COLOR'
export const CHANGE_SVG_FILL_COLOR = 'CHANGE_SVG_FILL_COLOR'

/**
 * Change svg color action
 *
 * @method changeSVGColor
 * @return {Object}
 */
function updateStrokeColor(svgColor) {
  return {
    type: CHANGE_SVG_STROKE_COLOR,
    svgColor
  }
}

/**
 * Change svg color action
 *
 * @method changeSVGColor
 * @return {Object}
 */
function updateFillColor(svgColor) {
  return {
    type: CHANGE_SVG_FILL_COLOR,
    svgColor
  }
}

/**
 * Change svg stroke color action
 *
 * @method changeStrokeColor
 * @param {string} svgColor
 * @return {Function}
 */
export function changeStrokeColor(svgColor) {
  return function(dispatch) {
    dispatch(updateStrokeColor(svgColor));
  }
}

/**
 * Change svg fill color action
 *
 * @method changeFillColor
 * @param {string} svgColor
 * @return {Function}
 */
export function changeFillColor(svgColor) {
  return function(dispatch) {
    dispatch(updateFillColor(svgColor));
  }
}
