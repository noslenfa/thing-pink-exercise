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
const updateStrokeColor = (svgColor) => ({

  type: CHANGE_SVG_STROKE_COLOR,
  svgColor

})

/**
 * Change svg color action
 *
 * @method changeSVGColor
 * @param {string} svgColor
 * @return {Object}
 */
const updateFillColor = (svgColor) => ({

  type: CHANGE_SVG_FILL_COLOR,
  svgColor

})

/**
 * Handle left menu open/close
 *
 * @method handleLeftMenu
 * @return {Object}
 */
const handleLeftMenu = () => ({

  type: HANDLE_LEFT_MENU

})

/**
 * Handle right menu open/close
 *
 * @method handleRightMenu
 * @return {Object}
 */
const handleRightMenu = () => ({

  type: HANDLE_RIGHT_MENU

})

/**
 * Change svg stroke color action
 *
 * @method changeStrokeColor
 * @param {string} svgColor
 * @return {Function}
 */
export const changeStrokeColor = (svgColor) => dispatch => {

  dispatch(updateStrokeColor(svgColor));

}

/**
 * Change svg fill color action
 *
 * @method changeFillColor
 * @param {string} svgColor
 * @return {Function}
 */
export const changeFillColor = (svgColor) => dispatch => {

  dispatch(updateFillColor(svgColor));

}

/**
 * Change svg fill color action
 *
 * @method changeFillColor
 * @param {string} svgColor
 * @return {Function}
 */
export const handleMenu = (menu) => dispatch => {

  if (menu === 'left') {
    dispatch(handleLeftMenu());
  } else if (menu === 'right') {
    dispatch(handleRightMenu());
  }

}
