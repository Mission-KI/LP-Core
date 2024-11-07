import React from 'react'
import ImageView from '../../common/components/Header/ImageView/ImageView'

function DataSeasonality({ datasetDetails }) {
    return (
        <div>

            <div className='d-flex align-items-center justify-content-between pb-3 pt-3'>
                <div className='d-flex align-items-center'>
                    <div className='pe-1'>
                        <span className='small text-muted'>Select chart view</span>
                    </div>
                    <div className='px-1'>
                        <button className='btn btn-outline-primary rounded-lg small'>Original Timeseries</button>
                    </div>
                    <div className='px-1'>
                        <button className='btn btn-outline-primary rounded-lg small'>Trend</button>
                    </div>
                    <div className='px-1'>
                        <button className='btn btn-outline-primary rounded-lg small'>Seasonality</button>
                    </div>
                    <div className='ps-1'>
                        <button className='btn btn-outline-primary rounded-lg small'>Residuals / Outliers</button>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <div className='pe-1'>
                        <span className='small text-muted'>Search attribute</span>
                    </div>
                    <div>
                        <input type="text" className='form-control rounded-lg small' placeholder='Search attribute name' />
                    </div>
                </div>

            </div>

            {datasetDetails?._source?.structuredDatasets?.[0]?.numericColumns?.map((column) => (
                <>
                    <span className='text-muted small'>{column.name} Original Timeseries</span>
                    <div className="row mb-3">
                        <div className='col-md-12'>
                            <ImageView url={column?.seasonalityGraphs[0]} />
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}
export default DataSeasonality
