import React from 'react'
import ImageView from '../../common/components/Header/ImageView/ImageView'

function DataSeasonality({ datasetDetails }) {
    return (
        <div className='container'>
            <div className="row">
                {datasetDetails?._source?.structuredDatasets[0]?.numericColumns.map((column) => {
                    column.seasonalityGraph && (
                        <div className='col-md-3'>
                            <ImageView url={column.seasonalityGraph} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DataSeasonality
