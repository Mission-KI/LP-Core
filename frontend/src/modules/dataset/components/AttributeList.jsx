import React, { useEffect } from 'react';
import $ from 'jquery';
import { useTranslation } from 'react-i18next';

function AttributeList({ datasetDetails }) {
    useEffect(() => {
        const table = $('#attributeTable').DataTable({
            paging: false,
            searching: true,
            info: true,
            lengthChange: false,
            pageLength: 20,
            order: [[0, 'asc']],
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
                <table id="attributeTable" className='table table-bordered'>
                    <thead>
                        <tr>
                            <th className='small py-2 bgc-primary text-white'>{t('table.attributes.attribute')}</th>
                            <th className='small py-2 bgc-primary text-white'>{t('table.attributes.type')}</th>
                            <th className='small py-2 bgc-primary text-white'>{t('table.attributes.specification')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datasetDetails?._source?.structuredDatasets?.[0]?.numericColumns.map((column, index) => (
                            <tr key={index}>
                                <td>{column.name}</td>
                                <td>numeric</td>
                                <td>{column.dataType}</td>
                            </tr>
                        ))}
                        {datasetDetails?._source?.structuredDatasets?.[0]?.stringColumns.map((column, index) => (
                            <tr key={index}>
                                <td>{column.name}</td>
                                <td>string</td>
                                <td>string</td>
                            </tr>
                        ))}
                        {datasetDetails?._source?.structuredDatasets?.[0]?.datetimeColumns.map((column, index) => (
                            <tr key={index}>
                                <td>{column.name}</td>
                                <td>date/time</td>
                                <td>date/time</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AttributeList;
