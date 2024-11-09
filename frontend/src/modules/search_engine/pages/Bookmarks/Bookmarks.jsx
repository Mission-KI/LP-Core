import React, { useState, useEffect } from 'react';
import ResultItem from '../../components/Results/ResultItem';
import { getBookmarkedDatasets } from '../../../common/api/elastic';

const Bookmarks = () => {

    const [bookmarks, setBookmarks] = useState({});
    const [loading, setLoading] = useState(true);

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
        <div>

            <h1>Bookmarks</h1>

            {bookmarks?.hits?.hits?.map((dataset) =>
                <ResultItem dataset={dataset} key={dataset._id} />
            )}
        </div>
    );
}

export default Bookmarks;
