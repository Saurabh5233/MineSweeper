# Minesweeper Game

This is a Minesweeper game built using React (TypeScript) for the frontend and Flask for the backend.

## Project Structure
```
MineSweeper/
│── project/
│   │── backend/               # Backend server with Flask
│   │   │── __pycache__/       # Python cache files
│   │   │── game.py            # Game logic
│   │   │── server.py          # Flask server
│   │   │── requirements.txt   # Python dependencies
│   │── dist/                  # Build output directory
│   │── node_modules/          # Node.js dependencies
│   │── server/                # Additional server-related files
│   │── src/                   # Frontend source code
│   │   │── index.html         # Main HTML file
│   │   │── eslint.config.js   # ESLint configuration
│   │   │── package.json       # Node.js dependencies
│   │   │── postcss.config.js  # PostCSS configuration
│   │   │── tailwind.config.js # Tailwind CSS configuration
│   │   │── tsconfig.json      # TypeScript configuration
│   │   │── vite.config.ts     # Vite configuration
│── .gitignore                 # Git ignore file
```

## Installation and Setup
### Prerequisites
- Node.js and npm
- Python 3 and pip

### Backend Setup
1. Navigate to the `backend` folder:
   ```sh
   cd project/backend
   ```
2. Create a virtual environment (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```sh
   python server.py
   ```

### Frontend Setup
1. Navigate to the project root:
   ```sh
   cd project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Running the Game
Once both the backend and frontend are running, open the browser and navigate to:
```
http://localhost:5173
```

## Features
- Minesweeper game logic implemented in Python
- Interactive UI using React and Tailwind CSS
- Flask-based API to handle game logic
- TypeScript support

## Contributing
Feel free to submit issues or pull requests to improve the project.

## License
This project is open-source and available under the MIT License.

