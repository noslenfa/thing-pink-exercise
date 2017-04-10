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

function requestShots() {
  return {
    type: FETCH_SHOTS
  }
}

function receiveShots(shots, numPage, initialShots) {
  return {
    type: FETCH_SHOTS_FULFILLED,
    shots,
    initialShots,
    numPage
  }
}

function rejectShots(error) {
  return {
    type: FETCH_SHOTS_REJECTED,
    error
  }
}


function shotsSortAsc(shots, initialShots) {
  return {
    type: SHOTS_SORT_ASC,
    shots,
    initialShots
  }
}

function shotsSortDesc(shots, initialShots) {
  return {
    type: SHOTS_SORT_DESC,
    shots,
    initialShots
  }
}

function filterTagsShots(shots, val) {
  return {
    type: SHOTS_FILTER_TAGS,
    shots,
    val
  }
}

function searchTagsShots(shots, val) {
  return {
    type: SHOTS_SEARCH_TAGS,
    shots,
    val
  }
}

function clearSearchValue() {
  return {
    type: CLEAR_SEARCH
  }
}

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
      // TODO: review the errors in case of success
      // else {
      //   dispatch(rejectShots(res));
      //   /* eslint-disable no-console */
      //   console.log('error', res);
      //   /* eslint-enable no-console */
      // }
    })
    .catch(err => {
      dispatch(rejectShots(err));
      /* eslint-disable no-console */
      console.log('Fail zone');
      /* eslint-enable no-console */
    })
}

export function shotsSort(order, shots, initialShots) {

  return function (dispatch) {
    let orderedShots,
      orderedInitialShots;

    if (order === 'asc') {
      orderedShots = _.orderBy(shots, ['likesCount'], ['asc', 'desc']);
      orderedInitialShots = _.orderBy(shots, ['likesCount'], ['asc', 'desc']);
      dispatch(shotsSortAsc(orderedShots, orderedInitialShots));
    } else if (order === 'desc') {
      orderedShots = _.orderBy(shots, ['likesCount'], ['desc', 'asc']);
      orderedInitialShots = _.orderBy(shots, ['likesCount'], ['desc', 'asc']);
      dispatch(shotsSortDesc(orderedShots, orderedInitialShots));
    }
  }

}

export function filterTags(tag, shots) {

  return function (dispatch) {
    let filteredTagsShots = [];

    shots.forEach(shot => {
      let tags = shot.tags;
      if (_.includes(tags, tag)) {
        filteredTagsShots.push(shot);
      }
    });

    dispatch(filterTagsShots(filteredTagsShots, tag));
  }

}

export function searchTags(val, shots) {

  return function (dispatch) {
    let searchedTagsShots;
    if (val === '') {
      searchedTagsShots = shots;
    } else {
      let sSearched = new Set();

      _.filter(shots, shot => {
        return _.some(shot.tags, tag => {
          if (_.startsWith(tag, val)) {
            sSearched.add(shot);
          }
        });
      });

      searchedTagsShots = Array.from(sSearched);
    }

    dispatch(searchTagsShots(searchedTagsShots, val));
  }
}

export function clearSearch() {

  return function(dispatch) {
    dispatch(clearSearchValue());
  }
  
}
