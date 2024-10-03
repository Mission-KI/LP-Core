import React, { useState, useEffect } from 'react';
import MainSearchBar from '../../components/Search/MainSearchBar';
import Results from '../../components/Results/Results';
import { getDatasets } from '../../api/elastic';
import { useLocation, useNavigate } from 'react-router-dom';
import Paginator from '../../components/widgets/Paginator';
import { Spinner } from 'react-bootstrap';

function Home() {
  const [datasets, setDatasets] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const pageCount = Math.ceil(datasets.hits?.total?.value / resultsPerPage) || 0;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page')) || 1;
    const q = queryParams.get('q') || '';

    setCurrentPage(p => page);
    setSearchTerm(q);
  }, [location]);

  useEffect(() => {
    const fetchDatasets = async () => {
      setLoading(true);
      try {
        const from = (currentPage - 1) * resultsPerPage;
        const fetchedDatasets = await getDatasets(from, resultsPerPage, searchTerm);
        setDatasets(fetchedDatasets);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, [currentPage, searchTerm]);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(p => newPage);
    navigate(`?page=${newPage}&q=${searchTerm}`);
  };

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ height: 450 }}>
        <Spinner variant='primary' />
      </div>
    );
  }

  return (
    <>
      <MainSearchBar />
      <Results datasets={datasets} />

      <Paginator
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
}

export default Home;
