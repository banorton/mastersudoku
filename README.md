# MasterSudoku - Sudoku Solver and Web Application

MasterSudoku is a web application that solves Sudoku puzzles and allows users to interactively fill in or upload Sudoku grids. The project includes a Django Rest Framework backend, which handles the puzzle-solving algorithms, and a React frontend, which provides an interactive interface. It’s hosted at [www.mastersudoku.com](http://www.mastersudoku.com) on an Amazon EC2 server.

## Project Structure

The project is organized into two main parts: the **backend** for processing and solving puzzles and the **frontend** for the user interface. Here's an overview:

### Backend (Django Rest Framework)
The backend is built using Django Rest Framework (DRF) and includes:

- **`puzzle.py`**: Defines the core objects for the Sudoku puzzle, such as:
  - **`Cell`**: Represents an individual cell in the puzzle with its value and possible notes.
  - **`Puzzle_Backend`**: Manages the puzzle's state and interacts with the solver.
  - **`Puzzle`**: Connects the frontend and backend, enabling puzzle solving and display.
- **`solver.py`**: Implements algorithms to solve puzzles, mimicking human solving strategies. More details on the algorithms are provided below.
- **`examples/`**: Contains example puzzles of varying difficulty, from easy to nearly impossible.

### Frontend (React)
The frontend, built with React, allows users to:
- Manually enter puzzle values.
- Upload a complete puzzle via a grid interface.
- Request solutions through the backend API.

It uses Axios to handle HTTP requests between the frontend and backend, enabling real-time puzzle solving.

## Solving Algorithms

The solving algorithms in `solver.py` are designed to simulate human techniques, starting from simple clues and advancing to more complex strategies. This structure allows future implementations of a guided solving mode. The key algorithms include:

### Core Solving Functions
1. **`find_naked_clues`**: Identifies "naked" sets within rows, columns, or boxes, where a set of `n` cells contain only `n` unique notes. It eliminates these values from the notes of other cells in the same row, column, or box. Example:
   - In row 3, if cells (3,3) and (3,7) both contain only `{4,8}`, those notes are removed from other cells in row 3. A cell with `{1,3,4,7,8}` would be reduced to `{1,3,7}`.

2. **`find_hidden_clues`**: Finds "hidden" sets, where exactly `n` cells contain more than `n` notes but share `n` values. It retains only the shared notes in those cells. Example:
   - In row 3, if cells (3,3) and (3,7) have `{4,8}` among other values, `{4,8}` will be removed from all other cells in row 3, leaving only `{4,8}` in those two cells.

### Advanced Techniques
If the primary algorithms reach a dead end, the **Nishio method** is used. This "guess and check" approach tests potential values for cells with limited options (typically naked or hidden doubles). If a contradiction is found, the algorithm backtracks and revises the guess. This method is recursive and used as a last resort due to its complexity and potential for numerous branches.
