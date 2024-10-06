import React, { useState, useEffect } from 'react';
import MainSearchBar from '../../components/Search/MainSearchBar';
import Results from '../../components/Results/Results';
import { getDatasets } from '../../api/elastic';
import { useLocation, useNavigate } from 'react-router-dom';
import Paginator from '../../components/widgets/Paginator';
import logo from '../../assets/img/brand/logo.webp';
import Filters from '../../components/Filters/Filters';

function Home() {
  const [datasets, setDatasets] = useState({});
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const pageCount = Math.ceil(datasets.hits?.total?.value / resultsPerPage) || 0;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page')) || 1;
    const params = {};
    queryParams.forEach((value, key) => {
      params[key] = value;
    });

    setCurrentPage(page);
    setSearchParams(params);
  }, [location]);

  useEffect(() => {
    const fetchDatasets = async () => {
      setLoading(true);
      try {
        const from = (currentPage - 1) * resultsPerPage;
        const fetchedDatasets = await getDatasets(from, resultsPerPage, searchParams);
        setDatasets(fetchedDatasets);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, [searchParams, currentPage]);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    navigate(`?page=${newPage}&${new URLSearchParams(searchParams)}`);
  };

  return (
    <div className="pb-4 px-5" style={{ maxWidth: 1300 }}>
      <div className="row">
        <div className="col-md-2 order-md-1 order-2">
          <Filters />
        </div>
        <div className="col-md-10 order-md-2 order-1">
          <div className='d-flex flex-column mb-5'>
            <a href="/" style={{ width: 'fit-content' }}>
              <img src={logo} alt="" style={{ maxWidth: 150 }} />
            </a>
            <span className='text-muted ps-1 pt-1'>Dataset Search Engine</span>
          </div>
          <MainSearchBar />
          <Results datasets={datasets} loading={loading} />

          <Paginator
            pageCount={pageCount}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
