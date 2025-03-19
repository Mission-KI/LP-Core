import TreeNode from "./TreeNode";

const EdpStructure = ({ dataset, datasetTree }) => {
    if (!datasetTree) return null;

    const childrenMap = {};
    let rootNodes = [];

    datasetTree.forEach((item) => {
        const parentRef = item.parent?.["$ref"];
        if (!parentRef) {
            rootNodes.push(item);
        } else {
            const parentName = datasetTree.find((d) => `#/datasetTree/${datasetTree.indexOf(d)}` === parentRef)?.name;
            if (parentName) {
                childrenMap[parentName] = childrenMap[parentName] || [];
                childrenMap[parentName].push(item);
            }
        }
    });

    return (
        <div className="w-100 d-flex flew-column">
            {rootNodes.map((node) => (
                <TreeNode
                    key={node.name}
                    node={node}
                    childrenMap={childrenMap}
                    dataset={dataset}
                />
            ))}
        </div>
    );
};

export default EdpStructure;