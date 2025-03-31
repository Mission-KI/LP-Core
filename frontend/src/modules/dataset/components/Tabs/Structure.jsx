import React from 'react';
import EdpStructure from '../EdpStructure/EdpStructure';

function Structure({ datasetDetails }) {

    return (
        <EdpStructure
            datasetDetails={datasetDetails}
            datasetTree={datasetDetails?._source?.datasetTree}
            expandedByDefault={true}
        />
    )
}

export default Structure;
