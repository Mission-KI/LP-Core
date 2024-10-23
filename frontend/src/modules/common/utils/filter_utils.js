export const filterSections = [
    {
        title: "Dataspace",
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
        title: "Licenses",
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
        title: "Data Format",
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
        title: "File size",
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
        title: "Attributes",
        type: "doublerange",
        filters: [
            {
                label: "Lines",
                name_1: "min_lines",
                name_2: "max_lines",
                type: "doublerange",
                minValue: 0,
                maxValue: 8785,
            },
            {
                label: "Columns",
                name_1: "min_columns",
                name_2: "max_columns",
                type: "doublerange",
                minValue: 0,
                maxValue: 57,
            },
        ]
    },
]