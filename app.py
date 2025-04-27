from flask import Flask, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for Chrome console access

@app.route('/transcript/<video_id>', methods=['GET'])
def get_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = ' '.join([entry['text'] for entry in transcript])
        return jsonify({'transcript': transcript_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))