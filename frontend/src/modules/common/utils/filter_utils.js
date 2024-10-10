export const filterSections = [
    {
        title: "Dataspace",
        filters: [
            {
                label: "variety DS",
                value: "variety DS",
                name: "dataSpace.name",
                type: "checkbox",
            },
            {
                label: "TestDataSpace",
                value: "TestDataSpace",
                name: "dataSpace.name",
                type: "checkbox",
            },
            {
                label: "Medien",
                value: "Medien",
                name: "dataSpace.name",
                type: "checkbox",
            },
            {
                label: "NAP",
                value: "NAP",
                name: "dataSpace.name",
                type: "checkbox",
            },
            {
                label: "Other",
                value: "Other",
                name: "dataSpace.name",
                type: "checkbox",
            }
        ]
    },
    {
        title: "Data Format",
        filters: [
            {
                label: "Video & Image",
                value: "Video & Image",
                name: "data_format",
                type: "checkbox",
            },
            {
                label: "Audio",
                value: "Audio",
                name: "data_format",
                type: "checkbox",
            },
            {
                label: "Documents",
                value: "Documents",
                name: "data_format",
                type: "checkbox",
            },
            {
                label: "Graphs",
                value: "Graphs",
                name: "data_format",
                type: "checkbox",
            }
        ]
    },
    {
        title: "File size",
        filters: [
            {
                label: "Size range (MB)",
                name_1: "min_size",
                name_2: "max_size",
                type: "doublerange",
                minValue: 0,
                maxValue: 1000,
            },
        ]
    },
]