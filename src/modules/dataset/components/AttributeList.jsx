import React from 'react'

function AttributeList({ datasetDetails }) {
    return (
        <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
            <div className="table-responsive">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th className='small py-2 bgc-primary text-white'>attribute</th>
                            <th className='small py-2 bgc-primary text-white'>type</th>
                            <th className='small py-2 bgc-primary text-white'>specification</th>
                        </tr>
                    </thead>
                    <tbody>

                        {datasetDetails?._source?.datasets?.[0].columns?.map((attribute) => (
                            <tr className='hover'>
                                <td>{attribute.name}</td>
                                <td>{attribute.dataType == "int64" ? 'numeric' : 'string'}</td>
                                <td>{attribute.dataType ?? "string"}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default AttributeList
