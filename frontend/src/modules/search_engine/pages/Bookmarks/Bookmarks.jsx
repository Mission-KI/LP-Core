import React, { useState, useEffect } from 'react';
import ResultItem from '../../components/Results/ResultItem';
import { getBookmarkedDatasets } from '../../../common/api/elastic';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import { useTranslation } from 'react-i18next';

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

    console.log(bookmarks);

    if (loading) {
        return "loading"
    }


    return (

        <div className="container pb-4" style={{ maxWidth: 1050 }}>
            <div className='d-flex justify-content-between mb-5'>
                <a href="/" className='text-decoration-none h2' style={{ width: 'fit-content' }}>{t('common.bookmarks')}</a>
                <LanguageSelector />
            </div>


            {bookmarks?.hits?.hits?.map((dataset) =>
                <ResultItem dataset={dataset} key={dataset._id} />
            )}
        </div>

    );
}

export default Bookmarks;
