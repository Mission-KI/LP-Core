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
import { Card } from "react-bootstrap";
import { truncateString } from '../../../common/utils/format_utils'

function ResultItemCard({ dataset }) {
    const [isBookmarkedState, setIsBookmarkedState] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        if (dataset?._id) {
            setIsBookmarkedState(isBookmarked(dataset._id));
        }
    }, [dataset]);

    return (
        <div className="col-md-4 pb-4">
            <Card className="h-100">
                <Card.Body>
                    <div className="d-flex align-items-center">
                        <Link to={`/details/${dataset._id}`} className={styles.title}>
                            {truncateString(dataset._source.name, 25)}
                        </Link>
                        <div className="ps-2">
                            <QuickView dataset={dataset} />
                        </div>
                        <div className="d-flex align-items-center ms-auto">
                            {isBookmarkedState && (
                                <span className="py-1">
                                    <StarFill />
                                </span>
                            )}
                            <DatasetOptionsDropdown
                                dataset={dataset}
                                isBookmarkedState={isBookmarkedState}
                                setIsBookmarkedState={setIsBookmarkedState}
                            />
                        </div>
                    </div>

                    <p className="medium pt-1 txt-lighter overflow-hidden" style={{ height: 48 }}>
                        {dataset._source.description ? (
                            <>{truncateString(dataset._source.description, 70)}</>
                        ) : 'No description provided'}
                    </p>

                    <div className="d-flex justify-content-between mt-3 flex-wrap" style={{ maxWidth: 850 }}>
                        <a
                            href={dataset._source?.dataSpace?.url}
                            target="_blank"
                            className="medium text-muted text-decoration-underline pe-2"
                        >
                            {dataset._source?.dataSpace?.name}
                        </a>

                        <span className="medium text-muted pe-2">Files (CSV)</span>
                        <span className="medium text-muted pe-2">
                            {filesize(dataset?._source?.volume)}
                        </span>
                       
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
}

export default ResultItemCard;
