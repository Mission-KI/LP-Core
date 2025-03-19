import { useState } from "react";
import { Dash, Plus } from "react-bootstrap-icons";
import ParentNodeView from "./ParentNodeView";

const TreeNode = ({ node, childrenMap, dataset }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const hasChildren = childrenMap[node.name]?.length > 0;

    return (
        <div>
            <div className="d-flex">
                {hasChildren && (
                    <div className="pe-3">
                        <button className="btn border px-1 p-0" onClick={toggleExpand} style={{ cursor: "pointer" }}>
                            {hasChildren && (isExpanded ? <Dash /> : <Plus />)}
                        </button>
                    </div>
                )}

                <div>
                    <div>
                        {node.parent == null ? (
                            <div className="pb-2">
                                <ParentNodeView dataset={dataset} />
                            </div>
                        ) : (
                            <div>
                                <p className="txt-primary h6 pt-3">{node.name}</p>
                            </div>
                        )}
                    </div>
                    {isExpanded && hasChildren && (
                        <div>
                            {childrenMap[node.name].map((child) => (
                                <TreeNode key={child.name} node={child} childrenMap={childrenMap} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TreeNode