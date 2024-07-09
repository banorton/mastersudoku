import React, { useState } from 'react';
import './Sudoku.css';

const Sudoku = () => {
    const initialGrid = Array(9).fill().map(() => Array(9).fill(''));
    const [grid, setGrid] = useState(initialGrid);
    const [focusedCell, setFocusedCell] = useState({ row: -1, col: -1 });

    const handleInputChange = (row, col, value) => {
        if (/^[1-9]?$/.test(value)) {
            const newGrid = grid.map((rowArray, rowIndex) => 
                rowArray.map((cellValue, colIndex) => 
                    (rowIndex === row && colIndex === col ? value : cellValue)
                )
            );
            setGrid(newGrid);
        }
    };

    const handleCellFocus = (row, col) => {
        setFocusedCell({ row, col });
    };

    const handleKeyDown = (e) => {
        const { row, col } = focusedCell;
        if (row !== -1 && col !== -1 && /^[1-9]$/.test(e.key)) {
            handleInputChange(row, col, e.key);
        }
    };

    return (
        <div className="container" onKeyDown={handleKeyDown} tabIndex="0">
            <div className="grid-container">
                <div className="sudoku-grid">
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className="sudoku-row">
                            {row.map((value, colIndex) => (
                                <input
                                    key={colIndex}
                                    type="text"
                                    value={value}
                                    onFocus={() => handleCellFocus(rowIndex, colIndex)}
                                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                    className="sudoku-cell"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="button-container">
                <button className="custom-button">Solve</button>
            </div>
        </div>
    );
};

export default Sudoku;
