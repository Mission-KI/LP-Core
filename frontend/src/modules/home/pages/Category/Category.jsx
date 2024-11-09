import React, { useState } from 'react';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import { useTranslation } from 'react-i18next';
import autobahn from '../../../common/assets/img/dataspace_logos/logo_autobahn-gmbh.png';
import bast from '../../../common/assets/img/dataspace_logos/logo_bast.png';
import flugsicherung from '../../../common/assets/img/dataspace_logos/logo_deutsche_flugsicherung.png';
import govdata from '../../../common/assets/img/dataspace_logos/logo_govdata.png';
import mobilithek from '../../../common/assets/img/dataspace_logos/logo_mobilithek.png';
import mobility from '../../../common/assets/img/dataspace_logos/logo_mobility-data-space.png';
import collect from '../../../common/assets/img/dataspace_logos/logo_toll-collect.png';
import DataspaceCard from '../../components/DataspaceCard/DataspaceCard';

const Category = () => {
    const { t } = useTranslation();

    const [dataSpaces, setDataSpaces] = useState([
        { id: 1, name: "GovData - Das Datenportal für Deutschland", image: autobahn },
        { id: 2, name: "Autobahn GmbH", image: bast },
        { id: 3, name: "Toll Collect GmbH", image: flugsicherung },
        { id: 4, name: "Mobility Data Space", image: govdata },
        { id: 5, name: "Deutschlands Plattform für Daten, die etwas bewegen", image: mobilithek },
        { id: 6, name: "Deutsche Flugsicherung", image: mobility },
        { id: 7, name: "Bundesanstalt für Straßenwesen", image: collect },
    ]);

    return (
        <div className="container pb-4" style={{ maxWidth: 1050 }}>
            <div className='d-flex justify-content-between mb-5'>
                <a href="/" className='text-decoration-none h2' style={{ width: 'fit-content' }}>{t('page.title')}</a>
                <LanguageSelector />
            </div>

            <MainSearchBar />

            <div className="row mt-5">
                {dataSpaces.map((dataSpace) => (
                    <DataspaceCard dataSpace={dataSpace} key={dataSpace.id} />
                ))}
            </div>
        </div>
    );
}

export default Category;
