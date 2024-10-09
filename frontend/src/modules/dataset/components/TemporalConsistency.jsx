import React from 'react'

function TemporalConsistency({ datasetDetails }) {
    return (
        <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
            <div className="table-responsive">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th className='small py-2 bgc-primary text-white'>freq</th>
                            <th className='small py-2 bgc-primary text-white'>attribute</th>
                            <th className='small py-2 bgc-primary text-white'>gaps</th>
                        </tr>
                    </thead>
                    <tbody>

                        {datasetDetails?._source?.datasets?.[0].columns
                            ?.filter((attribute) => attribute.temporalConsistencies)
                            ?.map((attribute) => (
                                <tr className='hover'>
                                    <td>?</td>
                                    <td>{attribute.name}</td>
                                    <td>?</td>
                                </tr>
                            ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default TemporalConsistency
