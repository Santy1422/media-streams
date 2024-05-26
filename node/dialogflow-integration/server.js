const Vonage = require('@vonage/server-sdk');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  applicationId: process.env.VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_PRIVATE_KEY_PATH
});

app.post('/webhooks/answer', (req, res) => {
  const ncco = [
    {
      action: 'talk',
      text: 'Hello, this is your bot. How can I help you today?'
    },
    {
      action: 'input',
      eventUrl: [`${req.protocol}://${req.get('host')}/webhooks/input`]
    }
  ];
  res.json(ncco);
});

app.post('/webhooks/input', (req, res) => {
  const speechResults = req.body.speech.results[0].text;
  console.log(`User said: ${speechResults}`);

  // Aquí puedes agregar la lógica para manejar la respuesta usando ChatGPT o cualquier otra API
  const response = `You said: ${speechResults}`;

  const ncco = [
    {
      action: 'talk',
      text: response
    }
  ];
  res.json(ncco);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
