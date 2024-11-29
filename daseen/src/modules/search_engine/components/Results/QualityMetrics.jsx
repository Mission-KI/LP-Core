import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ReactComponent as LockOpenMetricIcon } from '../../../common/assets/img/metric_icons/lock-open.svg';
import datetimeImg from '../../../common/assets/img/metric_icons/datetime-attribute_w.png';
import { ReactComponent as TemporalFrequencyMetricIcon } from '../../../common/assets/img/metric_icons/temporal-frequency.svg';
import DataTypeConsestencyMetricIcon from '../../../common/assets/img/metric_icons/data-type-consistant_w.png';
import AttributeConsestencyMetricIcon from '../../../common/assets/img/metric_icons/attribute-consistant_w.png';
import SignificantVarianceMetricIcon from '../../../common/assets/img/metric_icons/significant-variance_w.png';
import { calculateAttributeConsistency } from "../../../dataset/utils/calculations";
import { Unlock, Gear, ClipboardCheck, Soundwave, Calendar, Broadcast, Activity, Sliders2, Sliders2Vertical, Lock } from "react-bootstrap-icons";

const QualityMetrics = ({ dataset }) => {
    return (
        <div className='d-flex'>
            {dataset?._source?.freely_available ? (
                <div className="">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Open access</Tooltip>}
                    >
                        <div>
                            <Unlock />
                        </div>
                    </OverlayTrigger>
                </div>
            ) : (
                <div className="">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Open access</Tooltip>}
                    >
                        <div>
                            <Lock />
                        </div>
                    </OverlayTrigger>
                </div>
            )}
            {dataset?._source?.structuredDatasets[0]?.datetimeColumnCount > 0 && (
                <div className="ps-2">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Date time attribute</Tooltip>}
                    >
                        <div>
                            <Calendar />
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
                            <Soundwave />
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
                        <Sliders2Vertical />
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
                            <Sliders2 />
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
                        <Activity />
                    </div>
                </OverlayTrigger>
            </div>
            <div className="ps-2">
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>
                            {dataset._source.assetProcessingStatus === 'Original Data'
                                ? 'Unverarbeitete, direkt aus den Quellen stammende Daten'
                                : dataset._source.assetProcessingStatus === 'Processed Data'
                                    ? 'Redefinierte, konvertierte und semantisch bereinigte sowie transformierte Daten, die eine verbesserte Struktur und höhere Konsistenz aufweisen'
                                    : dataset._source.assetProcessingStatus === 'Refined Data'
                                        ? 'Feature Engineered und aggregierte Daten. Optimierte und zusammengefasste Datensätze für KI-Training'
                                        : dataset._source.assetProcessingStatus === 'KI/ML Data'
                                            ? 'KI/ML generierte Ergebnisdatensätze'
                                            : 'Unbekannter Datenstatus'}
                        </Tooltip>
                    }
                >
                    <span
                        className={`asset-processing-status ${dataset._source.assetProcessingStatus === 'Original Data'
                            ? 'danger'
                            : dataset._source.assetProcessingStatus === 'Processed Data'
                                ? 'warning'
                                : dataset._source.assetProcessingStatus === 'Refined Data'
                                    ? 'success'
                                    : 'primary'
                            }`}
                    >
                        {dataset._source.assetProcessingStatus}
                    </span>
                </OverlayTrigger>

            </div>
        </div>
    );
}

export default QualityMetrics;
