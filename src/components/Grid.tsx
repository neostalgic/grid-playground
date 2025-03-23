import React, { useState, useCallback } from 'react';
import { CellColor, GridData } from '../types/grid';
import styles from './Grid.module.css';

interface GridProps {
    gridData: GridData;
    selectedColor: CellColor;
    onCellClick: (index: number, rightClick: boolean) => void;
}

export const Grid: React.FC<GridProps> = ({ gridData, selectedColor, onCellClick }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [isRightButton, setIsRightButton] = useState(false);

    const handleMouseDown = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        const rightClick = e.button === 2;
        setIsDrawing(true);
        setIsRightButton(rightClick);
        onCellClick(index, rightClick);
    };

    const handleMouseEnter = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (isDrawing) {
            onCellClick(index, isRightButton);
        }
    };

    const handleMouseUp = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setIsDrawing(false);
    }, []);

    // Add global mouse up handler
    React.useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseUp]);

    return (
        <div 
            className={styles.grid}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridData.width}, 40px)`,
                gap: '1px',
            }}
            onContextMenu={(e) => e.preventDefault()} // Prevent context menu
        >
            {gridData.cells.map((color, index) => (
                <div
                    key={index}
                    className={styles.cell}
                    style={{ backgroundColor: color || undefined }}
                    onMouseDown={(e) => handleMouseDown(index, e)}
                    onMouseEnter={(e) => handleMouseEnter(index, e)}
                />
            ))}
        </div>
    );
}; 