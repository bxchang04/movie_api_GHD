import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './director-view.scss';

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {director} = this.props;

    if (!director) return null;

    return (
      <Card className="director-info" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className="director-name">{director.Name}</Card.Title>
          <Card.Text>
          Biography: <br/>
          <br/>
          {director.Bio}
          <br/>
          <br/>
          Birth Year:  {director.BirthYear}
          </Card.Text>
          <div className="text-center">
            <Link to={`/`}>
              <Button className="button-card" variant="info">Back</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
