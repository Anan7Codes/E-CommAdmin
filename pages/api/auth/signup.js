import { hashPassword } from '@/util/auth';
import { connectToDatabase } from '@/util/connectToDb'

async function handler(req, res) {

  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  console.log(data)
  const { username, password } = data;

  const { db } = await connectToDatabase();

  const existingUser = await db.collection('users').findOne({ username: username });

  if (existingUser) {
    return res.status(422).json({ success: false, message: 'User exists already!' });
  }

  const hashedPassword = await hashPassword(password);

  try {
    const result = await db.collection('admin').insertOne({
      username: username,
      password: hashedPassword,
    });  

  } catch (e) {
    return res.status(422).json({ success: false, message: 'Something Went Wrong! Try Again' });
  }

  return res.status(201).json({ success: true, message: 'User Created Successfully' });
}

export default handler;