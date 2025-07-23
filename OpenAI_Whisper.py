import whisper

model = whisper.load_model("turbo")
result = model.transcribe("debate.mp3")
print(result["text"])