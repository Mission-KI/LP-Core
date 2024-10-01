import React from 'react'
import { ThreeDots } from 'react-bootstrap-icons'

function Paginator() {
    return (
        <div className='d-flex justify-content-around align-items-center m-auto mt-5 py-3' style={{ maxWidth: 420 }}>
            <div className='btn btn-primary rounded-circle d-flex justify-content-center align-items-center' style={{ height: 38, width: 38 }}>
                <span className='medium text-white'>1</span>
            </div>
            {/* <div className='btn btn-basic border rounded-circle d-flex justify-content-center align-items-center' style={{ height: 38, width: 38 }}>
                <span className='medium'>2</span>
            </div>
            <div className='btn btn-basic border rounded-circle d-flex justify-content-center align-items-center' style={{ height: 38, width: 38 }}>
                <span className='medium'>3</span>
            </div>
            <div className='btn btn-basic border rounded-circle d-flex justify-content-center align-items-center' style={{ height: 38, width: 38 }}>
                <span className='medium'>4</span>
            </div>
            <div className='btn btn-basic border rounded-circle d-flex justify-content-center align-items-center' style={{ height: 38, width: 38 }}>
                <span className='medium'>5</span>
            </div>
            <div className='d-flex align-items-center'>
                <ThreeDots />
            </div>
            <div className='btn btn-basic border rounded-circle d-flex justify-content-center align-items-center' style={{ height: 38, width: 38 }}>
                <span className='medium'>15</span>
            </div> */}
        </div>
    )
}

export default Paginator
