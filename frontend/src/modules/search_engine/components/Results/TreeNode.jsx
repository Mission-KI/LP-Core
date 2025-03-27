import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, Dash, Plus } from "react-bootstrap-icons";
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
                        <button className="btn btn-hover txt-regular px-1 p-0" onClick={toggleExpand} style={{ cursor: "pointer" }}>
                            {hasChildren && (isExpanded ? <ChevronDown /> : <ChevronRight />)}
                        </button>
                    </div>
                )}

                <div>
                    <div className="pb-3">
                        {node.parent == null ? (
                            <div className="pb-2">
                                <ParentNodeView dataset={dataset} />
                            </div>
                        ) : (
                            <div>
                                <span className="txt-primary h6">{node.name}</span>
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