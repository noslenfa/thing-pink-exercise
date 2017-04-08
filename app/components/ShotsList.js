import React, {Component} from 'react'

//react bootstrap
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

class ShotsList extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const shot = this.props.shot;
    const tags = shot.tags;
    let tagsMapped;

    if (tags.length > 0) {
      tagsMapped = tags.map((tag, index) =>
        <Button
          key={index}
          bsStyle="info"
          bsSize="xsmall">
          {tag}
        </Button>)
    } else {
      tagsMapped = <div>THERE ARE NO TAGS TO DISPLAY</div>
    }


    return (
      <div className="shots-list">
        <Row>
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
        <Row className="shots-list-tags">
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

export default ShotsList;
