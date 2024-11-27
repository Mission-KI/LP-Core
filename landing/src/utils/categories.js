import MobilityImg from '../assets/img/categories/tile-01_mobility.jpg';
import ManufacturingImg from '../assets/img/categories/tile-02_manufacturing.jpg';
import MedicineImg from '../assets/img/categories/tile-03_pharma_medicine.jpg';
import EnvironmentImg from '../assets/img/categories/tile-04_environment_agriculture_food.jpg';
import GovernmentImg from '../assets/img/categories/tile-05_government.jpg';
import GeomapsImg from '../assets/img/categories/tile-06_geomaps_meteo.jpg';
import EnergyImg from '../assets/img/categories/tile-07_energy.jpg';
import CultureImg from '../assets/img/categories/tile-08_culture_media.jpg';
import ScienceImg from '../assets/img/categories/tile-09_education_science.jpg';
import { useTranslation } from 'react-i18next';

export const useCategories = () => {
    const { t } = useTranslation();

    return [
        {
            id: 1,
            name: t('categories.mobilityAndTransportation'),
            slug: "mobility-and-transportation",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna a",
            image: MobilityImg,
            noOfDataSources: 25,
        },
        {
            id: 2,
            name: t('categories.industryAndProduction'),
            slug: "industry-and-production",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna a",
            image: ManufacturingImg,
            noOfDataSources: 17
        },
        {
            id: 3,
            name: t('categories.health'),
            slug: "health-pharmaceuticals-and-medicine",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna a",
            image: MedicineImg,
            noOfDataSources: 33
        },
        {
            id: 4,
            name: t('categories.environment'),
            slug: "environment-food-and-agriculture",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna a",
            image: EnvironmentImg,
            noOfDataSources: 25
        },
        {
            id: 5,
            name: t('categories.administration'),
            slug: "administration-and-public-sector",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna a",
            image: GovernmentImg,
            noOfDataSources: 17
        },
        {
            id: 6,
            name: t('categories.geodata'),
            slug: "geodata-and-weather",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna a",
            image: GeomapsImg,
            noOfDataSources: 33
        },
        {
            id: 7,
            name: t('categories.energy'),
            slug: "energy",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna a",
            image: EnergyImg,
            noOfDataSources: 25
        },
        {
            id: 8,
            name: t('categories.culture'),
            slug: "culture-and-media",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna a",
            image: CultureImg,
            noOfDataSources: 17
        },
        {
            id: 9,
            name: t('categories.education'),
            slug: "education-research-and-science",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna a",
            image: ScienceImg,
            noOfDataSources: 33
        },
    ];
};
