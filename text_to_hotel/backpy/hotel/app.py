import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Load the MLP model and vectorizer
MODEL_FILE_PATH = 'model1.pkl'
VECTORIZER_FILE_PATH = 'vectorizer1.pkl'

with open(MODEL_FILE_PATH, 'rb') as model_file:
    mlp_model = pickle.load(model_file)

with open(VECTORIZER_FILE_PATH, 'rb') as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

# Initialize CORS with the Flask app
cors = CORS(app)

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    try:
        if request.method == 'OPTIONS':
            # Handle preflight request
            return jsonify({'status': 'ok'})

        data = request.get_json()
        text_input = data['text']

        # Vectorize the input text using the loaded vectorizer
        vectorized_text = vectorizer.transform([text_input])

        # Make predictions using the MLP model
        prediction = mlp_model.predict(vectorized_text)

        # Format the response
        response = {'prediction': prediction[0]}

        return jsonify(response)

    except Exception as e:
        # Log the error with additional details
        app.logger.error(f'Error predicting: {str(e)}', extra={'request_headers': request.headers, 'request_data': request.data})

        # Return an error response
        return jsonify({'error': 'Prediction failed'}), 500

if __name__ == '__main__':
    app.run(debug=True)
