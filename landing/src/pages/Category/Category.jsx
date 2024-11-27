import React, { useState, useEffect } from 'react';
import DataspaceCard from '../../components/DataspaceCard/DataspaceCard';
import { useDataSpaces } from '../../utils/dataspaces';
import { useParams } from "react-router";
import { TilesContainer } from "react-tiles-dnd";
import "../../../node_modules/react-tiles-dnd/esm/index.css";
import { useLocation } from 'react-router';

const LOCAL_STORAGE_KEY = "userDataSpacesOrder?v=2";

const Category = () => {

    const [dataSpaces, setDataSpaces] = useState([]);
    const initialDataSpaces = useDataSpaces();
    const { category_name } = useParams();
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

    // Handle reordering
    const onReorderTiles = (newOrder) => {
        setDataSpaces(newOrder);
        saveOrderToLocalStorage(newOrder);
    };

    const renderTileFunction = ({ data, isDragging }) => (
        <DataspaceCard dataSpace={data} isDragging={isDragging} />
    );


    return (
        <div className="container pt-3 pb-4">
            <h3 className='mt-5 mb-4 bold text-capitalize'>{category_name.replace("-", " ").replace("-", " ").replace("-", " ")}</h3>

            <div className="mt-4">
                <TilesContainer
                    data={dataSpaces}
                    renderTile={renderTileFunction}
                    forceTileWidth={250}
                    forceTileHeight={230}
                    className="w-100 row"
                    onReorderTiles={onReorderTiles}
                />
            </div>
        </div>
    );
}

export default Category;
