export const filters = [
    {
        label: "Dataspace",
        type: "checkbox",
        name: "dataspace",
        options:
            [
                "MDS",
                "Medien",
                "NAP",
                "Other",
            ]
    },
    {
        label: "File size",
        type: "range",
        name: "file_size",
    },
    {
        label: "Data Structure",
        type: "checkbox",
        name: "data_structure",
        options:
            [
                "Video & Image",
                "Audio",
                "Documents",
                "Graphs",
            ]
    },

]