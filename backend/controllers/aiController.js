import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

console.log('API Key loaded:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000/',
    'X-Title': 'GoalScape'
  }
});

const generateAIResponse = async (req, res) => {
  try {
    const {prompt} = req.body;
    console.log('Received prompt:', prompt);

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt in request body' });
    }

    const completion = await client.chat.completions.create({
      model: 'deepseek/deepseek-r1:free',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
    });
    res.json({message: completion.choices[0].message.content});
  } catch (err) {
    console.error('Openrouter error:', err);
    const errorDetails = err.message || err.error?.message || 'Unknown error';
    res.status(500).json({error: 'Error generating AI response', details: err.message});
  }
};

export default { generateAIResponse };