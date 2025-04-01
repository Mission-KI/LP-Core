import React from 'react';
import EdpStructure from '../EdpStructure/EdpStructure';

function Structure({ datasetDetails }) {

    return (
        <EdpStructure
            datasetDetails={datasetDetails}
            datasetId="#/documentDatasets/0"
            expandedByDefault={true}
        />
    )
}

export default Structure;
