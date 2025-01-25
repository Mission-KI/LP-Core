import { useState, useEffect } from "react";
import { getFilterValues } from "../api/elastic";
import { LockFill, Soundwave, UnlockFill, Calendar, Activity, Sliders2, Clipboard, GraphUpArrow } from 'react-bootstrap-icons';

export const useFilterSections = () => {
    const [dataSpaces, setDataSpaces] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        const fetchFilterValues = async () => {
            try {
                const response = await getFilterValues();
                setDataSpaces(response?.aggregations?.distinct_dataSpace_names?.buckets);
                setLicenses(response?.aggregations?.distinct_license_names?.buckets);
                setPublishers(response?.aggregations?.distinct_publisher_names?.buckets);
            } catch (error) {
                console.error("Error fetching dataSpaces and licenses:", error);
            }
        };

        fetchFilterValues();
    }, []);

    const filters = [
        {
            title: "dataspaces",
            type: "checkboxes",
            filters: dataSpaces.map(dataSpace => ({
                label: dataSpace.key,
                value: dataSpace.key,
                name: "dataSpace.name",
                type: "checkbox"
            })),
        },
        {
            title: "publisher",
            type: "checkboxes",
            filters: publishers.map(publisher => ({
                label: publisher.key,
                value: publisher.key,
                name: "publisher.name",
                type: "checkbox"
            })),
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
            filters: licenses.map(license => ({
                label: license.key,
                value: license.key,
                name: "license.name",
                type: "checkbox"
            })),
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
            title: "accessibility",
            type: "radio",
            filters: [
                {
                    label: <><UnlockFill /></>,
                    value: "true",
                    name: "freely_available",
                    type: "radio",
                },
                {
                    label: <><LockFill /></>,
                    value: "false",
                    name: "freely_available",
                    type: "radio",
                }
            ],
        },
        {
            title: "",
            type: "single_icon",
            filters: [
                {
                    label: "hasDatetimeAttribute",
                    icon: <><Calendar /></>,
                    value: "true",
                    name: "hasDatetimeAttribute",
                    type: "checkbox",
                },
            ],
        },
        {
            title: "",
            type: "single_icon",
            filters: [
                {
                    label: "hasTemporalFrequency",
                    icon: <><Soundwave /></>,
                    value: "true",
                    name: "hasTemporalFrequency",
                    type: "checkbox",
                },
            ],
        },
        {
            title: "",
            type: "single_icon",
            filters: [
                {
                    label: "dataTypeConsistency",
                    icon: <><Sliders2 /></>,
                    value: "true",
                    name: "dataTypeConsistency",
                    type: "checkbox",
                },
            ],
        },
        // {
        //     title: "",
        //     type: "single_icon",
        //     filters: [
        //         {
        //             label: "attributeConsistency",
        //             icon: <><Clipboard /></>,
        //             value: "true",
        //             name: "attributeConsistency",
        //             type: "checkbox",
        //         },
        //     ],
        // },
        {
            title: "",
            type: "single_icon",
            filters: [
                {
                    label: "significantVariance",
                    icon: <><Activity /></>,
                    value: "true",
                    name: "significantVariance",
                    type: "checkbox",
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
    ];

    return filters;
};