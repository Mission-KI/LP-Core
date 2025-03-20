import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Results.module.css";
import moment from "moment";
import QuickView from "./QuickView";
import DatasetOptionsDropdown from "./DatasetOptionsDropdown";
import { isBookmarked } from "../../../common/utils/bookmarks";
import { StarFill } from "react-bootstrap-icons";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";
import QualityMetrics from "./QualityMetrics";
import { truncateString } from "../../../common/utils/format_utils";
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
