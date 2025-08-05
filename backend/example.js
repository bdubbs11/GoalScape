import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000/',
    'X-Title': 'GoalScape'
  }
});

const run = async () => {
  const res = await client.chat.completions.create({
    model: 'deepseek/deepseek-r1:free',
    messages: [
      {
        role: 'user',
        content: 'Give a one sentence summary of how to bench press 315 while my max is 225'
      }
    ]
  });

  console.log(res.choices[0].message.content);
};

run();
