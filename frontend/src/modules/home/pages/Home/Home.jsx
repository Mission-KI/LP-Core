import React, { useState } from 'react';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import { useTranslation } from 'react-i18next';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import MobilityImg from '../../../common/assets/img/categories/tile-01_mobility.jpg';
import ManufacturingImg from '../../../common/assets/img/categories/tile-02_manufacturing.jpg';
import MedicineImg from '../../../common/assets/img/categories/tile-03_pharma_medicine.jpg';
import EnvironmentImg from '../../../common/assets/img/categories/tile-04_environment_agriculture_food.jpg';
import GovernmentImg from '../../../common/assets/img/categories/tile-05_government.jpg';
import GeomapsImg from '../../../common/assets/img/categories/tile-06_geomaps_meteo.jpg';
import EnergyImg from '../../../common/assets/img/categories/tile-07_energy.jpg';
import CultureImg from '../../../common/assets/img/categories/tile-08_culture_media.jpg';
import ScienceImg from '../../../common/assets/img/categories/tile-09_education_science.jpg';

const Home = () => {
    const { t } = useTranslation();

    const [categories, setCategories] = useState([
        { id: 1, name: "Mobilität und Verkehr", image: MobilityImg },
        { id: 2, name: "Industrie und Produktion", image: ManufacturingImg },
        { id: 3, name: "Gesundheit, Pharma und Medizin", image: MedicineImg },
        { id: 4, name: "Umwelt, Ernährung und Landwirtschaft", image: EnvironmentImg },
        { id: 5, name: "Verwaltung und öffentliche Hand", image: GovernmentImg },
        { id: 6, name: "Geodaten und Wetter", image: GeomapsImg },
        { id: 7, name: "Energie", image: EnergyImg },
        { id: 8, name: "Kultur und Medien", image: CultureImg },
        { id: 9, name: "Bildung, Forschung und Wissenschaft", image: ScienceImg },
    ]);

    return (
        <div className="container pb-4" style={{ maxWidth: 1050 }}>
            <div className='d-flex justify-content-between mb-5'>
                <a href="/" className='text-decoration-none h2' style={{ width: 'fit-content' }}>{t('page.title')}</a>
                <LanguageSelector />
            </div>

            <MainSearchBar />

            <div className="row mt-5">
                {categories.map((category) => (
                    <CategoryCard category={category} key={category.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;
