import React, { useState, useEffect } from 'react';
import DataspaceCard from '../../components/DataspaceCard/DataspaceCard';
import { useDataSpaces } from '../../utils/dataspaces';
import { useParams } from "react-router";

const Category = () => {
    const dataSpaces = useDataSpaces();
    const { category_name } = useParams();

    return (
        <div className="container pt-3 pb-4">
            <h3 className='mt-5 mb-4 bold text-capitalize'>{category_name.replace("-", " ").replace("-", " ").replace("-", " ")}</h3>

            <div className="mt-4">
                <div className="row px-1">
                    {dataSpaces.map((dataSpace) => (
                        <DataspaceCard dataSpace={dataSpace} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;
