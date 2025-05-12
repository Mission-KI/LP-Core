import { useState } from "react";
import { ChevronDown, ChevronRight } from "react-bootstrap-icons";
import ParentNodeView from "./ParentNodeView";
import { Link } from "react-router-dom";
import QuickView from "../QuickView/QuickView";
import { resolveDataset } from "../../../dataset/utils/edp_utils";
import QualityMetrics from "./QualityMetrics";

const Dataset = ({ node, childrenMap, edp }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const hasChildren = childrenMap[node.name]?.length > 0;
  const datasetRef = node.dataset["$ref"];
  const dataset = resolveDataset(edp, datasetRef);

  return (
    <div className="d-flex w-100">
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

      <div className="w-100">
        <div className="pb-3">
          {node.parent == null ? (
            <div className="pb-2">
              <ParentNodeView edp={edp} node={node} />
            </div>
          ) : (
            <div className="d-flex align-items-center flex-wrap">
              <Link
                to={`/details/${edp?._id}/${encodeURIComponent(node?.name)}`}
                className="txt-primary hover-underline"
              >
                {node.name}
              </Link>

              <div className="ps-2 pe-4">
                <QuickView
                  edp={edp}
                  datasetRef={datasetRef}
                  dataset={dataset}
                  node={node}
                />
              </div>
              <QualityMetrics
                edp={edp}
                datasetRef={datasetRef}
                dataset={dataset}
              />
            </div>
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
  );
};

export default Dataset;
