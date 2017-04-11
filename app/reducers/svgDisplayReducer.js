import {
  CHANGE_SVG_STROKE_COLOR,
  CHANGE_SVG_FILL_COLOR
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
});

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
});

/**
 * Select correct handle based on type
 *
 * @method shots
 * @param {Object} state app state
 * @return {Object}
 */
export default function shots(state = {
  svgStrokeColor: 'white',
  svgFillColor: 'transparent'
}, action) {
  switch (action.type) {
    case CHANGE_SVG_STROKE_COLOR:
      return handleChangeStrokeColor(state, action);
    case CHANGE_SVG_FILL_COLOR:
      return handleChangeFillColor(state, action);
    default:
      return state
  }
}
