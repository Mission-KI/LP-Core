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
                label: "Min size (MB)",
                name: "min_size",
                type: "range",
                minValue: 1,
                maxValue: 5,
                defaultValue: 1,
            },
            {
                label: "Max size (MB)",
                name: "max_size",
                type: "range",
                minValue: 1,
                maxValue: 5,
                defaultvalue: 5,
            }
        ]
    },
]