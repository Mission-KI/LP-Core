import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import assetPropertiesImg from '../../common/assets/img/help_topics/asset_properties.webp';

const Help = () => {
    const { t } = useTranslation();

    useEffect(() => {
        const handleLoad = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    // Get the height of a fixed header if present
                    const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    // Calculate the position to scroll to
                    const topOffset = element.offsetTop - headerHeight;

                    // Scroll to the position
                    window.scrollTo({
                        top: topOffset,
                        behavior: 'smooth', // Smooth scrolling
                    });
                }
            }
        };

        // Wait for the window load event to ensure all resources are loaded
        window.addEventListener('load', handleLoad);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);


    return (
        <div className='container'>
            <h2 className='bold mb-4'>Help topics</h2>

            <img src={assetPropertiesImg} alt="" style={{ maxWidth: 450 }} className='shadow rounded mb-5' />
            <h4 className="bold mb-3">
                EDP asset properties
            </h4>

            <div dangerouslySetInnerHTML={{ __html: t('assetProperties') }} />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
};

export default Help;
