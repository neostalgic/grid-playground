import React, { useState, useEffect } from 'react';
import { GridData } from '../types/grid';
import styles from './GridManager.module.css';

interface SavedGrid {
    name: string;
    data: GridData;
    timestamp: number;
}

interface GridManagerProps {
    currentGrid: GridData;
    onLoadGrid: (grid: GridData) => void;
}

export const GridManager: React.FC<GridManagerProps> = ({ currentGrid, onLoadGrid }) => {
    const [savedGrids, setSavedGrids] = useState<SavedGrid[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [newGridName, setNewGridName] = useState('');

    useEffect(() => {
        loadSavedGrids();
    }, []);

    const loadSavedGrids = () => {
        const grids = localStorage.getItem('savedGrids');
        if (grids) {
            setSavedGrids(JSON.parse(grids));
        }
    };

    const saveGrid = () => {
        if (!newGridName.trim()) {
            alert('Please enter a name for your grid');
            return;
        }

        const newGrid: SavedGrid = {
            name: newGridName.trim(),
            data: currentGrid,
            timestamp: Date.now()
        };

        const updatedGrids = [...savedGrids, newGrid];
        localStorage.setItem('savedGrids', JSON.stringify(updatedGrids));
        setSavedGrids(updatedGrids);
        setNewGridName('');
    };

    const deleteGrid = (index: number) => {
        const updatedGrids = savedGrids.filter((_, i) => i !== index);
        localStorage.setItem('savedGrids', JSON.stringify(updatedGrids));
        setSavedGrids(updatedGrids);
    };

    return (
        <div className={styles.gridManager}>
            <div className={styles.saveControls}>
                <input
                    type="text"
                    value={newGridName}
                    onChange={(e) => setNewGridName(e.target.value)}
                    placeholder="Enter grid name"
                    className={styles.gridNameInput}
                />
                <button onClick={saveGrid}>Save Grid</button>
            </div>

            <div className={styles.loadControls}>
                <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={styles.loadButton}
                >
                    Load Grid ▼
                </button>
                {showDropdown && (
                    <div className={styles.dropdown}>
                        {savedGrids.length === 0 ? (
                            <div className={styles.noGrids}>No saved grids</div>
                        ) : (
                            savedGrids.map((grid, index) => (
                                <div key={index} className={styles.gridItem}>
                                    <div className={styles.gridInfo}>
                                        <span>{grid.name}</span>
                                        <span className={styles.timestamp}>
                                            {new Date(grid.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className={styles.gridActions}>
                                        <button 
                                            onClick={() => onLoadGrid(grid.data)}
                                            className={styles.loadItemButton}
                                        >
                                            Load
                                        </button>
                                        <button 
                                            onClick={() => deleteGrid(index)}
                                            className={styles.deleteButton}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}; 