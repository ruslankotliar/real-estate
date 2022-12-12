import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({
      error: 'Method Not Allowed',
    });
    return;
  }

  try {
    const { email, password, fileURL } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await dbConnect();
    // CHECK WETHER USER EXISTS
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      res.status(409).json({ success: false });
    } else {
      // create user
      const user = await User.create({
        email: email,
        password: hashPassword,
        fileURL: fileURL,
      }); /* create a new model in the database */
      res.status(201).json({ success: true, error: null });
    }
  } catch (e) {
    if (e.code == 11000) {
      res.status(409).json({ success: false, error: e.message });
    } else {
      res.status(400).json({ success: false, error: e.message });
    }
  }
}
