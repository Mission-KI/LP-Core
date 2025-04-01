import React from "react";
import styles from "./Results.module.css";
import TreeView from "./TreeView";

function ResultItem({ dataset }) {

  return (
    <div className={styles.resultItem}>
      <div className="w-md-100 pe-3">

        <TreeView
          dataset={dataset}
          datasetTree={dataset?._source?.datasetTree}
        />
      </div>
    </div>
  );
}

export default ResultItem;
