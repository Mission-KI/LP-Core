import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { useCategories } from '../utils/categories';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import HeroSection from '../components/HeroSection/HeroSection';
import { useTranslation } from 'react-i18next';

const Landing = () => {

    const categories = useCategories();
    const { t } = useTranslation();

    return (
        <>
            <Header />
            <div className='main-content-wrapper bg-white'>
                <HeroSection />
                <hr />
                <div className="container">
                    <h2 className='mt-5 mb-4'>{t('home.categories')}</h2>
                    <div className="row px-1">
                        {categories.map((category) => (
                            <CategoryCard category={category} />
                        ))}
                    </div>
                </div>
            </div>


        </>

    );
}

export default Landing;
