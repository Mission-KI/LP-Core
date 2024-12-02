import React, { useState, useEffect } from 'react';
import DataspaceCard from '../../components/DataspaceCard/DataspaceCard';
import { useParams } from "react-router";
import { TilesContainer } from "react-tiles-dnd";
import "../../../node_modules/react-tiles-dnd/esm/index.css";
import { useLocation } from 'react-router';
import { useCategories } from '../../utils/categories';
import { useTranslation } from 'react-i18next';


const Category = () => {
    const { category_slug } = useParams();
    const LOCAL_STORAGE_KEY = category_slug+"dataspaces-order?v=2";
    const [dataSpaces, setDataSpaces] = useState([]);
    const { getCategoryBySlug } = useCategories();
    const category = getCategoryBySlug(category_slug);
    const { t } = useTranslation();

    const initialDataSpaces = category.tiles;
    const location = useLocation();

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

    const onReorderTiles = (newOrder) => {
        setDataSpaces(newOrder);
        saveOrderToLocalStorage(newOrder);
    };

    const renderTileFunction = ({ data, isDragging }) => (
        <DataspaceCard dataSpace={data} category={category} isDragging={isDragging} />
    );

    return (
        <div className="container pt-3 pb-4">
            <h3 className='mt-5 mb-4 bold text-capitalize'>{category.name}</h3>

            <div className="mt-4">
                {dataSpaces.length > 0 ? (
                    <TilesContainer
                        data={dataSpaces}
                        renderTile={renderTileFunction}
                        forceTileWidth={250}
                        forceTileHeight={230}
                        className="w-100 row"
                        onReorderTiles={onReorderTiles}
                    />
                ) : (
                    <div className="">
                        <p className="text-muted">{t('categories.noItems')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;
