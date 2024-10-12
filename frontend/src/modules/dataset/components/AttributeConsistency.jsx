import React from 'react'

function AttributeConsistency({ datasetDetails }) {
    return (
        <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
            <div className="table-responsive">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th className='small py-2 bgc-primary text-white'>attribute</th>
                            <th className='small py-2 bgc-primary text-white'>hasMissingValues</th>
                            <th className='small py-2 bgc-primary text-white'>countMissingValues</th>
                        </tr>
                    </thead>
                    <tbody>

                        {datasetDetails?._source?.structuredDatasets[0]?.numericColumns.map((column, index) => (
                            <tr key={index} className='hover'>
                                <td>{column.name}</td>
                                <td>{column.nullCount ? 'Yes' : 'No'}</td>
                                <td>{column.nullCount}</td>
                            </tr>
                        ))}


                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default AttributeConsistency
