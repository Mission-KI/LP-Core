import React, { useState, useEffect } from 'react'
import SearchBar from '../../components/Search/SearchBar'
import Results from '../../components/Results/Results'
import logo from '../../assets/img/brand/logo.webp'
import Paginator from '../../components/widgets/Paginator'
import { getDatasets } from '../../api/elastic'

function Home() {

    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        const fetchDatasets = async () => {
          try {
            const fetchedDatasets = await getDatasets();
            setDatasets(fetchedDatasets);
          } catch (error) {
            console.error('Error fetching :', error);
          }
        };
    
        fetchDatasets();
      }, []);

    return (
        <div className="container pb-4" style={{ maxWidth: 1000 }}>

            <div className='d-flex flex-column mb-5'>
                <img src={logo} alt="" style={{ maxWidth: 150 }} />
                <span className='text-muted ps-1 pt-1'>Dataset Search Engine</span>
            </div>

            <SearchBar />
            <Results datasets={datasets} />

            {/* <Paginator /> */}

        </div>
    )
}

export default Home
