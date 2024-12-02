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
import autobahn from '../assets/img/dataspace_logos/logo_autobahn-gmbh.png';
import bast from '../assets/img/dataspace_logos/logo_bast.png';
import flugsicherung from '../assets/img/dataspace_logos/logo_deutsche_flugsicherung.png';
import govdata from '../assets/img/dataspace_logos/logo_govdata.png';
import mobilithek from '../assets/img/dataspace_logos/logo_mobilithek.png';
import mobility from '../assets/img/dataspace_logos/logo_mobility-data-space.png';
import collect from '../assets/img/dataspace_logos/logo_toll-collect.png';

export const useCategories = () => {
    const { t } = useTranslation();

    const categories = [
        {
            "id": 1,
            "name": t('categories.mobilityAndTransportation'),
            "slug": "mobility-and-transportation",
            "amount_of_publishers": 4,
            "amount_of_assets": 13181,
            "image": MobilityImg,
            "tiles": [
                {
                    "id": 1,
                    "name": "GovData",
                    "image": govdata,
                    "amount_of_publishers": 1,
                    "amount_of_assets": 13162,
                    "dataspace_filters": ["GovData"],
                    "publisher_filters": ["BASt"]
                },
                {
                    "id": 2,
                    "name": "Mobility Data Space",
                    "image": mobility,
                    "amount_of_publishers": 1,
                    "amount_of_assets": 9,
                    "dataspace_filters": ["Mobility Data Space"],
                    "publisher_filters": ["NVBW - Nahverkehrsgesellschaft Baden-Württemberg mbH"]
                },
                {
                    "id": 3,
                    "name": "mobilithek",
                    "image": mobilithek,
                    "amount_of_publishers": 2,
                    "amount_of_assets": 1,
                    "dataspace_filters": ["mobilithek"],
                    "publisher_filters": ["Toll Collect", "Autobahn GmbH"]
                },
                {
                    "id": 4,
                    "name": "BASt",
                    "image": bast,
                    "amount_of_publishers": 1,
                    "amount_of_assets": 13171,
                    "dataspace_filters": [],
                    "publisher_filters": ["BASt"]
                },
                {
                    "id": 5,
                    "name": "Toll Collect",
                    "image": collect,
                    "amount_of_publishers": 1,
                    "amount_of_assets": 1,
                    "dataspace_filters": [],
                    "publisher_filters": ["Toll Collect"]
                },
                {
                    "id": 6,
                    "name": "Autobahn GmbH",
                    "image": autobahn,
                    "amount_of_publishers": 1,
                    "amount_of_assets": 0,
                    "dataspace_filters": [],
                    "publisher_filters": ["Autobahn GmbH"]
                },
            ]
        },
        {
            "id": 2,
            "name": t('categories.industryAndProduction'),
            "slug": "industry-and-production",
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "image": ManufacturingImg,
            "tiles": []
        },
        {
            "id": 3,
            "name": t('categories.health'),
            "slug": "health-pharmaceuticals-and-medicine",
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "image": MedicineImg,
            "tiles": []
        },
        {
            "id": 4,
            "name": t('categories.environment'),
            "slug": "environment-food-and-agriculture",
            "amount_of_publishers": 1,
            "amount_of_assets": 4896,
            "image": EnvironmentImg,
            "tiles": [
                {
                    "id": 1,
                    "name": "GovData",
                    "image": govdata,
                    "amount_of_publishers": 1,
                    "amount_of_assets": 4896,
                    "dataspace_filters": ["GovData"],
                    "publisher_filters": ["Transparenzportal Hamburg"]
                }
            ]
        },
        {
            "id": 5,
            "name": t('categories.administration'),
            "slug": "administration-and-public-sector",
            "image": GovernmentImg,
            "amount_of_publishers": 9,
            "amount_of_assets": 51327,
            "tiles": [
                {
                    "id": 1,
                    "name": "GovData",
                    "image": govdata,
                    "amount_of_publishers": 9,
                    "amount_of_assets": 51327,
                    "dataspace_filters": ["GovData"],
                    "publisher_filters": ["BASt", "Open-Data Schleswig-Holstein", "Transparenzportal Hamburg", "Offene Daten KDVZ Rhein-Erft-Rur", "Bayrisches Landesamt für Statistik", "Landesdatenbank NRW", "Freistaat Bayern"]
                },
                {
                    "id": 2,
                    "name": "BASt",
                    "image": bast,
                    "amount_of_publishers": 1,
                    "amount_of_assets": 13171,
                    "dataspace_filters": [],
                    "publisher_filters": ["BASt"]
                }
            ]
        },
        {
            "id": 6,
            "name": t('categories.geodata'),
            "slug": "geodata-and-weather",
            "amount_of_publishers": 0,
            "image": GeomapsImg,
            "amount_of_assets": 0,
            "tiles": []
        },
        {
            "id": 7,
            "name": t('categories.energy'),
            "slug": "energy",
            "image": EnergyImg,
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "tiles": []
        },
        {
            "id": 8,
            "name": t('categories.culture'),
            "slug": "culture-and-media",
            "image": CultureImg,
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "tiles": []
        },
        {
            "id": 9,
            "name": t('categories.education'),
            "slug": "education-research-and-science",
            "image": ScienceImg,
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "tiles": []
        },
        {
            "id": 10,
            "name": t('categories.realestate'),
            "slug": "real-estate-and-finance",
            "image": RealestateImg,
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "tiles": []
        }
    ];

    const getCategoryBySlug = (slug) => {
        return categories.find(category => category.slug === slug);
    };

    const getDataspaceByCategoryAndSlug = (categorySlug, dataspaceSlug) => {
        const category = categories.find(category => category.slug === categorySlug);
        if (!category) return null;

        const dataspace = category.dataspaces.find(dataspace => dataspace.slug === dataspaceSlug);
        return dataspace || null;
    };

    return { categories, getCategoryBySlug, getDataspaceByCategoryAndSlug };
};
