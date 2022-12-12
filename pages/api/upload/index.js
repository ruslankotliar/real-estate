import { parseForm, FormidableError } from '../../../lib/parse-form';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({
      error: 'Method Not Allowed',
    });
    return;
  }
  try {
    const { files } = await parseForm(req);

    const file = files[Object.keys(files)[0]];

    const fileURL = `/users/${file.newFilename}`;

    res.status(200).json({ error: null, fileURL, success: true });
  } catch (e) {
    if (e instanceof FormidableError) {
      res
        .status(e.httpCode || 400)
        .json({ data: null, error: e.message, success: false });
    } else {
      res
        .status(500)
        .json({ data: null, error: 'Internal Server Error', success: false });
    }
  }
}
