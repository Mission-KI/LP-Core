import Dataset from "./Dataset";

const EDP = ({ edp, datasetTree }) => {
  if (!datasetTree) return null;

  // Build the tree structure (mapping parents to children)
  const childrenMap = {};
  let rootNodes = [];

  datasetTree.forEach((item) => {
    const parentRef = item.parent?.["$ref"];
    if (!parentRef) {
      rootNodes.push(item);
    } else {
      const parentName = datasetTree.find(
        (d) => `#/datasetTree/${datasetTree.indexOf(d)}` === parentRef,
      )?.name;
      if (parentName) {
        childrenMap[parentName] = childrenMap[parentName] || [];
        childrenMap[parentName].push(item);
      }
    }
  });

  return (
    <div className="w-100 d-flex flew-column">
      {rootNodes.map((node) => (
        <Dataset
          key={node.name}
          node={node}
          childrenMap={childrenMap}
          edp={edp}
        />
      ))}
    </div>
  );
};

export default EDP;
