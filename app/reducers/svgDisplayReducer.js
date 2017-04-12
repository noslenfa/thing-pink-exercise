import {
  CHANGE_SVG_STROKE_COLOR,
  CHANGE_SVG_FILL_COLOR,
  HANDLE_LEFT_MENU,
  HANDLE_RIGHT_MENU
} from '../actions/svgDisplayActions'

/**
 * Handle to change svg stroke color
 *
 * @method handleChangeStrokeColor
 * @param {Object} state app state
 * @param {Object} action action
 * @return {Object}
 */
const handleChangeStrokeColor = (state, action) => ({

  ...state,
  svgStrokeColor: action.svgColor

})

/**
 * Handle to change svg fill color
 *
 * @method handleChangeFillColor
 * @param {Object} state app state
 * @param {Object} action action
 * @return {Object}
 */
const handleChangeFillColor = (state, action) => ({

  ...state,
  svgFillColor: action.svgColor

})

/**
 * Handle left menu open/close
 *
 * @method handleLeftMenu
 * @param {Object} state app state
 * @return {Object}
 */
const handleLeftMenu = (state) => ({

  ...state,
  leftMenuOpen: !state.leftMenuOpen

})


/**
 * Handle right menu open/close
 *
 * @method handleRightMenu
 * @param {Object} state app state
 * @return {Object}
 */
const handleRightMenu = (state) => ({

  ...state,
  rightMenuOpen: !state.rightMenuOpen

})

/**
 * Select correct handle based on type
 *
 * @method shots
 * @param {Object} state app state
 * @return {Object}
 */
export default function shots(state = {

  svgStrokeColor: 'white',
  svgFillColor: 'transparent',
  leftMenuOpen: false,
  rightMenuOpen: false
}, action) {
  switch (action.type) {
    case CHANGE_SVG_STROKE_COLOR:
      return handleChangeStrokeColor(state, action);
    case CHANGE_SVG_FILL_COLOR:
      return handleChangeFillColor(state, action);
    case HANDLE_LEFT_MENU:
      return handleLeftMenu(state, action);
    case HANDLE_RIGHT_MENU:
      return handleRightMenu(state, action);
    default:
      return state
  }
  
}
