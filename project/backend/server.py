from flask import Flask, request, jsonify
from flask_cors import CORS
from game import Minesweeper

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

games = {}

@app.route('/new-game', methods=['POST'])
def new_game():
    try:
        data = request.json
        difficulty = data.get('difficulty', 'beginner')
        
        if difficulty == 'beginner':
            width, height, mines = 9, 9, 10
        elif difficulty == 'intermediate':
            width, height, mines = 16, 16, 40
        else:  # expert
            width, height, mines = 30, 16, 99

        game_id = len(games)
        games[game_id] = Minesweeper(width, height, mines)
        return jsonify({'gameId': game_id, 'state': games[game_id].get_game_state()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/reveal', methods=['POST'])
def reveal():
    try:
        data = request.json
        game_id = data['gameId']
        x, y = data['x'], data['y']
        
        if game_id in games:
            game_state = games[game_id].reveal(x, y)
            return jsonify({'state': game_state})
        return jsonify({'error': 'Game not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/flag', methods=['POST'])
def flag():
    try:
        data = request.json
        game_id = data['gameId']
        x, y = data['x'], data['y']
        
        if game_id in games:
            game_state = games[game_id].toggle_flag(x, y)
            return jsonify({'state': game_state})
        return jsonify({'error': 'Game not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')