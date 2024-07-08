import React from 'react';
import './App.css';
import Sudoku from './components/Sudoku';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">Sudoku Solver</h1>
            </header>
            <main>
                <Sudoku />
            </main>
        </div>
    );
}

export default App;
