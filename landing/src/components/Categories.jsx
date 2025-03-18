import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { TilesContainer } from "react-tiles-dnd";
import { useCategories } from '../utils/categories';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import CategoryCard from './CategoryCard/CategoryCard';

const Categories = () => {

    const LOCAL_STORAGE_KEY = "userCategoriesOrder?v=2";
    const location = useLocation();
    const [categoriesState, setCategoriesState] = useState([]);
    const { categories, loading } = useCategories();
    const { t } = useTranslation();

    useEffect(() => {
        if (!loading) {
            const savedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedOrder) {
                const parsedOrder = JSON.parse(savedOrder);
                const orderedCategories = parsedOrder
                    .map(id => categories.find(category => category.id === id))
                    .filter(Boolean);
                setCategoriesState(orderedCategories.length > 0 ? orderedCategories : categories);
            } else {
                setCategoriesState(categories);
            }
        }
    }, [loading, location]);

    if (loading) {
        return <div style={{ height: '70vh' }}
            className="d-flex align-items-center justify-content-center">
            <Spinner animation="border" />
        </div>;
    }

    const saveOrderToLocalStorage = (newOrder) => {
        const categoryOrder = newOrder.map(category => category.id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categoryOrder));
    };

    const onReorderTiles = (newOrder) => {
        setCategoriesState(newOrder);
        saveOrderToLocalStorage(newOrder);
    };

    const renderTileFunction = ({ data, isDragging }) => (
        <CategoryCard category={data} isDragging={isDragging} />
    );

    return (
        <div>
            <h3 className='mt-5 mb-4 bold'>{t('home.categories')}</h3>
            <TilesContainer
                data={categoriesState}
                renderTile={renderTileFunction}
                forceTileWidth={250}
                forceTileHeight={280}
                className="w-100 row"
                onReorderTiles={onReorderTiles}
            />
        </div>
    );
}

export default Categories;
