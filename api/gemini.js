export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { pergunta } = await req.json().catch(() => ({}));
    if (!pergunta) {
      return res.status(400).json({ error: "Pergunta não recebida" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Responda em português do Brasil, de forma gentil, educativa e compreensível sobre saúde feminina e ciclo menstrual. Pergunta: ${pergunta}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res
        .status(500)
        .json({ error: "Erro ao conectar ao Gemini. Verifique sua chave." });
    }

    const resposta =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não consegui responder agora 😔";

    return res.status(200).json({ resposta });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Erro inesperado no servidor" });
  }
}
