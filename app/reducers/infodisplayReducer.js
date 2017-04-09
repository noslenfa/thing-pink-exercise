import {
  FETCH_SHOTS,
  FETCH_SHOTS_FULFILLED,
  FETCH_SHOTS_REJECTED,
  SHOTS_SORT_ASC,
  SHOTS_SORT_DESC,
  SHOTS_FILTER_TAGS,
  SHOTS_SEARCH_TAGS
} from '../actions/infodisplayActions'

/**
 * Handle the request for fetch shots
 * @method handleFetchShots
 * @param {Object} state app state
 * @return {Object}
 */
const handleFetchShots = (state, actions) => ({
  ...state,
  isFetching: true
});

const handleSortShots = (state, action) => ({
  ...state,
  items: action.shots
});

const handleSearchShots = (state, action) => ({
  ...state,
  items: action.shots,
  searchValue: action.val
});

const handleFetchError = (state, action) => ({
  ...state,
  isFetching: false,
  error: action.error
});

const handleFetchSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  items: action.shots.map(item => ({
    id: item.id,
    username: item.user && item.user.name || item.username,
    title: item.title,
    avatarUrl: item.user && item.user.avatar_url || item.avatarUrl,
    imageUrl: item.images && item.images.teaser || item.imageUrl,
    likesCount: item.likes_count || item.likesCount,
    tags: item.tags
  })),
  initialItems: action.shots.map(item => ({
    id: item.id,
    username: item.user && item.user.name || item.username,
    title: item.title,
    avatarUrl: item.user && item.user.avatar_url || item.avatarUrl,
    imageUrl: item.images && item.images.teaser || item.imageUrl,
    likesCount: item.likes_count || item.likesCount,
    tags: item.tags
  }))
});

export default function shots(state = {
  numPage: 1,
  isFetching: false,
  isFetched: false,
  error: null,
  items: [],
  initialItems: [],
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
    default:
      return state
  }
}
