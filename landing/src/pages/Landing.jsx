import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { useCategories } from '../utils/categories';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import HeroSection from '../components/HeroSection/HeroSection';
import { useTranslation } from 'react-i18next';
import { TilesContainer } from "react-tiles-dnd";
import "../../node_modules/react-tiles-dnd/esm/index.css";
import { useLocation } from 'react-router';
import Footer from '../components/Footer/Footer';

const LOCAL_STORAGE_KEY = "userCategoriesOrder?v=2";

const Landing = () => {

    const { categories } = useCategories();

    const location = useLocation();
    const [categoriesState, setCategoriesState] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
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
    }, [location]);

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
        <>
            <Header />
            <div className='main-content-wrapper bg-white'>
                <HeroSection />
                <hr />
                <div className="container">
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

                <Footer />

            </div>

        </>

    );
}

export default Landing;
