import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, Dash, Plus } from "react-bootstrap-icons";
import { truncateString } from "../../../common/utils/format_utils";

const TreeNode = ({ node, childrenMap, dataset }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const hasChildren = childrenMap[node.name]?.length > 0;

    return (
        <div>
            <div className="d-flex pt-3">
                {hasChildren && (
                    <div className="pe-3">
                        <button className="btn btn-hover txt-regular px-1 p-0" onClick={toggleExpand} style={{ cursor: "pointer" }}>
                            {hasChildren && (isExpanded ? <ChevronDown /> : <ChevronRight />)}
                        </button>
                    </div>
                )}

                <div>
                    <div>
                        {childrenMap?.[node?.name]?.length > 0 ? (isExpanded ? "📂 " : "📁 ") : "📄 "} 
                        {truncateString(node.name, 15)}
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