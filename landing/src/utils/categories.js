import MobilityImg from '../assets/img/categories/tile-01_mobility.jpg';
import ManufacturingImg from '../assets/img/categories/tile-02_manufacturing.jpg';
import MedicineImg from '../assets/img/categories/tile-03_pharma_medicine.jpg';
import EnvironmentImg from '../assets/img/categories/tile-04_environment_agriculture_food.jpg';
import GovernmentImg from '../assets/img/categories/tile-05_government.jpg';
import GeomapsImg from '../assets/img/categories/tile-06_geomaps_meteo.jpg';
import EnergyImg from '../assets/img/categories/tile-07_energy.jpg';
import CultureImg from '../assets/img/categories/tile-08_culture_media.jpg';
import ScienceImg from '../assets/img/categories/tile-09_education_science.jpg';
import RealestateImg from '../assets/img/categories/tile-10_finance_and_realestate.jpg';
import { useTranslation } from 'react-i18next';

export const useCategories = () => {
    const { t } = useTranslation();

    return [
        {
            id: 1,
            name: t('categories.mobilityAndTransportation'),
            slug: "mobility-and-transportation",
            image: MobilityImg,
            noOfDataSources: 25,
        },
        {
            id: 2,
            name: t('categories.industryAndProduction'),
            slug: "industry-and-production",
            image: ManufacturingImg,
            noOfDataSources: 17
        },
        {
            id: 3,
            name: t('categories.health'),
            slug: "health-pharmaceuticals-and-medicine",
            image: MedicineImg,
            noOfDataSources: 33
        },
        {
            id: 4,
            name: t('categories.environment'),
            slug: "environment-food-and-agriculture",
            image: EnvironmentImg,
            noOfDataSources: 25
        },
        {
            id: 5,
            name: t('categories.administration'),
            slug: "administration-and-public-sector",
            image: GovernmentImg,
            noOfDataSources: 17
        },
        {
            id: 6,
            name: t('categories.geodata'),
            slug: "geodata-and-weather",
            image: GeomapsImg,
            noOfDataSources: 33
        },
        {
            id: 7,
            name: t('categories.energy'),
            slug: "energy",
            image: EnergyImg,
            noOfDataSources: 25
        },
        {
            id: 8,
            name: t('categories.culture'),
            slug: "culture-and-media",
            image: CultureImg,
            noOfDataSources: 17
        },
        {
            id: 9,
            name: t('categories.education'),
            slug: "education-research-and-science",
            image: ScienceImg,
            noOfDataSources: 33
        },
        {
            id: 10,
            name: t('categories.realestate'),
            slug: "real-estate-and-finance",
            image: RealestateImg,
            noOfDataSources: 33
        },
    ];
};
