export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const geminiMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: `You are the AI assistant for With Me AI platform.
STRICT RULES:
- ALWAYS respond in English only, unless the user writes in Persian/Farsi
- If user writes in Persian, respond in Persian
- Use bold text frequently with **word** format for important terms
- Use a distinctive, sharp writing style — confident, clear, modern
- Never be generic or bland
- Keep responses focused and powerful` }]
          },
          contents: geminiMessages,
          generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
        }),
      }
    );

    const data = await response.json();
    if (data.error) return res.status(400).json({ error: data.error.message });
    const reply = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
