import React from 'react';
import Card from 'react-bootstrap/Card';

const Item = (props) => {
  return (
    <Card text="primary" className="List-item">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Item;