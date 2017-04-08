import { FETCH_SHOTS, FETCH_SHOTS_FULFILLED, FETCH_SHOTS_REJECTED } from '../actions/infodisplayActions'

export default function shots(state = {
  isFetching: false,
  isFetched: false,
  error: null,
  items: []
}, action) {
  switch (action.type) {
    case FETCH_SHOTS:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_SHOTS_REJECTED:
    return {
      ...state,
      isFetching: false,
      error: action.shots
    }
    case FETCH_SHOTS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        items: action.shots
      }
    default:
      return state
  }
}
