import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import styles from './ImageView.module.css';

function ImageView({ url }) {
    return (
        <>
            <div className='position-relative'>
                <Zoom>
                    <img
                        src={url}
                        alt="image"
                        className={styles.image}
                        loading="lazy"
                    />
                </Zoom>

            </div>
        </>
    );
}

export default ImageView;
