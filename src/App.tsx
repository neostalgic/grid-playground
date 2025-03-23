import { useState, useCallback } from 'react'
import './App.css'
import { Grid } from './components/Grid'
import { ColorPicker } from './components/ColorPicker'
import { GridManager } from './components/GridManager'
import { InfoPopover } from './components/InfoPopover'
import { CellColor, GridData } from './types/grid'

function App() {
  const [gridConfig, setGridConfig] = useState({ width: 32, height: 32 })
  const [selectedColor, setSelectedColor] = useState<CellColor>('#000000')
  const [gridData, setGridData] = useState<GridData>({
    width: gridConfig.width,
    height: gridConfig.height,
    cells: Array(gridConfig.width * gridConfig.height).fill(null),
  })

  const handleCellClick = useCallback((index: number, rightClick: boolean) => {
    setGridData((prev) => {
      const newCells = [...prev.cells]
      newCells[index] = rightClick ? null : selectedColor
      return { ...prev, cells: newCells }
    })
  }, [selectedColor])

  const handleSizeChange = useCallback((dimension: 'width' | 'height', value: number) => {
    const newValue = Math.max(1, Math.min(50, value))
    setGridConfig((prev) => {
      const newConfig = { ...prev, [dimension]: newValue }
      const newCells = Array(newConfig.width * newConfig.height).fill(null)
      // Copy over existing cells where possible
      for (let y = 0; y < Math.min(prev.height, newConfig.height); y++) {
        for (let x = 0; x < Math.min(prev.width, newConfig.width); x++) {
          const oldIndex = y * prev.width + x
          const newIndex = y * newConfig.width + x
          newCells[newIndex] = gridData.cells[oldIndex]
        }
      }
      setGridData({
        width: newConfig.width,
        height: newConfig.height,
        cells: newCells,
      })
      return newConfig
    })
  }, [gridData.cells])

  const handleLoadGrid = (loadedGrid: GridData) => {
    setGridData(loadedGrid);
    setGridConfig({
      width: loadedGrid.width,
      height: loadedGrid.height
    });
  };

  return (
    <div className="app">
      <div className="toolbar">
        
        {/* <div className="toolbar-section size-controls">
          <label>
            <span>W:</span>
            <input
              type="number"
              value={gridConfig.width}
              onChange={(e) => handleSizeChange('width', parseInt(e.target.value))}
              min="1"
              max="50"
            />
          </label>
          <label>
            <span>H:</span>
            <input
              type="number"
              value={gridConfig.height}
              onChange={(e) => handleSizeChange('height', parseInt(e.target.value))}
              min="1"
              max="50"
            />
          </label>
        </div> */}

        <div className="toolbar-section">
          <ColorPicker
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
        </div>

        <div className="toolbar-section">
          <GridManager
            currentGrid={gridData}
            onLoadGrid={handleLoadGrid}
          />
        </div>

        <InfoPopover />
      </div>

      <div className="grid-container">
        <Grid
          gridData={gridData}
          selectedColor={selectedColor}
          onCellClick={handleCellClick}
        />
      </div>
    </div>
  )
}

export default App
