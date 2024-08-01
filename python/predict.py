from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io

# Initialize Flask app
app = Flask(__name__)

# Load the VGG16 model and category names
vgg16Model = load_model('vgg16_model.h5')
category_names = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Background_without_leaves', 'Blueberry___healthy', 'Cherry___healthy', 'Cherry___Powdery_mildew', 'Corn___Cercospora_leaf_spot Gray_leaf_spot', 'Corn___Common_rust', 'Corn___healthy', 'Corn___Northern_Leaf_Blight', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___healthy', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___healthy', 'Potato___Late_blight', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___healthy', 'Strawberry___Leaf_scorch', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___healthy', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_mosaic_virus', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus'] 

# Function to preprocess and load image
def preprocess_and_load_image(image_bytes):
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert('L')  # Convert to grayscale
        image = image.resize((224, 224))  # VGG16 expects 224x224 images
        image = np.array(image) / 255.0  # Normalize the image
        image = np.stack([image]*3, axis=-1)  # Convert grayscale to RGB
        return image
    except Exception as e:
        print(f"Error in preprocessing image: {e}")
        return None
# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        image_bytes = file.read()
        input_image = preprocess_and_load_image(image_bytes)
        if input_image is not None:
            input_image = np.expand_dims(input_image, axis=0)
            y_pred = vgg16Model.predict(input_image)
            predicted_index = np.argmax(y_pred, axis=1)[0]
            predicted_category = category_names[predicted_index]
            return jsonify({'predicted_category': predicted_category}), 200
        else:
            return jsonify({'error': 'Image preprocessing failed'}), 500

    return jsonify({'error': 'An error occurred'}), 500

# Run the server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)