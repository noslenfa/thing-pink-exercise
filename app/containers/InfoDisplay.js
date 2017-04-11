require('normalize.css/normalize.css');

import React, { Component } from 'react'
import { connect } from 'react-redux'

//utils
import {oauthVerification} from '../utils/oauthVerification'

//react bootstrap
import Button from 'react-bootstrap/lib/Button'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'

// actions
import { fetchShots, shotsSort, searchTags } from '../actions/infoDisplayActions'

// components
import Shot from '../components/Shot'
import Header from '../components/Header'
import Footer from '../components/Footer'

/**
 * Map state to props
 *
 * @method mapStateToProps
 * @param {Object} state
 * @return {Object}
 */
const mapStateToProps = (state) => {
  return state;
}

/**
 * Class InfoDisplay
 * @extends Component
 */
class InfoDisplay extends Component {

  /**
   * Constructor
   * @param {Object} props
   * @param {Object} context
   */
  constructor(props, context){
		super(props);
    context.router;
	}

  /**
   * Component will mount
   *
   * @method componentWillMount
   */
  componentWillMount() {

    if(oauthVerification()) {
      this.context.router.replace('login')
    }

    const numPage = this.props.infoDisplay.numPage;
    const initialShots = [];

    this.props.dispatch(fetchShots(numPage, initialShots));
  }

  /**
   * Refresh shots
   *
   * @method shotsSort
   */
  shotsSort(order, shots) {
    this.props.dispatch(shotsSort(order, shots));
  }

  /**
   * Handle search tags
   *
   * @method handleSearchTags
   * @param {Array} initialShots
   * @param {Object} e
   */
  handleSearchTags(initialShots, e) {
    this.props.dispatch(searchTags(e.target.value, initialShots));
  }

  /**
   * Load more shots
   *
   * @method loadMoreShots
   * @param {Array} initialShots
   */
  loadMoreShots(initialShots) {
    let numPage = this.props.infoDisplay.numPage;

    numPage++;

    this.props.dispatch(fetchShots(numPage, initialShots));
  }

  render() {

    const shots = this.props.infoDisplay.filteredItems;
    const initialShots = this.props.infoDisplay.items;
    const isFetching = this.props.infoDisplay.isFetching;
    const searchValue = this.props.infoDisplay.searchValue;
    const shotsMapped = shots.map(shot => <Col lg={6} key={shot.id}><Shot shot={shot} shots={initialShots}></Shot></Col>);
    let shotsRendered;

    if (isFetching) {
      shotsRendered = <div>{shotsMapped}<div className='spinning-loader'></div></div>
    } else {
      if (shots.length > 0) {
        shotsRendered = shotsMapped;
      } else {
        shotsRendered = <div className="text-center">THERE ARE NO SHOTS TO PRESENT</div>
      }
    }

    return (
      <div>
        <Header></Header>
        <div className="container shots-list-area">
          <div className="shots-list-inputs-area">
            <div>Sort or Search for Shots</div>
            <div className="shots-list-buttons">
              <Button title="Sort likes ascending" bsStyle="primary" onClick={this.shotsSort.bind(this, 'asc', shots)}><i className="fa fa-sort-numeric-asc"></i></Button>
              <Button title="Sort likes descending" bsStyle="primary" onClick={this.shotsSort.bind(this, 'desc', shots)}><i className="fa fa-sort-numeric-desc"></i></Button>
            </div>
            <FormGroup>
              <FormControl
                type="text"
                value={searchValue}
                placeholder="Search for tags"
                onChange={this.handleSearchTags.bind(this, initialShots)}
              />
              <i className="fa fa-search"></i>
            </FormGroup>
            <hr/>
          </div>
          <div className="shots-list">
            {shotsRendered}
          </div>
            {searchValue === '' && !isFetching && <Button title="LOAD MORE SHOTS" className="shots-list-load-more" bsStyle="primary" onClick={this.loadMoreShots.bind(this)}>LOAD MORE SHOTS...</Button> }
        </div>
        <Footer></Footer>
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
