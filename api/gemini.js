// /api/gemini.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { pergunta } = await req.json().catch(() => ({}));
  if (!pergunta) {
    return res.status(400).json({ error: "Pergunta não recebida" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Responda **em português do Brasil**, de forma gentil e educativa, sobre o ciclo menstrual feminino. Pergunta da usuária: ${pergunta}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const resposta =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não consegui responder agora 😔";

    res.status(200).json({ resposta });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao conectar ao Gemini" });
  }
}
