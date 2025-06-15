import os
import pickle
import cv2
import mediapipe as mp
import numpy as np
from django.conf import settings


class SignLanguageRecognitionService:
    def __init__(self):
        # Load the model
        model_path = os.path.join(settings.MEDIA_ROOT, 'models', 'model.p')
        self.model_dict = pickle.load(open(model_path, 'rb'))
        self.model = self.model_dict['model']

        # Initialize MediaPipe
        self.mp_hands = mp.solutions.hands
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_drawing_styles = mp.solutions.drawing_styles
        self.hands = self.mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3, max_num_hands=1)

        # Labels dictionary
        self.labels_dict = {
            0: 'А', 1: 'Б', 2: 'В', 3: 'Г', 4: 'Ґ', 5: 'Д', 6: 'Е', 7: 'Є', 8: 'Ж', 9: 'З',
            10: 'И', 11: 'І', 12: 'Ї', 13: 'Й', 14: 'К', 15: 'Л', 16: 'М', 17: 'Н', 18: 'О', 19: 'П',
            20: 'Р', 21: 'С', 22: 'Т', 23: 'У', 24: 'Ф', 25: 'Х', 26: 'Ц', 27: 'Ч', 28: 'Ш', 29: 'Щ',
            30: 'Ю', 31: 'Я', 32: 'Ь'
        }

    def process_image(self, image_path):
        # Read the image
        frame = cv2.imread(image_path)
        if frame is None:
            return {"error": "Could not read image"}

        # Process the image
        return self._process_frame(frame)

    def process_image_bytes(self, image_bytes):
        # Convert bytes to numpy array
        nparr = np.frombuffer(image_bytes, np.uint8)
        # Decode image
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if frame is None:
            return {"error": "Could not decode image"}

        # Process the image
        return self._process_frame(frame)

    def _process_frame(self, frame):
        data_aux = []
        x_ = []
        y_ = []

        H, W, _ = frame.shape

        # Convert to RGB for MediaPipe
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process with MediaPipe
        results = self.hands.process(frame_rgb)

        if not results.multi_hand_landmarks:
            return {"error": "No hand detected in the image"}

        # Extract hand landmarks
        for hand_landmarks in results.multi_hand_landmarks:
            for i in range(len(hand_landmarks.landmark)):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y

                x_.append(x)
                y_.append(y)

            for i in range(len(hand_landmarks.landmark)):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y
                data_aux.append(x - min(x_))
                data_aux.append(y - min(y_))

        # Make prediction
        prediction = self.model.predict([np.asarray(data_aux)])
        predicted_character = self.labels_dict[int(prediction[0])]

        # Calculate confidence (this is a placeholder, actual confidence calculation depends on your model)
        confidence = 0.85  # Example confidence value

        return {
            "letter": predicted_character,
            "confidence": confidence
        }