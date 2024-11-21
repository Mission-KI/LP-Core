import React, { useState, useEffect } from 'react';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import { useTranslation } from 'react-i18next';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import "../../../../../node_modules/react-tiles-dnd/esm/index.css";
import { TilesContainer } from "react-tiles-dnd";
import { useCategories } from '../../utils/categories';
import { useLocation } from 'react-router';

const LOCAL_STORAGE_KEY = "userCategoriesOrder";

const Home = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const initialCategories = useCategories();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const savedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedOrder) {
            const parsedOrder = JSON.parse(savedOrder);

            const orderedCategories = parsedOrder
                .map(id => initialCategories.find(category => category.id === id))
                .filter(Boolean);

            setCategories(orderedCategories.length > 0 ? orderedCategories : initialCategories);
        } else {
            setCategories(initialCategories);
        }
    }, [location]);

    const saveOrderToLocalStorage = (newOrder) => {
        const categoryOrder = newOrder.map(category => category.id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categoryOrder));
    };

    const onReorderTiles = (newOrder) => {
        setCategories(newOrder);
        saveOrderToLocalStorage(newOrder);
    };

    const renderTileFunction = ({ data, isDragging }) => (
        <CategoryCard category={data} isDragging={isDragging} />
    );

    const tileSize = (category) => ({
        colSpan: 1,
        rowSpan: 1
    });

    return (
        <div className="container pb-4" style={{ maxWidth: 1050 }}>
            <div className='d-flex justify-content-between mb-5'>
                <div className='d-flex align-items-center'>
                    <a href="/" className='text-decoration-none h2 mb-0' style={{ width: 'fit-content' }}>{t('page.title')}</a>
                    <span className='badge badge-primary bg-danger ms-2'>Alpha</span>
                </div>
                <LanguageSelector />
            </div>

            <MainSearchBar />

            <div className="mt-5">
                <TilesContainer
                    data={categories}
                    renderTile={renderTileFunction}
                    tileSize={tileSize}
                    forceTileWidth={340}
                    forceTileHeight={230}
                    className="w-100"
                    onReorderTiles={onReorderTiles}
                />
            </div>
        </div>
    );
};

export default Home;
