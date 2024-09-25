import React from 'react'
import SearchBar from '../Search/SearchBar'
import { Download, Star, StarFill } from 'react-bootstrap-icons'
import icon from '../../assets/img/brand/icon.webp'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div id={styles.header}>
            <div className='d-flex align-items-center pe-4'>
                <Link to="/">
                    <img src={icon} alt="" id={styles.logo} />
                </Link>
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
