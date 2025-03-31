import React from 'react';
import { useParams } from 'react-router';

const Dataset = () => {

    const { dataset_name } = useParams();


    return (
        <div>
            <h3 className='mt-4 bold'>{dataset_name}</h3>
        </div>
    );
}

export default Dataset;
