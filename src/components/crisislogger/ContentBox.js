import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ContentBox = ({ content, header}) => {
    return (
        <Card
            bg={'light'}
            text={'dark'}
        >
            <Card.Header>
                {header}
            </Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                {content}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ContentBox