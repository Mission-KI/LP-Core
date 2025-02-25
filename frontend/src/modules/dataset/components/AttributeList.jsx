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
                <table id="attributeTable" className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th className='py-2 w-25'>{t('table.attributes.attribute')}</th>
                            <th className='py-2 w-25'>{t('table.attributes.type')}</th>
                            <th className='py-2 w-25'>{t('table.attributes.specification')}</th>
                            <th className='py-2 w-25'>{t('table.attributes.periodicity')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datasetDetails?._source?.structuredDatasets?.[0]?.numericColumns.map((column, index) => (
                            <tr key={index}>
                                <td className='txt-lighter w-25'>{column.name}</td>
                                <td className='txt-lighter w-25'>numeric</td>
                                <td className='txt-lighter w-25'>{column.dataType}</td>
                                <td className='text-danger w-25'>N/A</td>
                            </tr>
                        ))}
                        {datasetDetails?._source?.structuredDatasets?.[0]?.stringColumns.map((column, index) => (
                            <tr key={index}>
                                <td className='txt-lighter w-25'>{column.name}</td>
                                <td className='txt-lighter w-25'>string</td>
                                <td className='txt-lighter w-25'>string</td>
                                <td className='text-danger w-25'>N/A</td>
                            </tr>
                        ))}
                        {datasetDetails?._source?.structuredDatasets?.[0]?.datetimeColumns.map((column, index) => (
                            <tr key={index}>
                                <td className='txt-lighter w-25'>{column.name}</td>
                                <td className='txt-lighter w-25'>date/time</td>
                                <td className='txt-lighter w-25'>date/time</td>
                                <td className='txt-lighter w-25'>{column.periodicity ?? <span className='text-danger'>N/A</span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AttributeList;
