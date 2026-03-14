import Groq from 'groq-sdk';

const fallbackText =
  'Assign volunteers with medical skills to urgent requests, prioritize low-stock resources, and reinforce high-impact event areas.';

export const buildAiInsight = async (prompt) => {
  if (!process.env.GROQ_API_KEY) {
    return fallbackText;
  }

  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const completion = await client.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      {
        role: 'system',
        content: 'You are an NGO operations assistant. Reply with concise practical recommendations.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  return completion.choices?.[0]?.message?.content || fallbackText;
};
