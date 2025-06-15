import os
import json
import tempfile
import wave
import pyaudio
import vosk
from django.conf import settings


class SpeechRecognitionService:
    def __init__(self, language='uk'):
        # Set the model path based on language
        if language == 'uk':
            model_path = os.path.join(settings.MEDIA_ROOT, 'models', 'vosk-model-uk-v3-lgraph')
        else:  # default to English
            model_path = os.path.join(settings.MEDIA_ROOT, 'models', 'vosk-model-en-us-0.22')

        # Initialize the model
        self.model = vosk.Model(model_path)

        # Create a recognizer
        self.rec = vosk.KaldiRecognizer(self.model, 16000)

    def process_audio(self, audio_path):
        # Open the audio file
        wf = wave.open(audio_path, "rb")

        # Check if the audio format is compatible
        if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getcomptype() != "NONE":
            return {"error": "Audio file must be WAV format mono PCM"}

        # Process the audio file
        results = []
        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            if self.rec.AcceptWaveform(data):
                result = json.loads(self.rec.Result())
                if result['text']:
                    results.append(result['text'])

        # Get the final result
        final_result = json.loads(self.rec.FinalResult())
        if final_result['text']:
            results.append(final_result['text'])

        return {
            "text": " ".join(results),
            "confidence": 0.9  # Example confidence value
        }

    def process_audio_bytes(self, audio_bytes):
        # Create a temporary file
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_file:
            temp_file.write(audio_bytes)
            temp_file_path = temp_file.name

        try:
            # Process the temporary file
            result = self.process_audio(temp_file_path)
            return result
        finally:
            # Clean up the temporary file
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)