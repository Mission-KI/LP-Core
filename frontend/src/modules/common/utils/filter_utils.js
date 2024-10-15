export const filterSections = [
    // {
    //     title: "Dataspace",
    //     filters: [
    //         {
    //             label: "GovData",
    //             value: "GovData",
    //             name: "dataSpace.name",
    //             type: "checkbox",
    //         },
    //         {
    //             label: "Medien",
    //             value: "Medien",
    //             name: "dataSpace.name",
    //             type: "checkbox",
    //         },
    //         {
    //             label: "NAP",
    //             value: "NAP",
    //             name: "dataSpace.name",
    //             type: "checkbox",
    //         },
    //         {
    //             label: "Other",
    //             value: "Other",
    //             name: "dataSpace.name",
    //             type: "checkbox",
    //         }
    //     ]
    // },
    {
        title: "Data Format",
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
        filters: [
            {
                label: "Size range (kB)",
                name_1: "min_size",
                name_2: "max_size",
                type: "doublerange",
                minValue: 0,
                maxValue: 1965,
            },
        ]
    },
    {
        title: "Attributes",
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