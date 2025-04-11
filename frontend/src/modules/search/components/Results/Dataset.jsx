import { useState } from "react";
import { ChevronDown, ChevronRight } from "react-bootstrap-icons";
import ParentNodeView from "./ParentNodeView";
import { Link } from "react-router-dom";

const Dataset = ({ node, childrenMap, edp }) => {
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
            <button
              className="btn btn-hover txt-regular px-1 p-0"
              onClick={toggleExpand}
              style={{ cursor: "pointer" }}
            >
              {hasChildren && (isExpanded ? <ChevronDown /> : <ChevronRight />)}
            </button>
          </div>
        )}

        <div>
          <div className="pb-3">
            {node.parent == null ? (
              <div className="pb-2">
                <ParentNodeView edp={edp} />
              </div>
            ) : (
              <Link
                to={`/details/${edp?._id}/${encodeURIComponent(node?.name)}`}
                className="txt-primary hover-underline"
              >
                {node.name}
              </Link>
            )}
          </div>
          {isExpanded && hasChildren && (
            <div>
              {childrenMap[node.name].map((child) => (
                <Dataset
                  key={child.name}
                  node={child}
                  childrenMap={childrenMap}
                  edp={edp}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dataset;
