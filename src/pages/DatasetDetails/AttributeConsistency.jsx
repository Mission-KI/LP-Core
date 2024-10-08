import React from 'react'

function AttributeConsistency({ datasetDetails }) {
    return (
        <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
            <div className="table-responsive">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th className='small py-2'>attribute</th>
                            <th className='small py-2'>hasMissingValues</th>
                            <th className='small py-2'>countMissingValues</th>
                        </tr>
                    </thead>
                    <tbody>

                        {datasetDetails?._source?.datasets?.[0].columns?.map((attribute) => (
                            <tr className='hover'>
                                <td>{attribute.name}</td>
                                <td>?</td>
                                <td>?</td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default AttributeConsistency
