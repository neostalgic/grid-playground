import React, { useState } from 'react';
import styles from './InfoPopover.module.css';

export const InfoPopover: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.infoContainer}>
            <button 
                className={styles.infoButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Show controls info"
            >
                i
            </button>
            {isOpen && (
                <>
                    <div className={styles.overlay} onClick={() => setIsOpen(false)} />
                    <div className={styles.popover}>
                        <h3>Controls</h3>
                        <div className={styles.section}>
                            <h4>Color Selection</h4>
                            <ul>
                                <li>Press 1-9 keys to select colors quickly</li>
                                <li>Click on any color circle to select it</li>
                            </ul>
                        </div>
                        <div className={styles.section}>
                            <h4>Drawing</h4>
                            <ul>
                                <li>Left click or drag to draw</li>
                                <li>Right click or drag to erase</li>
                            </ul>
                        </div>
                        <div className={styles.section}>
                            <h4>Grid Management</h4>
                            <ul>
                                <li>Adjust Width (W) and Height (H) to resize the grid</li>
                                <li>Save your grid designs with custom names</li>
                                <li>Load previously saved grids from the dropdown</li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}; 