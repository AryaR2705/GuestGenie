import pickle

# Load the trained model and vectorizer
MODEL_FILE_PATH = 'model1.pkl'
VECTORIZER_FILE_PATH = 'vectorizer1.pkl'

with open(MODEL_FILE_PATH, 'rb') as model_file:
    mlp_model = pickle.load(model_file)

with open(VECTORIZER_FILE_PATH, 'rb') as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

# Example text to test the model
new_text = ["give me details on Conrad Pune"]

# Vectorize the new text using the loaded vectorizer
new_text_vectorized = vectorizer.transform(new_text)

# Predict the label using the loaded model
predicted_label = mlp_model.predict(new_text_vectorized)

print(f"Predicted Label: {predicted_label}")
