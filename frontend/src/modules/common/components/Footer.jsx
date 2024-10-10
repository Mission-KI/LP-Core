import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="container py-5" style={{ maxWidth: 1000 }}>
            <div className='d-flex w-100 justify-content-between'>
                <span className='small'>beebucket confidential - (c) beebucket 2024</span>
                <Link to="/imprint" className='small'>Imprint</Link>
                <Link to="/data-privacy-policy" className='small'>Data Privacy Policy</Link>
                <Link to="/acceptable-use-policy" className='small'>Acceptable Use Policy</Link>
            </div>
        </div>
    )
}

export default Footer;
