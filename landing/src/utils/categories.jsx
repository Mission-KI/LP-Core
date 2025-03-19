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
import bast from '../assets/img/dataspace_logos/logo_bast.png?v=2';
import govdata from '../assets/img/dataspace_logos/logo_govdata.png';
import mobilithek from '../assets/img/dataspace_logos/logo_mobilithek.png';
import mobility from '../assets/img/dataspace_logos/logo_mobility-data-space.png';
import collect from '../assets/img/dataspace_logos/logo_toll-collect.png';
import { useState, useEffect } from "react";
import { getPublisherAssetCounts } from '../api/elastic';

export const useCategories = () => {
    const { t } = useTranslation();
    const [publisherAssetCounts, setPublisherAssetCounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublisherAssetCounts = async () => {
            const response = await getPublisherAssetCounts();
            setPublisherAssetCounts(response?.aggregations?.by_ds_and_pub?.multi_terms_agg?.buckets || []);
        };
        fetchPublisherAssetCounts();
    }, []);

    useEffect(() => {
        if (publisherAssetCounts.length === 0) return;

        const getAssetCount = (publisher, dataspace) => {
            const match = publisherAssetCounts?.find(
                (item) => item.key_as_string === `${publisher}|${dataspace}`
            );
            return match ? match.doc_count : 0;
        };

        const updatedCategories = [
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
                        "amount_of_assets": getAssetCount("BASt", "GovData"),
                        "dataspace_filters": ["GovData"],
                        "publisher_filters": ["BASt"]
                    },
                    {
                        "id": 2,
                        "name": "Mobility Data Space",
                        "image": mobility,
                        "amount_of_publishers": 1,
                        "amount_of_assets": getAssetCount("NVBW - Nahverkehrsgesellschaft Baden-Württemberg mbH ", "Mobility Data Space"),
                        "dataspace_filters": ["Mobility Data Space"],
                        "publisher_filters": ["NVBW - Nahverkehrsgesellschaft Baden-Württemberg mbH "]
                    },
                    {
                        "id": 3,
                        "name": "mobilithek",
                        "image": mobilithek,
                        "amount_of_publishers": 2,
                        "amount_of_assets": getAssetCount("Toll Collect GmbH", "mobilithek") + getAssetCount("Autobahn GmbH", "mobilithek"),
                        "dataspace_filters": ["mobilithek"],
                        "publisher_filters": ["Toll Collect GmbH", "Autobahn GmbH"]
                    },
                    {
                        "id": 4,
                        "name": "BASt",
                        "image": bast,
                        "amount_of_publishers": 1,
                        "amount_of_assets": getAssetCount("BASt", "GovData"),
                        "dataspace_filters": [],
                        "publisher_filters": ["BASt"]
                    },
                    {
                        "id": 5,
                        "name": "Toll Collect",
                        "image": collect,
                        "amount_of_publishers": 1,
                        "amount_of_assets": getAssetCount("Toll Collect GmbH", "mobilithek"),
                        "dataspace_filters": ["mobilithek"],
                        "publisher_filters": ["Toll Collect GmbH"]
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
                "amount_of_assets": getAssetCount("Transparenzportal Hamburg", "GovData"),
                "image": EnvironmentImg,
                "tiles": [
                    {
                        "id": 1,
                        "name": "GovData",
                        "image": govdata,
                        "amount_of_publishers": 1,
                        "amount_of_assets": getAssetCount("Transparenzportal Hamburg", "GovData"),
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
                        "amount_of_assets": 
                            getAssetCount("BASt", "GovData") + 
                            getAssetCount("Open-Data Schleswig-Holstein", "GovData") + 
                            getAssetCount("Transparenzportal Hamburg", "GovData") +
                            getAssetCount("Offene Daten KDVZ Rhein-Erft-Rur", "GovData") + 
                            getAssetCount("Bayrisches Landesamt für Statistik", "GovData") + 
                            getAssetCount("Landesdatenbank NRW", "GovData") +
                            getAssetCount("Freistaat Bayern", "GovData") +
                            getAssetCount("Statistisches Bundesamt", "GovData") +
                            getAssetCount("Statistik Nord", "GovData"),
                        "dataspace_filters": ["GovData"],
                        "publisher_filters": ["BASt", "Open-Data Schleswig-Holstein", "Transparenzportal Hamburg", "Offene Daten KDVZ Rhein-Erft-Rur", "Bayrisches Landesamt für Statistik", "Landesdatenbank NRW", "Freistaat Bayern", "Statistisches Bundesamt", "Statistik Nord"]
                    },
                    {
                        "id": 2,
                        "name": "BASt",
                        "image": bast,
                        "amount_of_publishers": 1,
                        "amount_of_assets": getAssetCount("BASt", "GovData"),
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

        setCategories(updatedCategories);
        setLoading(false);
    }, [publisherAssetCounts, t]);

    const getCategoryBySlug = (slug) => {
        return categories.find(category => category.slug === slug);
    };

    return { categories, getCategoryBySlug, loading };
};