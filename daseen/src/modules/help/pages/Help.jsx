import React from 'react';
import { useTranslation } from 'react-i18next';
import assetPropertiesImg from '../../common/assets/img/help_topics/asset_properties.webp'

const Help = () => {

    const { t } = useTranslation();

    return (
        <div className='container'>

            <h2 className='bold mb-4'>Help topics</h2>


            <img src={assetPropertiesImg} alt="" style={{ maxWidth: 450 }} className='shadow rounded mb-5' />
            <h4 class="bold mb-3">EDP asset properties</h4>

            <div dangerouslySetInnerHTML={{ __html: t('assetProperties') }} />

        </div>
    );
}

export default Help;
