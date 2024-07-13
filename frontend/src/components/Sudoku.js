import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sudoku.css';

const Sudoku = () => {
    const initialGrid = Array(9).fill().map(() => Array(9).fill(''));
    const [grid, setGrid] = useState(initialGrid);
    const [focusedCell, setFocusedCell] = useState({ row: -1, col: -1 });
    const [solvedGrid, setSolvedGrid] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const handleKeyDown = (e) => {
            const { row, col } = focusedCell;
            if (row !== -1 && col !== -1 && /^[1-9]$/.test(e.key)) {
                handleInputChange(row, col, e.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [focusedCell, grid]);

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

    const handleSolve = () => {
        axios.post(`${apiUrl}/solve/`, { grid })
            .then(response => {
                const solved = response.data.solved;
                if (solved) {
                    setSolvedGrid(response.data.solved_grid);
                } else {
                    setGrid(response.data.solved_grid);
                }
            })
            .catch(error => {
                console.error('Error solving puzzle:', error);
            });
    };

    const clearGrid = () => {
        setGrid(initialGrid);
        setSolvedGrid(null);
        setInputValue('');
    };

    const handleCellFocus = (row, col) => {
        setFocusedCell({ row, col });
    };

    const handleInputFieldChange = (e) => {
        setInputValue(e.target.value);
        const values = e.target.value.split(/[ ,]+/).map(Number);
        if (values.length === 81) {
            const newGrid = [];
            for (let i = 0; i < 9; i++) {
                newGrid.push(values.slice(i * 9, (i + 1) * 9));
            }
            setGrid(newGrid);
        }
    };

    return (
        <div className="outer-container">
            <div className="square-grid">
                <div className="grid-item grid-container">
                    <div className="sudoku-grid">
                        {(solvedGrid || grid).map((row, rowIndex) => (
                            <div key={rowIndex} className="sudoku-row">
                                {row.map((value, colIndex) => (
                                    <input
                                        key={colIndex}
                                        type="text"
                                        value={value || ''}
                                        onFocus={() => handleCellFocus(rowIndex, colIndex)}
                                        onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                        className="sudoku-cell"
                                        readOnly={solvedGrid !== null}  // Make cells read-only if puzzle is solved
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid-item button-container">
                    <button className="custom-button" onClick={handleSolve}>Solve</button>
                    <button className="custom-button" onClick={clearGrid}>Clear</button>
                </div>
                <div className="grid-item input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputFieldChange}
                        placeholder="Enter numbers separated by spaces or commas"
                        className="input-field"
                    />
                </div>
                <div className="grid-item"></div>
            </div>
        </div>
    );
};

export default Sudoku;
