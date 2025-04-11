import React from "react";
import styles from "./Results.module.css";
import EDP from "./EDP";

function ResultItem({ edp }) {
  return (
    <div className={styles.resultItem}>
      <div className="w-md-100 pe-3">
        <EDP edp={edp} datasetTree={edp?._source?.datasetTree} />
      </div>
    </div>
  );
}

export default ResultItem;
