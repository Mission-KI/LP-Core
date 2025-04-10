import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Results.module.css";
import QuickView from "../QuickView/QuickView";
import DatasetOptionsDropdown from "./DatasetOptionsDropdown";
import { isBookmarked } from "../../../common/utils/bookmarks";
import { StarFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import { truncateString } from '../../../common/utils/format_utils'
import QualityMetrics from "./QualityMetrics";

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
            <Card className="h-100 border">
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

                    <p className="medium pt-1 txt-lighter overflow-hidden" style={{ height: 68 }}>
                        {dataset._source.description ? (
                            <>{truncateString(dataset._source.description, 70)}</>
                        ) : 'No description provided'}
                    </p>

                    <div className="pt-2">
                        <QualityMetrics dataset={dataset} />
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
}

export default ResultItemCard;
