import { useState } from "react";
import { ChevronDown, ChevronRight, FileEarmarkFill, FolderFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const TreeNode = ({ node, datasetDetails, childrenMap, expandedByDefault }) => {
    const [isExpanded, setIsExpanded] = useState(expandedByDefault);

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

                <div className="nowrap">
                    <div>
                        {childrenMap?.[node?.name]?.length > 0 ? <FolderFill className="text-warning me-2" /> : <FileEarmarkFill className="me-2 txt-danger" />}
                        <Link to={`/details/${datasetDetails?._id}/${encodeURIComponent(node?.name)}`} className="hover-underline">
                            {node.name}
                        </Link>
                    </div>
                    {isExpanded && hasChildren && (
                        <div>
                            {childrenMap[node.name].map((child) => (
                                <TreeNode
                                    key={child.name}
                                    datasetDetails={datasetDetails}
                                    node={child}
                                    childrenMap={childrenMap}
                                    expandedByDefault={expandedByDefault}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TreeNode