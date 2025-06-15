import json
import base64
import numpy as np
import cv2
from channels.generic.websocket import AsyncWebsocketConsumer
from .services.sign_language_service import SignLanguageRecognitionService


class SignLanguageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Initialize the service
        self.service = SignLanguageRecognitionService()
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type')

        if message_type == 'frame':
            # Get the base64 encoded image
            image_data = text_data_json.get('data')
            if not image_data:
                await self.send(text_data=json.dumps({
                    'type': 'error',
                    'message': 'No image data provided'
                }))
                return

            try:
                # Decode the base64 image
                image_bytes = base64.b64decode(image_data.split(',')[1])

                # Process the image
                result = self.service.process_image_bytes(image_bytes)

                # Send the result back
                await self.send(text_data=json.dumps({
                    'type': 'recognition_result',
                    'result': result
                }))
            except Exception as e:
                await self.send(text_data=json.dumps({
                    'type': 'error',
                    'message': str(e)
                }))