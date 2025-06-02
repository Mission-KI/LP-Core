import MobilityImg from "../assets/img/categories/tile-01_mobility.jpg";
import ManufacturingImg from "../assets/img/categories/tile-02_manufacturing.jpg";
import MedicineImg from "../assets/img/categories/tile-03_pharma_medicine.jpg";
import EnvironmentImg from "../assets/img/categories/tile-04_environment_agriculture_food.jpg";
import GovernmentImg from "../assets/img/categories/tile-05_government.jpg";
import GeomapsImg from "../assets/img/categories/tile-06_geomaps_meteo.jpg";
import EnergyImg from "../assets/img/categories/tile-07_energy.jpg";
import CultureImg from "../assets/img/categories/tile-08_culture_media.jpg";
import ScienceImg from "../assets/img/categories/tile-09_education_science.jpg";
import RealestateImg from "../assets/img/categories/tile-10_finance_and_realestate.jpg";
import { useTranslation } from "react-i18next";
import autobahn from "../assets/img/dataspace_logos/logo_autobahn-gmbh.png";
import bast from "../assets/img/dataspace_logos/logo_bast.png?v=2";
import govdata from "../assets/img/dataspace_logos/logo_govdata.png";
import mobilithek from "../assets/img/dataspace_logos/logo_mobilithek.png";
import mobility from "../assets/img/dataspace_logos/logo_mobility-data-space.png";
import collect from "../assets/img/dataspace_logos/logo_toll-collect.png";
import { useState, useEffect } from "react";
import { getPublisherAssetCounts } from "../api/elastic";
import pangaea from "../assets/img/dataspace_logos/pangaea.png";
import geoportal from "../assets/img/dataspace_logos/geoportal.png";
import konstanz from "../assets/img/dataspace_logos/konstanz.jpg";
import genesis from "../assets/img/dataspace_logos/logo_genesis_online.png";
import pontusx from "../assets/img/dataspace_logos/logo_pontusx.jpg";

export const useCategories = () => {
  const { t } = useTranslation();
  const [publisherAssetCounts, setPublisherAssetCounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublisherAssetCounts = async () => {
      const response = await getPublisherAssetCounts();
      setPublisherAssetCounts(
        response?.aggregations?.by_ds_and_pub?.multi_terms_agg?.buckets || [],
      );
    };
    fetchPublisherAssetCounts();
  }, []);

  useEffect(() => {
    if (publisherAssetCounts.length === 0) return;

    const getAssetCount = (publisher, dataspace) => {
      const match = publisherAssetCounts?.find(
        (item) => item.key_as_string === `${publisher}|${dataspace}`,
      );
      return match ? match.doc_count : 0;
    };

    const updatedCategories = [
      {
        id: 1,
        title: t("categories.mobilityAndTransportation"),
        slug: "mobility-and-transportation",
        amount_of_publishers: 5,
        amount_of_assets:
          getAssetCount("BASt", "GovData") +
          getAssetCount(
            "NVBW - Nahverkehrsgesellschaft Baden-Württemberg mbH",
            "Mobility Data Space",
          ) +
          getAssetCount("Toll Collect GmbH", "mobilithek") +
          getAssetCount("Autobahn GmbH", "mobilithek") +
          getAssetCount("EuProGigant", "Pontus-X"),
        image: MobilityImg,
        tiles: [
          {
            id: 1,
            name: "GovData",
            title: t("dataSpaces.govdata.title"),
            description: t("dataSpaces.govdata.description"),
            image: govdata,
            amount_of_publishers: 1,
            amount_of_assets: getAssetCount("BASt", "GovData"),
            dataspace_filters: ["GovData"],
            publisher_filters: ["BASt"],
            is_publisher: false,
          },
          {
            id: 2,
            title: t("dataSpaces.mobility.title"),
            description: t("dataSpaces.mobility.description"),
            name: "Mobility",
            image: mobility,
            amount_of_publishers: 1,
            amount_of_assets: getAssetCount(
              "NVBW - Nahverkehrsgesellschaft Baden-Württemberg mbH",
              "Mobility Data Space",
            ),
            dataspace_filters: ["Mobility Data Space"],
            publisher_filters: [
              "NVBW - Nahverkehrsgesellschaft Baden-Württemberg mbH",
            ],
            is_publisher: false,
          },
          {
            id: 3,
            name: "Mobilithek",
            title: t("dataSpaces.mobilithek.title"),
            description: t("dataSpaces.mobilithek.description"),
            image: mobilithek,
            amount_of_publishers: 2,
            amount_of_assets:
              getAssetCount("Toll Collect GmbH", "mobilithek") +
              getAssetCount("Autobahn GmbH", "mobilithek"),
            dataspace_filters: ["mobilithek"],
            publisher_filters: ["Toll Collect GmbH", "Autobahn GmbH"],
            is_publisher: false,
          },
          {
            id: 4,
            name: "BASt",
            title: t("publishers.bast.title"),
            description: t("publishers.bast.description"),
            image: bast,
            amount_of_publishers: 1,
            amount_of_assets: getAssetCount("BASt", "GovData"),
            dataspace_filters: [],
            publisher_filters: ["BASt"],
            is_publisher: true,
          },
          {
            id: 5,
            name: "Toll Collect GmbH",
            title: t("publishers.tollcollect.title"),
            description: t("publishers.tollcollect.description"),
            image: collect,
            amount_of_publishers: 1,
            amount_of_assets: getAssetCount("Toll Collect GmbH", "mobilithek"),
            dataspace_filters: ["mobilithek"],
            publisher_filters: ["Toll Collect GmbH"],
            is_publisher: true,
          },
          {
            id: 6,
            name: "Autobahn",
            title: t("publishers.autobahn.title"),
            description: t("publishers.autobahn.description"),
            image: autobahn,
            amount_of_publishers: 1,
            amount_of_assets: 0,
            dataspace_filters: [],
            publisher_filters: ["Autobahn GmbH"],
            is_publisher: true,
          },
          {
            id: 7,
            name: "Pontus-X",
            title: t("dataSpaces.pontusx.title"),
            description: t("dataSpaces.pontusx.description"),
            image: pontusx,
            amount_of_publishers: 1,
            amount_of_assets:
              getAssetCount("EuProGigant", "Pontus-X"),
            dataspace_filters: ["Pontus-X"],
            publisher_filters: ["EuProGigant"],
            is_publisher: false,
          },
        ],
      },
      {
        id: 2,
        title: t("categories.industryAndProduction"),
        slug: "industry-and-production",
        amount_of_publishers: 0,
        amount_of_assets: 0,
        image: ManufacturingImg,
        tiles: [],
      },
      {
        id: 3,
        title: t("categories.health"),
        slug: "health-pharmaceuticals-and-medicine",
        amount_of_publishers: 0,
        amount_of_assets: 0,
        image: MedicineImg,
        tiles: [],
      },
      {
        id: 4,
        title: t("categories.environment"),
        slug: "environment-food-and-agriculture",
        amount_of_publishers: 1,
        amount_of_assets: getAssetCount("Transparenzportal Hamburg", "GovData"),
        image: EnvironmentImg,
        tiles: [
          {
            id: 1,
            name: "GovData",
            title: t("dataSpaces.govdata.title"),
            description: t("dataSpaces.govdata.description"),
            image: govdata,
            amount_of_publishers: 1,
            amount_of_assets: getAssetCount(
              "Transparenzportal Hamburg",
              "GovData",
            ),
            dataspace_filters: ["GovData"],
            publisher_filters: ["Transparenzportal Hamburg"],
            is_publisher: true,
          },
        ],
      },
      {
        id: 5,
        title: t("categories.administration"),
        slug: "administration-and-public-sector",
        image: GovernmentImg,
        amount_of_publishers: 9,
        amount_of_assets:
          getAssetCount("BASt", "GovData") +
          getAssetCount("Open-Data Schleswig-Holstein", "GovData") +
          getAssetCount("Transparenzportal Hamburg", "GovData") +
          getAssetCount("Offene Daten KDVZ Rhein-Erft-Rur", "GovData") +
          getAssetCount("Bayrisches Landesamt für Statistik", "GovData") +
          getAssetCount("Landesdatenbank NRW", "GovData") +
          getAssetCount("Freistaat Bayern", "GovData") +
          getAssetCount("Statistisches Bundesamt", "GovData") +
          getAssetCount("Statistik Nord", "GovData"),
        tiles: [
          {
            id: 1,
            name: "GovData",
            title: t("dataSpaces.govdata.title"),
            description: t("dataSpaces.govdata.description"),
            image: govdata,
            amount_of_publishers: 9,
            amount_of_assets:
              getAssetCount("BASt", "GovData") +
              getAssetCount("Open-Data Schleswig-Holstein", "GovData") +
              getAssetCount("Transparenzportal Hamburg", "GovData") +
              getAssetCount("Offene Daten KDVZ Rhein-Erft-Rur", "GovData") +
              getAssetCount("Bayrisches Landesamt für Statistik", "GovData") +
              getAssetCount("Landesdatenbank NRW", "GovData") +
              getAssetCount("Freistaat Bayern", "GovData") +
              getAssetCount("Statistisches Bundesamt", "GovData") +
              getAssetCount("Statistik Nord", "GovData"),
            dataspace_filters: ["GovData"],
            publisher_filters: [
              "BASt",
              "Open-Data Schleswig-Holstein",
              "Transparenzportal Hamburg",
              "Offene Daten KDVZ Rhein-Erft-Rur",
              "Bayrisches Landesamt für Statistik",
              "Landesdatenbank NRW",
              "Freistaat Bayern",
              "Statistisches Bundesamt",
              "Statistik Nord",
            ],
            is_publisher: false,
          },
          {
            id: 2,
            name: "Stadt Konstanz",
            title: t("dataSpaces.konstanz.title"),
            description: t("dataSpaces.konstanz.description"),
            image: konstanz,
            amount_of_publishers: 1,
            amount_of_assets: getAssetCount(
              "Stadt Konstanz",
              "Offene Daten Konstanz",
            ),
            dataspace_filters: [],
            publisher_filters: ["Stadt Konstanz"],
            is_publisher: true,
          },
          {
            id: 3,
            name: "BASt",
            title: t("publishers.bast.title"),
            description: t("publishers.bast.description"),
            image: bast,
            amount_of_publishers: 1,
            amount_of_assets: getAssetCount("BASt", "GovData"),
            dataspace_filters: [],
            publisher_filters: ["BASt"],
            is_publisher: true,
          },
        ],
      },
      {
        id: 6,
        title: t("categories.geodata"),
        slug: "geodata-and-weather",
        amount_of_publishers: 2,
        image: GeomapsImg,
        amount_of_assets:
          getAssetCount("PANGAEA", "Geoportal.de") +
          getAssetCount("Statistisches Bundesamt", "GENESIS-Online"),
        tiles: [
          {
            id: 1,
            image: pangaea,
            name: "PANGAEA",
            title: t("publishers.pangaea.title"),
            description: t("publishers.pangaea.description"),
            amount_of_publishers: 1,
            amount_of_assets: getAssetCount("PANGAEA", "Geoportal.de"),
            dataspace_filters: [],
            publisher_filters: ["PANGAEA"],
            is_publisher: true,
          },
          {
            id: 2,
            image: geoportal,
            name: "Geoportal.de",
            title: t("dataSpaces.geoportal.title"),
            description: t("dataSpaces.geoportal.description"),
            amount_of_publishers: 1,
            amount_of_assets: getAssetCount("PANGAEA", "Geoportal.de"),
            dataspace_filters: ["Geoportal.de"],
            publisher_filters: ["PANGAEA"],
            is_publisher: false,
          },
          {
            id: 3,
            image: genesis,
            name: "GENESIS-Online",
            title: t("dataSpaces.genesis.title"),
            description: t("dataSpaces.genesis.description"),
            amount_of_publishers: 1,
            amount_of_assets: getAssetCount(
              "Statistisches Bundesamt", "GENESIS-Online"),
            dataspace_filters: ["GENESIS-Online"],
            publisher_filters: ["Statistisches Bundesamt"],
            is_publisher: false,
          },
        ],
      },
      {
        id: 7,
        title: t("categories.energy"),
        slug: "energy",
        image: EnergyImg,
        amount_of_publishers: 0,
        amount_of_assets: 0,
        tiles: [],
      },
      {
        id: 8,
        title: t("categories.culture"),
        slug: "culture-and-media",
        image: CultureImg,
        amount_of_publishers: 0,
        amount_of_assets: 0,
        tiles: [],
      },
      {
        id: 9,
        title: t("categories.education"),
        slug: "education-research-and-science",
        image: ScienceImg,
        amount_of_publishers: 0,
        amount_of_assets: 0,
        tiles: [],
      },
      {
        id: 10,
        title: t("categories.realestate"),
        slug: "real-estate-and-finance",
        image: RealestateImg,
        amount_of_publishers: 0,
        amount_of_assets: 0,
        tiles: [],
      },
    ];

    setCategories(updatedCategories);
    setLoading(false);
  }, [publisherAssetCounts, t]);

  const getCategoryBySlug = (slug) => {
    return categories.find((category) => category.slug === slug);
  };

  return { categories, getCategoryBySlug, loading };
};
