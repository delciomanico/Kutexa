import OpenAI from 'openai';

export async function askLLM(prompt: string) {
/*
    const response = await fetch('https://openrouter.ai/api/v1/responses', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'openai/o4-mini',
            input: [
                {
                    type: 'message',
                    role: 'user',
                    content: [
                        {
                            type: 'input_text',
                            text: `oi`,
                        },
                    ],
                },
            ],
            max_output_tokens: 9000,
        }),
    });

const result = await response.json() as { output?: { content?: { text?: string }[] }[] };

*/
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: `${process.env.OPENROUTER_API_KEY}`,
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  },
});

  const completion = await openai.chat.completions.create({
    model: "openrouter/andromeda-alpha",
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": `${prompt}`
          },
        ]
      }
    ],
    
  });

  return completion.choices[0].message.content?.trim() || '';
}