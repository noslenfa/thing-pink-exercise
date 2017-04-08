import {
  FETCH_SHOTS,
  FETCH_SHOTS_FULFILLED,
  FETCH_SHOTS_REJECTED,
  SHOTS_SORT_ASC,
  SHOTS_SORT_DESC,
  SHOTS_FILTER_TAGS
} from '../actions/infodisplayActions'

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
    case SHOTS_SORT_ASC:
      return {
        ...state,
        items: action.shots
      }
    case SHOTS_SORT_DESC:
      return {
        ...state,
        items: action.shots
      }
    case SHOTS_FILTER_TAGS:
      return {
        ...state,
        items: action.shots
      }
    default:
      return state
  }
}
