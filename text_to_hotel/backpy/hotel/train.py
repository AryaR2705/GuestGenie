import pickle
from sklearn.neural_network import MLPClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn import metrics
import pandas as pd

# Load your own dataset or replace this with the path to your dataset
dataset_path = 'dbms.csv'
df = pd.read_csv(dataset_path)

# Assuming your dataset has columns 'text' and 'label'
# Adjust column names based on your actual data
# Example: df = pd.read_csv('your_dataset.csv', names=['text', 'label'])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(df['Question'], df['Answer'], test_size=0.2, random_state=42)

# Vectorize the text data using TfidfVectorizer
vectorizer = TfidfVectorizer(max_features=1000)  # Adjust max_features as needed
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)

# Train an MLPClassifier
mlp_model = MLPClassifier(hidden_layer_sizes=(100,), max_iter=500, random_state=42)
mlp_model.fit(X_train_vectorized, y_train)

# Evaluate the model
y_pred = mlp_model.predict(X_test_vectorized)
accuracy = metrics.accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")

# Save the trained model and vectorizer
MODEL_FILE_PATH = 'model.pkl'
VECTORIZER_FILE_PATH = 'vectorizer.pkl'

with open(MODEL_FILE_PATH, 'wb') as model_file:
    pickle.dump(mlp_model, model_file)

with open(VECTORIZER_FILE_PATH, 'wb') as vectorizer_file:
    pickle.dump(vectorizer, vectorizer_file)

print("Model and vectorizer saved.")
