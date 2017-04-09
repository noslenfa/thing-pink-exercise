import {
  FETCH_SHOTS,
  FETCH_SHOTS_FULFILLED,
  FETCH_SHOTS_REJECTED,
  SHOTS_SORT_ASC,
  SHOTS_SORT_DESC,
  SHOTS_FILTER_TAGS
} from '../actions/infodisplayActions'

/**
 * Handle the request for fetch shots
 * @method handleFetchShots
 * @param {Object} state app state
 * @return {Object}
 */
const handleFetchShots = (state) => ({
  ...state,
  isFetching: true
});

const handleSortShots = (state, action) => ({
  ...state,
  items: action.shots
});

const handleFetchError = (state, action) => ({
  ...state,
  isFetching: false,
  error: action.error
});

const handleFetchSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  items: action.shots
});

export default function shots(state = {
  isFetching: false,
  isFetched: false,
  error: null,
  items: []
}, action) {
  switch (action.type) {
    case FETCH_SHOTS:
      return handleFetchShots(state);
    case FETCH_SHOTS_REJECTED:
      return handleFetchError(state, action);
    case FETCH_SHOTS_FULFILLED:
      return handleFetchSuccess(state, action);
    case SHOTS_SORT_ASC:
    case SHOTS_SORT_DESC:
    case SHOTS_FILTER_TAGS:
      return handleSortShots(state, action);
    default:
      return state
  }
}
