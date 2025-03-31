import TreeNode from "./TreeNode";

const EdpStructure = ({ datasetDetails, datasetTree, expandedByDefault=false }) => {
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
                    datasetDetails={datasetDetails}
                    node={node}
                    childrenMap={childrenMap}
                    expandedByDefault={expandedByDefault}
                />
            ))}
        </div>
    );
};

export default EdpStructure;