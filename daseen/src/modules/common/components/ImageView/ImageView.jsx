import React, { useState } from 'react';
import styles from './ImageView.module.css';
import { ZoomIn, ZoomOut } from 'react-bootstrap-icons';

function ImageView({ url }) {
    const [isOpen, setIsOpen] = useState(false);
    const [zoom, setZoom] = useState(50);

    const openImage = () => setIsOpen(true);
    const closeImage = () => {
        setIsOpen(false);
        setZoom(50);
    };

    const zoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 5, 100));
    const zoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 5, 50));

    return (
        <>
            <img
                src={url}
                alt="image"
                className={styles.image}
                loading="lazy"
                onClick={openImage}
                style={{ cursor: 'pointer' }}
            />

            {isOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeImage}>×</button>

                        <div className={styles.zoomControls}>
                            <button className="btn btn-primary mx-2" onClick={zoomIn}>
                                <ZoomIn />
                            </button>
                            <button className="btn btn-primary mx-2" onClick={zoomOut}>
                                <ZoomOut />
                            </button>
                        </div>

                        <div
                            className={styles.imageContainer}
                        >
                            <img
                                src={url}
                                alt="Zoomed"
                                className={styles.zoomableImage}
                                style={{ width: `${zoom}%`, height: 'auto' }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ImageView;
