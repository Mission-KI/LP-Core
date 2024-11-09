import React, { useState, useEffect } from 'react';
import ResultItem from '../../components/Results/ResultItem';
import { getBookmarkedDatasets } from '../../../common/api/elastic';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Bookmarks = () => {

    const [bookmarks, setBookmarks] = useState({});
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {

        const fetchBookmarks = async () => {
            setLoading(true);
            try {
                const fetchedBookmarks = await getBookmarkedDatasets();
                setBookmarks(fetchedBookmarks);

            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();

    }, []);


    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "90vh" }}
            >
                <Spinner variant="primary" />
            </div>
        );
    }


    return (

        <div className="container pb-4" style={{ maxWidth: 1050 }}>
            <Link to="/"><ArrowLeft className='me-1' /> return home</Link>
            <div className='d-flex justify-content-between mb-5 mt-2'>
                <a className='text-decoration-none h2' style={{ width: 'fit-content' }}>{t('common.bookmarks')}</a>
                <LanguageSelector />
            </div>


            {bookmarks?.hits?.hits?.map((dataset) =>
                <ResultItem dataset={dataset} key={dataset._id} />
            )}
        </div>

    );
}

export default Bookmarks;
