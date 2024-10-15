import React, { useState, useEffect } from 'react';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import Results from '../../components/Results/Results';
import { getBookmarkedDatasets, getDatasets } from '../../../common/api/elastic';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isBookmarked } from '../../../common/utils/bookmarks';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';

function Search() {

  const { t } = useTranslation();

  const [datasets, setDatasets] = useState({});
  const [bookmarks, setBookmarks] = useState({});
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
      }
    };

    fetchDatasets();

    const fetchBookmarks = async () => {
      try {
        const fetchedBookmarks = await getBookmarkedDatasets();
        setBookmarks(fetchedBookmarks);

      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
    fetchBookmarks();

  }, [searchParams, currentPage]);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    navigate(`?page=${newPage}&${new URLSearchParams(searchParams)}`);
  };

  return (
    <div className="container pb-4" style={{ maxWidth: 1050 }}>
      <div className='d-flex justify-content-between mb-5'>
        <a href="/" className='text-decoration-none h2' style={{ width: 'fit-content' }}>{t('page.title')}</a>
        <LanguageSelector />
      </div>

      <MainSearchBar datasets={datasets} />

      <Results datasets={datasets}
        loading={loading}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />

    </div>
  );
}

export default Search;
