/*global ENV:true*/
/*eslint no-undef: "error"*/

import fetch from 'isomorphic-fetch'
import _ from 'lodash';

export const FETCH_SHOTS = 'FETCH_SHOTS'
export const FETCH_SHOTS_FULFILLED = 'FETCH_SHOTS_FULFILLED'
export const FETCH_SHOTS_REJECTED = 'FETCH_SHOTS_REJECTED'
export const SHOTS_SORT_ASC = 'SHOTS_SORT_ASC'
export const SHOTS_SORT_DESC = 'SHOTS_SORT_DESC'
export const SHOTS_FILTER_TAGS = 'SHOTS_FILTER_TAGS'
export const SHOTS_SEARCH_TAGS = 'SHOTS_SEARCH_TAGS'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const CLEAR_SHOTS = 'CLEAR_SHOTS'

/**
 * Request shots action method
 *
 * @method requestShots
 * @return {Object}
 */
function requestShots() {

  return {
    type: FETCH_SHOTS
  }

}

/**
 * Request shots action method
 *
 * @method requestShots
 * @param {Object} shots
 * @param {number} numPage
 * @param {Array} initialShots
 * @return {Object}
 */
function receiveShots(shots, numPage, initialShots) {

  return {
    type: FETCH_SHOTS_FULFILLED,
    shots,
    initialShots,
    numPage
  }

}

/**
 * Request shots action
 *
 * @method requestShots
 * @param {Object} shots
 * @param {number} numPage
 * @param {Array} initialShots
 * @return {Object}
 */
function rejectShots(error) {

  return {
    type: FETCH_SHOTS_REJECTED,
    error
  }

}

/**
 * Sort shots ascending action
 *
 * @method shotsSortAsc
 * @param  {Object} shots
 * @param  {Array} initialShots
 * @return {Object}
 */
function shotsSortAsc(shots, initialShots) {

  return {
    type: SHOTS_SORT_ASC,
    shots,
    initialShots
  }

}

/**
 * Sort shots descending action
 *
 * @method shotsSortDesc
 * @param  {Object} shots
 * @param  {Array} initialShots
 * @return {Object}
 */
function shotsSortDesc(shots, initialShots) {

  return {
    type: SHOTS_SORT_DESC,
    shots,
    initialShots
  }

}

/**
 * Filter shots by tag value action
 *
 * @method filterTagsShots
 * @param  {Object} shots
 * @param  {string} val
 * @return {Object}
 */
function filterTagsShots(shots, val) {

  return {
    type: SHOTS_FILTER_TAGS,
    shots,
    val
  }

}

/**
 * Filter shots by input value action
 *
 * @method searchTagsShots
 * @param  {Object} shots
 * @param  {string} val
 * @return {Object}
 */
function searchTagsShots(shots, val) {

  return {
    type: SHOTS_SEARCH_TAGS,
    shots,
    val
  }

}

/**
 * Clear search input value action
 *
 * @method searchTagsShots
 * @return {Object}
 */
function clearSearchValue() {

  return {
    type: CLEAR_SEARCH
  }

}

/**
 * Clear shots
 *
 * @method clearShots
 * @return {Object}
 */
function clearShotsValues() {

  return {
    type: CLEAR_SHOTS
  }

}

/**
 * Fetch shots request
 *
 * @method fetchShots
 * @param {number} numPage
 * @param {Array} initialShots
 * @return {Object}
 */
export const fetchShots = (numPage, initialShots) => dispatch => {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestShots())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`${ENV.API.BASE}${ENV.API.SHOTS}?per_page=10&page=${numPage}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ENV.DRIBBBLE_KEY}`
      }
    })
    .then(res => {
      if (res.ok) {
        res.json().then(json => {
          if (initialShots.length === 0) {
            initialShots = json;
          }
          dispatch(receiveShots(json, numPage, initialShots));
        });
      }
    })
    .catch(err => {
      dispatch(rejectShots(err));
      /* eslint-disable no-console */
      console.log('Fail zone');
      /* eslint-enable no-console */
    })
}

/**
 * Shots sort action
 *
 * @method shotsSort
 * @param {string} order
 * @param {Array} shots
 * @return {Function}
 */
export const shotsSort = (order, shots) => dispatch => {

  let orderedShots,
    orderedInitialShots;

  if (order === 'asc') {
    // get shots ordered by likesCount and ascending order
    orderedShots = _.orderBy(shots, ['likesCount'], ['asc', 'desc']);

    // get shots ordered by likesCount and ascending order
    // this is need to have always the initial state
    orderedInitialShots = _.orderBy(shots, ['likesCount'], ['asc', 'desc']);
    dispatch(shotsSortAsc(orderedShots, orderedInitialShots));
  } else if (order === 'desc') {
    // get shots ordered by likesCount and ascending order
    orderedShots = _.orderBy(shots, ['likesCount'], ['desc', 'asc']);

    // get shots ordered by likesCount and ascending order
    // this is need to have always the initial state
    orderedInitialShots = _.orderBy(shots, ['likesCount'], ['desc', 'asc']);
    dispatch(shotsSortDesc(orderedShots, orderedInitialShots));
  }

}

/**
 * Shots filter action
 *
 * @method filterTags
 * @param {string} tag
 * @param {Array} shots
 * @return {Function}
 */
export const filterTags = (tag, shots) => dispatch => {

  let filteredTagsShots = [];

  // run trought all shots
  shots.forEach(shot => {
    const tags = shot.tags;
    // verify if the selected tag is the current shot and add shot to an array
    if (_.includes(tags, tag)) {
      filteredTagsShots.push(shot);
    }
  });

  dispatch(filterTagsShots(filteredTagsShots, tag));

}

/**
 * Shots search by tag action
 *
 * @method searchTags
 * @param {string} val
 * @param {Array} shots
 * @return {Function}
 */
export const searchTags = (val, shots) => dispatch => {

  let searchedTagsShots;
  if (val === '') {
    searchedTagsShots = shots;
  } else {
    let sSearched = new Set();

    // run trhought all shots
    _.filter(shots, shot => {
      // return the tags if some
      return _.some(shot.tags, tag => {
        // go trhought tags and check if it starts with the search input value
        if (_.startsWith(tag, val)) {
          sSearched.add(shot);
        }
      });
    });

    // to array shots that corrspond to the properties given above
    searchedTagsShots = Array.from(sSearched);
  }

  dispatch(searchTagsShots(searchedTagsShots, val));
  
}

/**
 * Shots clear search input action
 *
 * @method clearSearch
 * @return {Function}
 */
export const clearSearch = () => dispatch => {

  dispatch(clearSearchValue());

}

/**
 * Shots clear search input action
 *
 * @method clearSearch
 * @return {Function}
 */
export const clearShots = () => dispatch => {

  dispatch(clearShotsValues());

}
