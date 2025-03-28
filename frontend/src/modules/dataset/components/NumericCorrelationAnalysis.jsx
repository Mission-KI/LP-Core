import React from 'react'
import ImageView from '../../common/components/ImageView/ImageView'
import { imageBasePath } from '../../common/api/config';

function NumericCorrelationAnalysis({ datasetDetails }) {
    const correlationGraphUrl = datasetDetails?._source?.structuredDatasets[0]?.correlationGraph;

    return (
        <>
            {correlationGraphUrl ? (
                <ImageView url={imageBasePath + datasetDetails?._id + '/' + correlationGraphUrl} />
            ) : ''}
        </>
    );
}

export default NumericCorrelationAnalysis
