require('normalize.css/normalize.css');

import React, { Component } from 'react'
import { connect } from 'react-redux'

//react bootstrap
import Button from 'react-bootstrap/lib/Button'

// actions
import { fetchShots, shotsSort } from '../actions/infodisplayActions'

// components
import ShotsList from '../components/ShotsList'

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
    this.props.dispatch(fetchShots());
  }

  shotsSort(order, shots) {
    this.props.dispatch(shotsSort(order, shots));
  }

  render() {

    console.log('props ', this.props);

    let items = this.props.infodisplay.items,
      isFetching = this.props.infodisplay.isFetching,
      shots = [],
      shotsRendered;
      // sTags = new Set();

    items.forEach(item => {
      let tags = item.tags;
      console.log('item ', item);
      shots.push({
        id: item.id,
        username: item.user && item.user.name || item.username,
        title: item.title,
        avatarUrl: item.user && item.user.avatar_url || item.avatarUrl,
        imageUrl: item.images && item.images.teaser || item.imageUrl,
        likesCount: item.likes_count || item.likesCount,
        tags: item.tags
      });

      // tags.forEach(tag => {
      //   sTags.add(tag)
      // })
      //
      // totalTags = Array.from(sTags);
    })

    const shotsMapped = shots.map(shot => <ShotsList shot={shot} shots={shots} key={shot.id}></ShotsList>);

    if (isFetching) {
      shotsRendered = <div className='spinning-loader'></div>
    } else {
      shotsRendered = shotsMapped;
    }

    return (
      <div>
        <div className="container shots-list-area">
          <div className="shots-list-buttons text-center">
            <Button bsStyle="primary" onClick={this.shotsSort.bind(this, 'asc', shots)}>ASCENDING</Button>
            <Button bsStyle="primary" onClick={this.shotsSort.bind(this, 'desc', shots)}>DESCENDING</Button>
          </div>
          <div className="shots-list">
            {shotsRendered}
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
