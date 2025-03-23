import React from 'react';
import { PRESET_COLORS } from '../types/grid';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
    selectedColor: string | null;
    onColorSelect: (color: string | null) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => {
    return (
        <div className={styles.colorPicker}>
            <div className={styles.colors}>
                {PRESET_COLORS.map((color) => (
                    <div
                        key={color}
                        className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onColorSelect(color)}
                    />
                ))}
                <div
                    className={`${styles.colorOption} ${styles.eraser} ${selectedColor === null ? styles.selected : ''}`}
                    onClick={() => onColorSelect(null)}
                >
                    ⌫
                </div>
            </div>
        </div>
    );
}; 