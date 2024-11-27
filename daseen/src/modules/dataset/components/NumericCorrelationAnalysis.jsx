import React from 'react'
import ImageView from '../../common/components/ImageView/ImageView'

function NumericCorrelationAnalysis({ datasetDetails }) {
    const correlationGraphUrl = datasetDetails?._source?.structuredDatasets[0]?.correlationGraph;

    return (
        <>
            {correlationGraphUrl ? (
                <ImageView url={correlationGraphUrl} />
            ) : ''}
        </>
    );
}

export default NumericCorrelationAnalysis
