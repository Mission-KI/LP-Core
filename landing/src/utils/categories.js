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
            "id": 1,
            "name": t('categories.mobilityAndTransportation'),
            "slug": "mobility-and-transportation",
            "amount_of_publishers": 3,
            "amount_of_assets": 14211,
            "image": MobilityImg,
            "dataspaces": [
                {
                    "id": 1,
                    "name": "GovData",
                    "amount_of_publishers": 1,
                    "amount_of_assets": 14211,
                    "publishers": [
                        {
                            "name": "BASt",
                            "highlighted": true,
                            "amount_of_assets": 14211
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "mobilithek",
                    "amount_of_publishers": 2,
                    "amount_of_assets": 2,
                    "publishers": [
                        {
                            "name": "Toll Collect",
                            "highlighted": true,
                            "amount_of_assets": 0
                        },
                        {
                            "name": "Autobahn GmbH",
                            "highlighted": true,
                            "amount_of_assets": 2
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": t('categories.industryAndProduction'),
            "slug": "industry-and-production",
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "image": ManufacturingImg,
            "dataspaces": []
        },
        {
            "id": 3,
            "name": t('categories.health'),
            "slug": "health-pharmaceuticals-and-medicine",
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "image": MedicineImg,
            "dataspaces": []
        },
        {
            "id": 4,
            "name": t('categories.environment'),
            "slug": "environment-food-and-agriculture",
            "amount_of_publishers": 1,
            "amount_of_assets": 4953,
            "image": EnvironmentImg,
            "dataspaces": [
                {
                    "id": 1,
                    "name": "GovData",
                    "amount_of_publishers": 1,
                    "amount_of_assets": 4953,
                    "publishers": [
                        {
                            "name": "Transparenzportal Hamburg",
                            "highlighted": false,
                            "amount_of_assets": 4953
                        }
                    ]
                }
            ]
        },
        {
            "id": 5,
            "name": t('categories.administration'),
            "slug": "administration-and-public-sector",
            "image": GovernmentImg,
            "amount_of_publishers": 7,
            "amount_of_assets": 30082,
            "dataspaces": [
                {
                    "id": 1,
                    "name": "GovData",
                    "amount_of_publishers": 7,
                    "amount_of_assets": 30082,
                    "publishers": [
                        {
                            "name": "BASt",
                            "highlighted": true,
                            "amount_of_assets": 14211
                        },
                        {
                            "name": "Transparenzportal Hamburg",
                            "highlighted": false,
                            "amount_of_assets": 4953
                        },
                        {
                            "name": "Open-Data Schleswig-Holstein",
                            "highlighted": false,
                            "amount_of_assets": 7816
                        },
                        {
                            "name": "Bayrisches Landesamt für Statistik",
                            "highlighted": false,
                            "amount_of_assets": 0
                        },
                        {
                            "name": "Landesdatenbank NRW",
                            "highlighted": false,
                            "amount_of_assets": 0
                        },
                        {
                            "name": "Freistaat Bayern",
                            "highlighted": false,
                            "amount_of_assets": 0
                        },
                        {
                            "name": "Offene Daten KDVZ Rhein-Erft-Rur",
                            "highlighted": false,
                            "amount_of_assets": 3102
                        }
                    ]
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
            "dataspaces": []
        },
        {
            "id": 7,
            "name": t('categories.energy'),
            "slug": "energy",
            "image": EnergyImg,
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "dataspaces": []
        },
        {
            "id": 8,
            "name": t('categories.culture'),
            "slug": "culture-and-media",
            "image": CultureImg,
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "dataspaces": []
        },
        {
            "id": 9,
            "name": t('categories.education'),
            "slug": "education-research-and-science",
            "image": ScienceImg,
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "dataspaces": []
        },
        {
            "id": 10,
            "name": t('categories.realestate'),
            "slug": "real-estate-and-finance",
            "image": RealestateImg,
            "amount_of_publishers": 0,
            "amount_of_assets": 0,
            "dataspaces": []
        }
    ];
};
