export const filterSections = [
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
        ]
    },
    {
        title: "licenses",
        type: "checkboxes",
        filters: [
            {
                label: "dl-by-de/2.0",
                value: "https://www.dcat-ap.de/def/licenses/20210721.html#dl-by-de/2.0",
                name: "licenseId",
                type: "checkbox",
            },
        ]
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
        ]
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
        ]
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
        ]
    },
]