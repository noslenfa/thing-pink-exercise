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

function requestShots() {
  return {
    type: FETCH_SHOTS
  }
}

function receiveShots(json) {
  return {
    type: FETCH_SHOTS_FULFILLED,
    shots: json
  }
}

function rejectShots() {
  return {
    type: FETCH_SHOTS_REJECTED
  }
}


function shotsSortAsc(shots) {
  return {
    type: SHOTS_SORT_ASC,
    shots: shots
  }
}

function shotsSortDesc(shots) {
  return {
    type: SHOTS_SORT_DESC,
    shots: shots
  }
}

function filterTagsShots(shots) {
  return {
    type: SHOTS_FILTER_TAGS,
    shots: shots
  }
}


export function fetchShots() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestShots())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`${ENV.API.BASE}${ENV.API.SHOTS}?per_page=100`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ENV.DRIBBBLE_KEY}`
      }
    })
    .then(res => {
      if (res.ok) {
        res.json().then(json => {
          dispatch(receiveShots(json));
        });
      } else {
        dispatch(rejectShots());
        /* eslint-disable no-console */
        console.log('error', res);
        /* eslint-enable no-console */
      }
    })
    .catch(() => {
      dispatch(rejectShots());
      /* eslint-disable no-console */
      console.log('Fail zone');
      /* eslint-enable no-console */
    })

  }
}

export function shotsSort(order, shots) {

  return function (dispatch) {
    let orderedShots;

    if (order === 'asc') {
      orderedShots = _.orderBy(shots, ['likesCount'], ['asc', 'desc']);
      dispatch(shotsSortAsc(orderedShots));
    } else if (order === 'desc') {
      orderedShots = _.orderBy(shots, ['likesCount'], ['desc', 'asc']);
      dispatch(shotsSortDesc(orderedShots));
    }
  }

}

export function filterTags(tag, shots) {

  return function (dispatch) {
    let filteredTagsShots = new Set();

    shots.forEach(shot => {
      let tags = shot.tags;
      if (_.includes(tags, tag)) {
        filteredTagsShots.add(shot);
      }
    });

    dispatch(filterTagsShots(filteredTagsShots));
  }

}
