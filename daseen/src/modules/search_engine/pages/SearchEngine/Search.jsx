import React, { useState, useEffect } from 'react';
import Results from '../../components/Results/Results';
import { getDatasets } from '../../../common/api/elastic';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroSection from '../../components/HeroSection/HeroSection';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import MainHeader from '../../components/MainHeader/MainHeader';

function Search() {

  const { t } = useTranslation();

  const [datasets, setDatasets] = useState({});
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 12;
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const pageCount = Math.ceil(datasets.hits?.total?.value / resultsPerPage) || 0;
  const [showMainHeader, setShowMainHeader] = useState(false);

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
        const fetchedDatasets = await getDatasets(from, resultsPerPage);
        setDatasets(fetchedDatasets);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    fetchDatasets();

  }, [searchParams, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setShowMainHeader(true);
      } else {
        setShowMainHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    navigate(`?page=${newPage}&${new URLSearchParams(searchParams)}`);
  };

  return (
    <>

      <div className={`header-container ${showMainHeader ? "visible" : ""}`}>
        <MainHeader />
      </div>

      <div>
        <HomeHeader />
        <HeroSection datasets={datasets} />
        <div className="container pb-4" style={{ maxWidth: 1100 }}>
          <Results datasets={datasets}
            loading={loading}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />

        </div>
      </div>



    </>

  );
}

export default Search;
