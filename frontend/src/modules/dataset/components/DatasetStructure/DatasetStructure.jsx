import TreeNode from "./TreeNode";

const DatasetStructure = ({ edp, datasetRef, expandedByDefault = true }) => {
  const datasetTree = edp?._source?.datasetTree || [];

  const rootNode = datasetTree.find(
    (item) => item.dataset["$ref"] === datasetRef,
  );

  if (!rootNode) {
    return <div>No dataset found</div>;
  }

  const childrenMap = {};
  datasetTree.forEach((item) => {
    const parentRef = item.parent?.["$ref"];
    if (parentRef === rootNode.dataset["$ref"]) {
      childrenMap[rootNode.name] = childrenMap[rootNode.name] || [];
      childrenMap[rootNode.name].push(item);
    } else {
      const parentNode = datasetTree.find(
        (d) => `#/datasetTree/${datasetTree.indexOf(d)}` === parentRef,
      );
      if (parentNode) {
        childrenMap[parentNode.name] = childrenMap[parentNode.name] || [];
        childrenMap[parentNode.name].push(item);
      }
    }
  });

  return (
    <div className="w-100 d-flex flex-column">
      <TreeNode
        key={rootNode.name}
        edp={edp}
        node={rootNode}
        childrenMap={childrenMap}
        expandedByDefault={expandedByDefault}
      />
    </div>
  );
};

export default DatasetStructure;
