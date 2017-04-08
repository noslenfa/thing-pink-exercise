require('normalize.css/normalize.css')

import React, {Component} from 'react'
import { connect } from 'react-redux'

//react bootstrap
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

// actions
import { filterTags } from '../actions/infodisplayActions'

const mapStateToProps = (state) => {
  return state;
}

class ShotsList extends Component {

  constructor(props) {
    super(props);
  }

  filterTags(tag, shots) {
    console.log(this.props);
    this.props.dispatch(filterTags(tag, shots));
  }

  render() {

    const shots = this.props.shots;
    const shot = this.props.shot;
    const tags = shot.tags;
    let tagsMapped;

    if (tags.length > 0) {
      tagsMapped = tags.map((tag, index) =>
        <Button
          key={index}
          bsStyle="info"
          onClick={this.filterTags.bind(this, tag, shots)}>
          {tag}
        </Button>)
    } else {
      tagsMapped = <div>THERE ARE NO TAGS TO DISPLAY</div>
    }

    return (
      <div className="shots-list-item">
        <Row className="margin-zero">
          <Col xs={4}>
            <img src={shot.avatarUrl}/>
          </Col>
          <Col className="shots-list-text" xs={8}>
            <div><span>NAME: </span>{shot.username}</div>
            <div><span>TITLE: </span>{shot.title}</div>
            <div><span>LIKES: </span>{shot.likesCount}</div>
          </Col>
        </Row>
        <hr />
        <Row className="shots-list-tags margin-zero">
          <Col xs={1}>
            <div>Tags:</div>
          </Col>
          <Col xs={11}>
            <ButtonToolbar>{tagsMapped}</ButtonToolbar>
          </Col>
        </Row>
      </div>
    );
  }
}

ShotsList = connect(mapStateToProps)(ShotsList);

export default ShotsList;
