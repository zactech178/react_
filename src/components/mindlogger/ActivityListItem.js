import React from 'react';
import Card from 'react-bootstrap/Card';

const Item = () => {
  return (
    <Card text="primary" className="List-item">
      <Card.Body>
        <Card.Title>Example Activity</Card.Title>
        <Card.Text>
          A short activity description
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Item;