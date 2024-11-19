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
import "../../../../../node_modules/react-tiles-dnd/esm/index.css";
import { TilesContainer } from "react-tiles-dnd";

const Category = () => {
    const { t } = useTranslation();

    const [dataSpaces, setDataSpaces] = useState([
        { id: 1, name: "GovData - Das Datenportal für Deutschland", image: govdata, shortName: "GovData" },
        { id: 2, name: "Autobahn GmbH", image: autobahn, shortName: "Autobahn" },
        { id: 3, name: "Toll Collect GmbH", image: collect, shortName: "Toll Collect" },
        { id: 4, name: "Mobility Data Space", image: mobility, shortName: "Mobility" },
        { id: 5, name: "Deutschlands Plattform für Daten, die etwas bewegen", image: mobilithek, shortName: "Deutschlands Plattform für Daten" },
        { id: 6, name: "Deutsche Flugsicherung", image: flugsicherung, shortName: "Deutsche Flugsicherung" },
        { id: 7, name: "Bundesanstalt für Straßenwesen", image: bast, shortName: "Bundesanstalt für Straßenwesen" },
    ]);

    const renderTileFunction = ({ data, isDragging }) => (
        <DataspaceCard dataSpace={data} isDragging={isDragging} />
    );

    const tileSize = (dataSpace) => ({
        colSpan: 1,
        rowSpan: 1
    });


    return (
        <div className="container pb-4" style={{ maxWidth: 1050 }}>
            <div className='d-flex justify-content-between mb-5'>
                <a href="/" className='text-decoration-none h2' style={{ width: 'fit-content' }}>{t('page.title')}</a>
                <LanguageSelector />
            </div>

            <MainSearchBar />

            <div className="mt-5">
                <TilesContainer
                    data={dataSpaces}
                    renderTile={renderTileFunction}
                    tileSize={tileSize}
                    forceTileWidth={340}
                    forceTileHeight={230}
                    className="w-100"
                ></TilesContainer>
            </div>
        </div>
    );
}

export default Category;
