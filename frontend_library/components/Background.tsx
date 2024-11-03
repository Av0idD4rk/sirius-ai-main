
import React from "react";
import styles from "./Background.module.css";

const Background = () => {
    return (
        <div className={styles.background}>
            <div className={styles.ellipse1}></div>
            <div className={styles.ellipse2}></div>
            <div className={styles.ellipse3}></div>
            <div className={styles.ellipse4}></div>
        </div>
    );
};

export default Background;
