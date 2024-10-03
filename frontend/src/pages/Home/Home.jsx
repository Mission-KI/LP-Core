import React, { useState, useEffect } from 'react';
import MainSearchBar from '../../components/Search/MainSearchBar';
import Results from '../../components/Results/Results';
import logo from '../../assets/img/brand/logo.webp';
import { getDatasets } from '../../api/elastic';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Paginator from '../../components/widgets/Paginator';

function Home() {
  const [datasets, setDatasets] = useState({});
  const [filteredDatasets, setFilteredDatasets] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const location = useLocation();
  const navigate = useNavigate();
  const pageCount = Math.ceil(datasets.hits?.total?.value / resultsPerPage) || 0;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page')) || 1;
    setCurrentPage(page);
  }, [location.search]);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const from = (currentPage - 1) * resultsPerPage;
        const fetchedDatasets = await getDatasets(from, resultsPerPage);
        setDatasets(fetchedDatasets);
        setFilteredDatasets(fetchedDatasets);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchDatasets();
  }, [currentPage]);


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');

    if (q !== null) {
      setSearchTerm(q);
    } else {
      setSearchTerm('');
    }


  }, [location.search]);


  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDatasets(datasets);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      console.log("Search term is: " + lowercasedSearchTerm);

      const filteredHits = datasets.hits?.hits?.filter(dataset => {
        try {
          return dataset?._source?.name?.toLowerCase().includes(lowercasedSearchTerm);
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

    }

  }, [searchTerm, datasets]);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    <div className="container pb-4" style={{ maxWidth: 1000 }}>
      <div className='d-flex flex-column mb-5'>
        <img src={logo} alt="" style={{ maxWidth: 150 }} />
        <span className='text-muted ps-1 pt-1'>Dataset Search Engine</span>
      </div>

      <MainSearchBar setSearchTerm={setSearchTerm} />
      <Results datasets={filteredDatasets} />

      <Paginator
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Home;
