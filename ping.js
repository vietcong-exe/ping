// instale dependências primeiro:
// npm init -y
// npm install express ping

const express = require("express");
const ping = require("ping");

const app = express();
const PORT = 3000;

// Rota dinâmica: /dominio.com
app.get("/:host", async (req, res) => {
  const host = req.params.host;

  try {
    const result = await ping.promise.probe(host, { timeout: 5 });

    if (result.alive) {
      res.json({ ping: result.time ? parseFloat(result.time) : null });
    } else {
      res.status(400).json({ error: `Não foi possível pingar ${host}` });
    }
  } catch (err) {
    res.status(500).json({ error: "Erro interno", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
