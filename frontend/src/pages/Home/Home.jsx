import React, { useState, useEffect } from 'react';
import MainSearchBar from '../../components/Search/MainSearchBar';
import Results from '../../components/Results/Results';
import logo from '../../assets/img/brand/logo.webp';
import { getDatasets } from '../../api/elastic';

function Home() {
  const [datasets, setDatasets] = useState({});
  const [filteredDatasets, setFilteredDatasets] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const fetchedDatasets = await getDatasets();
        setDatasets(fetchedDatasets);
        setFilteredDatasets(fetchedDatasets);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };
    fetchDatasets();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDatasets(datasets);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      console.log("Search term is: " + lowercasedSearchTerm);

      const filteredHits = datasets.hits?.hits?.filter(dataset => {
        try {
          const datasetBody = JSON.parse(dataset._source.body);
          return datasetBody.name.toLowerCase().includes(lowercasedSearchTerm);
        } catch (error) {
          console.error('Error parsing dataset body:', error);
          return false;
        }
      }) || [];

      setFilteredDatasets({
        ...datasets,
        hits: {
          ...datasets.hits,
          hits: filteredHits,
        },
      });

      console.log(filteredHits);
    }
  }, [searchTerm, datasets]);

  return (
    <div className="container pb-4" style={{ maxWidth: 1000 }}>
      <div className='d-flex flex-column mb-5'>
        <img src={logo} alt="" style={{ maxWidth: 150 }} />
        <span className='text-muted ps-1 pt-1'>Dataset Search Engine</span>
      </div>

      <MainSearchBar setSearchTerm={setSearchTerm} />
      <Results datasets={filteredDatasets} />

      {/* <Paginator /> */}
    </div>
  );
}

export default Home;
