import React from 'react'
import SearchBar from '../Search/SearchBar'
import { Download, Star, StarFill } from 'react-bootstrap-icons'

function Header() {
    return (
        <div className='d-flex w-100 px-4 py-3 border-bottom'>
            <div className='d-flex align-items-center pe-4'>
                <a href="/" className='text-decoration-none'>
                    <h3 className='mb-0'>DSE</h3>
                </a>
            </div>
            <div>
                <SearchBar />
                <div className='d-flex w-100 align-items-center pt-3'>
                    <div className='pe-2'>
                        <button className='btn btn-primary rounded-lg py-1 small'>Find similar EDP</button>
                    </div>
                    <div className='pe-2'>
                        <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                            <Download className='me-1' /> Schema (JSON)
                        </button>
                    </div>
                    <div className='pe-2'>
                        <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                            <Download className='me-1' /> Report (pdf)
                        </button>
                    </div>
                    <div className='pe-2'>
                        <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                            <Download className='me-1' /> Get Dataset
                        </button>
                    </div>
                    <div className='pe-2'>
                        <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                            <StarFill className='me-1' />
                            Remove Bookmark
                        </button>
                    </div>
                    <div className='pe-2'>
                        <button className='btn btn-basic rounded-lg py-1 small d-flex align-items-center'>Bookmarks <Star className='ms-2' /> </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
