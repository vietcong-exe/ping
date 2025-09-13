export default async function handler(req, res) {
  const { host } = req.query;

  if (!host) {
    return res.status(400).json({ error: "Informe um host, exemplo: /api/ping?host=google.com" });
  }

  try {
    const url = host.startsWith("http") ? host : `https://${host}`;

    const start = Date.now();
    await fetch(url, { method: "HEAD" }); // HEAD é mais rápido que GET
    const end = Date.now();

    const latency = end - start;

    res.status(200).json({ ping: latency });
  } catch (err) {
    res.status(500).json({ error: "Falha ao medir ping", details: err.message });
  }
}
