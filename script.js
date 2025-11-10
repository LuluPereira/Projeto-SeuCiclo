async function responderPergunta(pergunta) {
  const response = await fetch("https://api.binjie.fun/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      prompt: `Responda em português do Brasil, de forma gentil, educativa e clara sobre o ciclo menstrual feminino. Pergunta da usuária: ${pergunta}`,
      temperature: 0.7
    })
  });

  const texto = await response.text();
  document.getElementById("resposta-da-ia").innerText = texto;
}
