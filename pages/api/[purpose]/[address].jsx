export default function handler(req, res) {
  const { address } = req.query;
  return res.status(200).json({ address });
}
