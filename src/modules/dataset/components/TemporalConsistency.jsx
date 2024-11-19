import React, { useEffect } from 'react';
import $ from 'jquery';
import { useTranslation } from 'react-i18next';

function TemporalConsistency({ datasetDetails }) {
    useEffect(() => {
        const table = $('#temporalConsistencyTable').DataTable({
            paging: false,
            searching: true,
            info: true,
            lengthChange: false,
            pageLength: 20,
            order: [],
            responsive: true,
        });

        return () => {
            table.destroy();
        };
    }, []);

    const { t } = useTranslation();

    return (
        <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
            <div className="table-responsive">
                <table id="temporalConsistencyTable" className='table table-bordered'>
                    <thead>
                        <tr>
                            <th className='small py-2 bgc-primary text-white w-33'>{t('table.attributes.attribute')}</th>
                            <th className='small py-2 bgc-primary text-white w-33'>{t('table.attributes.freq')}</th>
                            <th className='small py-2 bgc-primary text-white w-33' style={{ textAlign: 'left' }}>{t('table.attributes.gaps')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datasetDetails?._source?.structuredDatasets[0]?.datetimeColumns.map((column) => (
                            column?.gaps.map((gap, index) => (
                                <tr key={index} className='hover'>
                                    <td className='w-33'>{column.name}</td>
                                    <td className='w-33'>{gap.timeScale}</td>
                                    <td className='w-33'>{gap.numberOfGaps}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TemporalConsistency;
