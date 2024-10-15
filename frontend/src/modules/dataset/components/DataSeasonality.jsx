import React from 'react'
import ImageView from '../../common/components/Header/ImageView/ImageView'

function DataSeasonality({ datasetDetails }) {
    return (
        <div>
            {datasetDetails?._source?.structuredDatasets?.[0]?.numericColumns?.map((column) => (
                <>
                    <span className='text-muted small'>{column.name}</span>
                    <div className="row">
                        {column?.seasonalityGraphs?.map((imageUrl, index) => (
                            <div className='col-md-3' key={index}>
                                <ImageView url={imageUrl} />
                            </div>
                        ))}
                    </div>
                </>
            ))}
        </div>
    )
}
export default DataSeasonality
