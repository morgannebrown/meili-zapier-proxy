export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res
      .status(200)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type')
      .end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const data = req.body;

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid or missing payload' });
  }

  console.log("✅ Payload received:", data);

  try {
    const zapierRes = await fetch('https://hooks.zapier.com/hooks/catch/22554641/2x4wdvm/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const zapierText = await zapierRes.text();
    console.log("➡️ Forwarded to Zapier:", zapierRes.status, zapierText);

    return res.status(200).json({
      message: "Payload forwarded to Zapier",
      zapier_status: zapierRes.status,
      task_id: data.task_id
    });

  } catch (err) {
    console.error("❌ Error forwarding to Zapier:", err);
    return res.status(500).json({ error: "Failed to forward to Zapier" });
  }
}
