import { combineReducers } from 'redux'

//reducers
import infoDisplay from './infoDisplayReducer'
import svgDisplay from './svgDisplayReducer'

export default combineReducers({
  infoDisplay,
  svgDisplay
})
