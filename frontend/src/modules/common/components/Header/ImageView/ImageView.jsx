import React from 'react'
import styles from './ImageView.module.css'

function ImageView({ url }) {
    return (
        <div>
            <img src={url} alt="image" className={styles.image} />
        </div>
    )
}

export default ImageView
