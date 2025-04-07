import React from "react";
import styles from "./Results.module.css";
import EDP from "./EDP";

function ResultItem({ dataset }) {

  return (
    <div className={styles.resultItem}>
      <div className="w-md-100 pe-3">

        <EDP
          dataset={dataset}
          datasetTree={dataset?._source?.datasetTree}
        />
      </div>
    </div>
  );
}

export default ResultItem;
