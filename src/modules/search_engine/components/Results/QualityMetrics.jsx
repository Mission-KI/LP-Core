import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ReactComponent as LockOpenMetricIcon } from '../../../common/assets/img/metric_icons/lock-open.svg';
import { ReactComponent as DatetimeMetricIcon } from '../../../common/assets/img/metric_icons/datetime-attribute.svg';
import { ReactComponent as TemporalFrequencyMetricIcon } from '../../../common/assets/img/metric_icons/temporal-frequency.svg';
import DataTypeConsestencyMetricIcon from '../../../common/assets/img/metric_icons/data-type-consistant.png';
import { ReactComponent as AttributeConsestencyMetricIcon } from '../../../common/assets/img/metric_icons/attribute-consistant.svg';
import { ReactComponent as SignificantVarianceMetricIcon } from '../../../common/assets/img/metric_icons/significant-variance.svg';
import { calculateAttributeConsistency } from "../../../dataset/utils/calculations";
import { Lock } from "react-bootstrap-icons";

const QualityMetrics = ({ dataset }) => {
    return (
        <div className='d-flex align-items-center'>
            <div className="">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Open access</Tooltip>}
                >
                    <div>
                        <LockOpenMetricIcon />
                    </div>
                </OverlayTrigger>
            </div>
            {dataset?._source?.structuredDatasets[0]?.datetimeColumnCount > 0 && (
                <div className="ps-2">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Date time attribute</Tooltip>}
                    >
                        <div>
                            <DatetimeMetricIcon />
                        </div>
                    </OverlayTrigger>
                </div>
            )}
            {dataset?._source?.periodicity && (
                <div className="ps-2">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Temporal frequency</Tooltip>}
                    >
                        <div>
                            <TemporalFrequencyMetricIcon />
                        </div>
                    </OverlayTrigger>
                </div>
            )}
            <div className="ps-2">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Data type consistency</Tooltip>}
                >
                    <div>
                        <img src={DataTypeConsestencyMetricIcon} style={{ height: 18 }} />
                    </div>
                </OverlayTrigger>
            </div>
            {calculateAttributeConsistency(dataset) == 'consistent' && (
                <div className="ps-2">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Attribute consistency</Tooltip>}
                    >
                        <div>
                            <AttributeConsestencyMetricIcon />
                        </div>
                    </OverlayTrigger>
                </div>
            )}
            <div className="ps-2">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Significant variance</Tooltip>}
                >
                    <div>
                        <SignificantVarianceMetricIcon />
                    </div>
                </OverlayTrigger>
            </div>
            <div className="ps-2">
                <span
                    className={`asset-processing-status ${dataset._source.assetProcessingStatus === 'Original Data' ? 'danger' :
                        dataset._source.assetProcessingStatus === 'Processed Data' ? 'warning' :
                            dataset._source.assetProcessingStatus === 'Refined Data' ? 'success' : 'primary'}`}
                >
                    {dataset._source.assetProcessingStatus}
                </span>
            </div>
        </div>
    );
}

export default QualityMetrics;
