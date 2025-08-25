import React from 'react';
import './App.css';
import Sudoku from './components/Sudoku';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={`${process.env.PUBLIC_URL}/favicon-32x32.png`} alt="Logo" className="logo" />
                <h1 className="title">MasterSudoku</h1>
            </header>
            <main>
                <Sudoku />
            </main>
        </div>
    );
}

export default App;
