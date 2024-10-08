import React from 'react'

function AttributeList({ datasetDetails }) {
    return (
        <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
            <div className="table-responsive">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th className='small py-2'>type</th>
                            <th className='small py-2'>specification</th>
                            <th className='small py-2'>attribute</th>
                        </tr>
                    </thead>
                    <tbody>

                        {datasetDetails?._source?.datasets?.[0].columns?.map((attribute) => (
                            <tr className='hover'>
                                <td>{attribute.dataType == "int64" ? 'numeric' : 'string'}</td>
                                <td>{attribute.dataType ?? "string"}</td>
                                <td>{attribute.name}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default AttributeList
