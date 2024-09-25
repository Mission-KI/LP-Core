import React from 'react'
import SearchBar from '../../components/Search/SearchBar'
import Results from '../../components/Results/Results'

function Home() {
    return (
        <div className="container py-5" style={{ maxWidth: 1000 }}>
           
            <h3 className='mb-5'>Dataset Search Engine</h3>

            <SearchBar />
            <Results />

        </div>
    )
}

export default Home
