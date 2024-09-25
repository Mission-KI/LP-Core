import React from 'react'
import SearchBar from '../../components/Search/SearchBar'
import Results from '../../components/Results/Results'
import logo from '../../assets/img/brand/logo.webp'

function Home() {
    return (
        <div className="container py-4" style={{ maxWidth: 1000 }}>

            <img src={logo} alt="" style={{ maxWidth: 150 }} className='mb-5' />
            {/* <h3 className='mb-5'>Dataset Search Engine</h3> */}

            <SearchBar />
            <Results />

        </div>
    )
}

export default Home
