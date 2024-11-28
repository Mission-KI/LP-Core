import { useState, useEffect } from "react";
import { getDataSpacesList } from "../api/elastic";

export const useFilterSections = () => {
    // const [dataSpaces, setDataSpaces] = useState([]);

    // useEffect(() => {
    //     const fetchDataSpaces = async () => {
    //         try {
    //             const response = await getDataSpacesList();
    //             setDataSpaces(response);
    //         } catch (error) {
    //             console.error("Error fetching dataSpaces:", error);
    //         }
    //     };

    //     fetchDataSpaces();
    // }, []);

    const filters = [
        {
            title: "dataspace",
            type: "checkboxes",
            filters: [
                {
                    label: "GovData",
                    value: "GovData",
                    name: "dataSpace.name",
                    type: "checkbox",
                },
                {
                    label: "Mobility Data Space",
                    value: "Mobility Data Space",
                    name: "dataSpace.name",
                    type: "checkbox",
                },
                {
                    label: "mobilithek",
                    value: "mobilithek",
                    name: "dataSpace.name",
                    type: "checkbox",
                },
            ]
        },
        {
            title: "publisher",
            type: "checkboxes",
            filters: [
                {
                    label: "BASt",
                    value: "BASt",
                    name: "publisher.name",
                    type: "checkbox",
                },
                {
                    label: "Toll Collect",
                    value: "Toll Collect",
                    name: "publisher.name",
                    type: "checkbox",
                },
                {
                    label: "Autobahn GmbH",
                    value: "Autobahn GmbH",
                    name: "publisher.name",
                    type: "checkbox",
                },
            ]
        },
        {
            title: "assetProcessingStatus",
            type: "checkboxes",
            filters: [
                {
                    label: "Original Data",
                    value: "Original Data",
                    name: "assetProcessingStatus",
                    type: "checkbox",
                },
                {
                    label: "Processed Data",
                    value: "Processed Data",
                    name: "assetProcessingStatus",
                    type: "checkbox",
                },
                {
                    label: "Refined Data",
                    value: "Refined Data",
                    name: "assetProcessingStatus",
                    type: "checkbox",
                },
                {
                    label: "AI/ML Result Data",
                    value: "AI/ML Result Data",
                    name: "assetProcessingStatus",
                    type: "checkbox",
                },
            ]
        },
        {
            title: "licenses",
            type: "checkboxes",
            filters: [
                {
                    label: "dl-by-de/2.0",
                    value: "https://www.dcat-ap.de/def/licenses/20210721.html#dl-by-de/2.0",
                    name: "license.name",
                    type: "checkbox",
                },
            ],
        },
        {
            title: "dataFormat",
            type: "checkboxes",
            filters: [
                {
                    label: "Structured",
                    value: "structured",
                    name: "dataTypes",
                    type: "checkbox",
                },
            ],
        },
        {
            title: "fileSize",
            type: "filesize",
            filters: [
                {
                    label: "Size range",
                    name_1: "min_size",
                    name_2: "max_size",
                    type: "doublerange",
                    minValue: 0,
                    maxValue: 100,
                },
            ],
        },
        {
            title: "attributes",
            type: "doublerange",
            filters: [
                {
                    label: "lines",
                    name_1: "min_lines",
                    name_2: "max_lines",
                    type: "doublerange",
                    minValue: 0,
                    maxValue: 8785,
                },
                {
                    label: "columns",
                    name_1: "min_columns",
                    name_2: "max_columns",
                    type: "doublerange",
                    minValue: 0,
                    maxValue: 57,
                },
            ],
        },
    ];

    return filters;
};