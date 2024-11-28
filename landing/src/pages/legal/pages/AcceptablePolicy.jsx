import React from 'react';
import { useTranslation } from 'react-i18next';

function AcceptablePolicy() {
  const { t } = useTranslation(); 

  return (
    <div className='container pt-5'>
      <div dangerouslySetInnerHTML={{ __html: t('acceptableUsePolicy.fullContent') }} />
    </div>
  );
}

export default AcceptablePolicy;
