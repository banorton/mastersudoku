import React, { useState } from 'react';
import './Sudoku.css';

const Sudoku = () => {
    const initialGrid = Array(9).fill().map(() => Array(9).fill(''));
    const [grid, setGrid] = useState(initialGrid);

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

    return (
        <div>
            <div className="sudoku-grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="sudoku-row">
                        {row.map((value, colIndex) => (
                            <input
                                key={colIndex}
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                className="sudoku-cell"
                            />
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={() => console.log(grid)}>Submit</button>
        </div>
    );
};

export default Sudoku;
