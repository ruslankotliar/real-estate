// import { join } from 'path';
// import * as fs from 'fs';
// import { mkdir, stat } from 'fs/promises';
// import User from '../../../models/User';
// import dbConnect from '../../../lib/dbConnect';

// export default async function handler(req, res) {
//   await dbConnect();
//   const email = req.body;
//   const validUser = await User.findOne({ email: email });
//   if (validUser) {
//     const { avatarURL, file } = validUser;
//     const fileName = avatarURL.split('/')[avatarURL.split('/').length - 1];
//     fs.writeFile(`${uploadDir}/${fileName}`, file.data, (err) => {
//       if (err) {
//         throw new Error(err);
//       }
//     });
//     res.status(200).json({ success: true });
//   } else {
//     res.status(400).json({ success: false });
//   }
// }
