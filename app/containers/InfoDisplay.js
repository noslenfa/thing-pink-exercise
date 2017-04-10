require('normalize.css/normalize.css');

import React, { Component } from 'react'
import { connect } from 'react-redux'

import InfiniteScroll from 'react-infinite-scroller'

//react bootstrap
import Button from 'react-bootstrap/lib/Button'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'

// actions
import { fetchShots, shotsSort, searchTags, clearSearch } from '../actions/infodisplayActions'

// components
import Shot from '../components/Shot'

const mapStateToProps = (state) => {
  return state;
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         delete: (data) => {
//             return removeSession(dispatch, data);
//         },
//         dispatch: dispatch
//     };
// };

class InfoDisplay extends Component {

  constructor(props, context){
		super(props);
    context.router;
	}

  componentWillMount() {
    let numPage = this.props.infodisplay.numPage,
      initialShots = [];

    this.props.dispatch(fetchShots(numPage, initialShots));
  }

  refreshShots() {
    this.props.dispatch(clearSearch());
    this.props.dispatch(fetchShots(1, []));
  }

  shotsSort(order, shots) {
    this.props.dispatch(shotsSort(order, shots));
  }

  handleSearchTags(initialShots, e) {
    this.props.dispatch(searchTags(e.target.value, initialShots));
  }

  loadFunc(initialShots) {
    let numPage = this.props.infodisplay.numPage;

    numPage++;

    // this.props.dispatch(fetchShots(numPage, initialShots));
    console.log('INFINITE');

  }

  render() {

    let shots = this.props.infodisplay.items,
      initialShots = this.props.infodisplay.initialItems,
      isFetching = this.props.infodisplay.isFetching,
      shotsRendered;

    const shotsMapped = shots.map(shot => <Shot shot={shot} shots={initialShots} key={shot.id}></Shot>);

    if (isFetching) {
      shotsRendered = <div className='spinning-loader'></div>
    } else {
      if (shots.length > 0) {
        shotsRendered = shotsMapped;
      } else {
        shotsRendered = <div className="text-center">THERE ARE NO SHOTS TO PRESENT</div>
      }
    }

    return (
      <div>
        <div className="container shots-list-area">
          <div className="shots-list-buttons">
            <div>
              <Button title="Sort likes ascending" bsStyle="primary" onClick={this.shotsSort.bind(this, 'asc', shots)}><i className="fa fa-sort-numeric-asc"></i></Button>
              <Button title="Sort likes descending" bsStyle="primary" onClick={this.shotsSort.bind(this, 'desc', shots)}><i className="fa fa-sort-numeric-desc"></i></Button>
              <Button title="Reset Shots" className="shots-list-reset-button" bsStyle="primary" onClick={this.refreshShots.bind(this)}><i className="fa fa-refresh"></i></Button>
            </div>
            <hr/>
            <FormGroup>
              <FormControl
                type="text"
                value={this.props.infodisplay.searchValue}
                placeholder="Search for tags"
                onChange={this.handleSearchTags.bind(this, initialShots)}
              />
            </FormGroup>
            <hr/>
          </div>
          <div className="shots-list">
            <InfiniteScroll
              pageStart={0}
              initialLoad={false}
              loadMore={this.loadFunc.bind(this, initialShots)}
              hasMore={true}
            >
              {shotsRendered}
            </InfiniteScroll>
          </div>
        </div>
      </div>
  );
  }
}

//needed for routing purposes
InfoDisplay.contextTypes = {
	router: React.PropTypes.object
}

InfoDisplay = connect(mapStateToProps)(InfoDisplay);

export default InfoDisplay;
