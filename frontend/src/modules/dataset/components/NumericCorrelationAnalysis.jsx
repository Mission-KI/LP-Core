import React from 'react'
import ImageView from '../../common/components/Header/ImageView/ImageView'

function NumericCorrelationAnalysis({ datasetDetails }) {
    return (
        <ImageView url={datasetDetails?._source?.structuredDatasets[0]?.correlationGraph} />
    )
}

export default NumericCorrelationAnalysis
