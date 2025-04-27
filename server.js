const express = require('express');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle CORS (for Chrome console access)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint to fetch transcript
app.get('/transcript/:videoId', async (req, res) => {
  const { videoId } = req.params;

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const transcriptText = transcript.map(item => item.text).join(' ');
    res.json({ transcript: transcriptText });
  } catch (error) {
    console.error('Error fetching transcript:', error);
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});