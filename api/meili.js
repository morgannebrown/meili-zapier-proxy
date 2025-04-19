export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).setHeader("Access-Control-Allow-Origin", "*").end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const data = req.body;

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid or missing payload' });
  }

  console.log("✅ Payload received:", data);

  // You can optionally forward to Make here using fetch()
  return res.status(200).json({ message: "Payload received", task_id: data.task_id });
}
