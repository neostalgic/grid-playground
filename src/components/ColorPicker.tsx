import React, { useEffect } from 'react';
import { PRESET_COLORS } from '../types/grid';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
    selectedColor: string | null;
    onColorSelect: (color: string | null) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Check if we're not in an input field
            if (!(e.target instanceof HTMLInputElement)) {
                const num = parseInt(e.key);
                if (num >= 1 && num <= PRESET_COLORS.length) {
                    onColorSelect(PRESET_COLORS[num - 1]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [onColorSelect]);

    return (
        <div className={styles.colorPicker}>
            <div className={styles.colors}>
                {PRESET_COLORS.map((color, index) => (
                    <div
                        key={color}
                        className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onColorSelect(color)}
                    >
                        <span className={styles.colorNumber}>{index + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}; 