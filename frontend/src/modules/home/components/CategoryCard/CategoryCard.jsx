import React from 'react';
import Card from 'react-bootstrap/Card';

const CategoryCard = ({ category }) => {
    return (
        <div className="col-md-4 mb-4">
            <Card className='h-100'>
                {category.image ? (
                    <Card.Img variant="top" src={category.image} />
                ) : (
                    <Card.Img variant="top" src="path/to/default-image.jpg" alt="Default Category" />
                )}
                <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CategoryCard;
