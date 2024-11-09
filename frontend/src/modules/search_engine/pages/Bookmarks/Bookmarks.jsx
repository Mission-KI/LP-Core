import React, { useState, useEffect } from 'react';
import { getBookmarkedDatasets, getDatasets } from '../../../common/api/elastic';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultItem from '../../components/Results/ResultItem';
import { useTranslation } from 'react-i18next';

const Bookmarks = () => {

    const [bookmarks, setBookmarks] = useState({});
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
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


    return (
        <div>
            {bookmarks?.hits?.hits?.map((dataset) =>
                <ResultItem dataset={dataset} key={dataset._id} bookmarks={bookmarks} setBookmarks={setBookmarks} />
            )}
        </div>
    );
}

export default Bookmarks;
