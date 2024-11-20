import React, { useState, useEffect } from 'react';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import { useTranslation } from 'react-i18next';
import DataspaceCard from '../../components/DataspaceCard/DataspaceCard';
import "../../../../../node_modules/react-tiles-dnd/esm/index.css";
import { TilesContainer } from "react-tiles-dnd";
import { useDataSpaces } from '../../utils/dataspaces';
import { useLocation } from 'react-router';

const LOCAL_STORAGE_KEY = "userDataSpaceOrder";

const Category = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const initialDataSpaces = useDataSpaces();
    const [dataSpaces, setDataSpaces] = useState([]);

    useEffect(() => {
        const savedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedOrder) {
            const parsedOrder = JSON.parse(savedOrder);

            const orderedDataSpaces = parsedOrder
                .map(id => initialDataSpaces.find(dataspace => dataspace.id === id))
                .filter(Boolean);
            setDataSpaces(orderedDataSpaces.length > 0 ? orderedDataSpaces : initialDataSpaces);
        } else {
            setDataSpaces(initialDataSpaces);
        }
    }, [location]);

    const saveOrderToLocalStorage = (newOrder) => {
        const dataspaceOrder = newOrder.map(dataspace => dataspace.id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataspaceOrder));
    };

    // Handle reordering
    const onReorderTiles = (newOrder) => {
        setDataSpaces(newOrder);
        saveOrderToLocalStorage(newOrder);
    };

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
                    onReorderTiles={onReorderTiles}
                />
            </div>
        </div>
    );
}

export default Category;
