export const CHANGE_SVG_STROKE_COLOR = 'CHANGE_SVG_STROKE_COLOR'
export const CHANGE_SVG_FILL_COLOR = 'CHANGE_SVG_FILL_COLOR'
export const HANDLE_LEFT_MENU = 'HANDLE_LEFT_MENU'
export const HANDLE_RIGHT_MENU = 'HANDLE_RIGHT_MENU'

/**
 * Change svg color action
 *
 * @method changeSVGColor
 * @param {string} svgColor
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
 * @param {string} svgColor
 * @return {Object}
 */
function updateFillColor(svgColor) {
  return {
    type: CHANGE_SVG_FILL_COLOR,
    svgColor
  }
}

/**
 * Handle left menu open/close
 *
 * @method handleLeftMenu
 * @return {Object}
 */
function handleLeftMenu() {
  return {
    type: HANDLE_LEFT_MENU
  }
}

/**
 * Handle right menu open/close
 *
 * @method handleRightMenu
 * @return {Object}
 */
function handleRightMenu() {
  return {
    type: HANDLE_RIGHT_MENU
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

/**
 * Change svg fill color action
 *
 * @method changeFillColor
 * @param {string} svgColor
 * @return {Function}
 */
export function handleMenu(menu) {
  return function(dispatch) {
    if (menu === 'left') {
      dispatch(handleLeftMenu());
    } else if (menu === 'right') {
      dispatch(handleRightMenu());
    }
  }
}
