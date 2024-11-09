import React from 'react';
import { Database, Files } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';

const CategoryCard = ({ category }) => {
    return (
        <div className="col-md-4 mb-4">
            <Card className='h-100'>
                <Card.Img variant="top" src={category.image} />
                <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text className='medium txt-lighter'>
                        Some quick example text to build on the card.
                    </Card.Text>
                    <Card.Text>
                        <div className="row mt-3">
                            <div className="col-6">
                                <span className='small d-flex align-items-center'>
                                    <Database className='me-1' /> 25 Data sources
                                </span>
                            </div>
                            <div className="col-6">
                                <span className='small d-flex align-items-center'>
                                    <Files className='me-1' /> 5.275.180 Data Assets
                                </span>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CategoryCard;
