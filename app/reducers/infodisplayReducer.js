import {
  FETCH_SHOTS,
  FETCH_SHOTS_FULFILLED,
  FETCH_SHOTS_REJECTED,
  SHOTS_SORT_ASC,
  SHOTS_SORT_DESC,
  SHOTS_FILTER_TAGS,
  SHOTS_SEARCH_TAGS,
  CLEAR_SEARCH,
  CLEAR_SHOTS
} from '../actions/infoDisplayActions'

/**
 * Handle the request for fetch shots
 *
 * @method handleFetchShots
 * @param {Object} state app state
 * @return {Object}
 */
const handleFetchShots = (state) => ({
  ...state,
  isFetching: true
});

/**
 * Handle fetch request errors
 *
 * @method handleFetchError
 * @param {Object} state app state
 * @return {Object}
 */
const handleFetchError = (state, action) => ({
  ...state,
  isFetching: false,
  error: action.error
});

/**
 * Handle fetch request success
 *
 * @method handleFetchError
 * @param {Object} state app state
 * @return {Object}
 */
const handleFetchSuccess = (state, action) => {

  const shots = action.shots.map(item => ({
    id: item.id,
    username: item.user && item.user.name || item.username,
    title: item.title,
    avatarUrl: item.user && item.user.avatar_url || item.avatarUrl,
    imageUrl: item.images && item.images.teaser || item.imageUrl,
    likesCount: item.likes_count || item.likesCount,
    tags: item.tags
  }))

  return {
    ...state,
    isFetching: false,
    numPage: action.numPage,
    items: [...state.items, ...shots],
    filteredItems: [...state.filteredItems, ...shots]
  }
};

/**
 * Handle shots sort based on order (asc, desc)
 *
 * @method handleSortShots
 * @param {Object} state app state
 * @return {Object}
 */
const handleSortShots = (state, action) => ({
  ...state,
  filteredItems: action.shots,
  initialItems: action.initialShots
});

/**
 * Handle shots search
 *
 * @method handleSearchShots
 * @param {Object} state app state
 * @return {Object}
 */
const handleSearchShots = (state, action) => ({
  ...state,
  filteredItems: action.shots,
  searchValue: action.val
});

/**
 * Clear search input
 *
 * @method handleClearSearch
 * @param {Object} state app state
 * @return {Object}
 */
const handleClearSearch = (state) => ({
  ...state,
  searchValue: ''
});

/**
 * Clear shots
 *
 * @method handleClearShots
 * @return {Object}
 */
const handleClearShots = () => ({
  numPage: 1,
  isFetching: false,
  error: null,
  items: [],
  filteredItems: [],
  searchValue: ''
});

/**
 * Select correct handler based on type
 *
 * @method shots
 * @param {Object} state app state
 * @return {Object}
 */
export default function shots(state = {
  numPage: 1,
  isFetching: false,
  error: null,
  items: [],
  filteredItems: [],
  searchValue: ''
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
      return handleSortShots(state, action);
    case SHOTS_FILTER_TAGS:
    case SHOTS_SEARCH_TAGS:
      return handleSearchShots(state, action);
    case CLEAR_SEARCH:
      return handleClearSearch(state, action);
    case CLEAR_SHOTS:
      return handleClearShots();
    default:
      return state
  }
}
