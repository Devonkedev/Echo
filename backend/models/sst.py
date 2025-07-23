import whisper

model = whisper.load_model("base")

def transcribe(audio_path):
    result = model.transcribe("models/ENHI007.mp3")
    return result["text"]

print(transcribe("backend/models/The Shri Ram School.m4a"))

