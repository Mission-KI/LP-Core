import React from 'react'
import ImageView from '../../common/components/Header/ImageView/ImageView'
import { imageBasePath } from '../../common/api/config';

function NumericCorrelationAnalysis({ datasetDetails }) {
    const correlationGraphUrl = datasetDetails?._source?.structuredDatasets[0]?.correlationGraph;

    return (
        <>
            {correlationGraphUrl ? (
                <ImageView url={imageBasePath + correlationGraphUrl} />
            ) : ''}
        </>
    );
}

export default NumericCorrelationAnalysis
