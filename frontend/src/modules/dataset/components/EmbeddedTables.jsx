import React, { useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ImageView from '../../common/components/ImageView/ImageView';
import $ from 'jquery';
import { useTranslation } from 'react-i18next';
import { imageBasePath } from '../../common/api/config';

function EmbeddedTables({ datasetDetails }) {

    const { t } = useTranslation();

    return (
        <p>No data available for this table.</p>
    );
}

export default EmbeddedTables;