import React, { useState, useEffect } from 'react';
import { getBookmarkedDatasets } from '../../../common/api/elastic';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import { StarHalf } from 'react-bootstrap-icons';
import ResultItem from '../../../search_engine/components/Results/ResultItem';

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
                <Spinner variant="dark" />
            </div>
        );
    }


    return (
        <div className="container pb-4">
            <h2 className='bold mb-5'>{t('bookmarks.bookmarks')}</h2>

            {bookmarks?.hits?.hits?.length > 0 ? (
                bookmarks.hits.hits.map((dataset) => (
                    <ResultItem dataset={dataset} key={dataset._id} />
                ))
            ) : (
                <div className='d-flex flex-column align-items-center justify-content-center mt-5 pt-5'>
                    <StarHalf className='text-muted mt-5' style={{ fontSize: '50pt' }} />
                    <h5 className='mt-4 txt-lighter' style={{ fontWeight: '400' }}>{t('bookmarks.noBookmarks')}</h5>
                </div>
            )}
        </div>
    );
}

export default Bookmarks;
