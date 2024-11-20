import MobilityImg from '../../common/assets/img/categories/tile-01_mobility.jpg';
import ManufacturingImg from '../../common/assets/img/categories/tile-02_manufacturing.jpg';
import MedicineImg from '../../common/assets/img/categories/tile-03_pharma_medicine.jpg';
import EnvironmentImg from '../../common/assets/img/categories/tile-04_environment_agriculture_food.jpg';
import GovernmentImg from '../../common/assets/img/categories/tile-05_government.jpg';
import GeomapsImg from '../../common/assets/img/categories/tile-06_geomaps_meteo.jpg';
import EnergyImg from '../../common/assets/img/categories/tile-07_energy.jpg';
import CultureImg from '../../common/assets/img/categories/tile-08_culture_media.jpg';
import ScienceImg from '../../common/assets/img/categories/tile-09_education_science.jpg';
import { useTranslation } from 'react-i18next';

export const useCategories = () => {
    const { t } = useTranslation();

    return [
        {
            id: 1,
            name: t('categories.mobilityAndTransportation'),
            image: MobilityImg,
            noOfDataSources: 25,
        },
        {
            id: 2,
            name: t('categories.industryAndProduction'),
            image: ManufacturingImg,
            noOfDataSources: 17
        },
        {
            id: 3,
            name: t('categories.health'),
            image: MedicineImg,
            noOfDataSources: 33
        },
        {
            id: 4,
            name: t('categories.environment'),
            image: EnvironmentImg,
            noOfDataSources: 25
        },
        {
            id: 5,
            name: t('categories.administration'),
            image: GovernmentImg,
            noOfDataSources: 17
        },
        {
            id: 6,
            name: t('categories.geodata'),
            image: GeomapsImg,
            noOfDataSources: 33
        },
        {
            id: 7,
            name: t('categories.energy'),
            image: EnergyImg,
            noOfDataSources: 25
        },
        {
            id: 8,
            name: t('categories.culture'),
            image: CultureImg,
            noOfDataSources: 17
        },
        {
            id: 9,
            name: t('categories.education'),
            image: ScienceImg,
            noOfDataSources: 33
        },
    ];
};
