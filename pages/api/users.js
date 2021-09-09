import { getSession } from 'next-auth/client'
import { connectToDatabase } from '@/util/connectToDb'

async function handler(req, res) {
  const session = await getSession({ req })
  
  if (req.method !== 'GET') {
    return;
  }

  if(session?.user.role !== 'admin') {
    return res.status(401).json({ success: false, message: 'Unauthenticated User'})
  }

  const { db } = await connectToDatabase();
  const users = await db.collection('users').find().sort({ "_id": -1}).toArray();
  
  return res.status(200).json({ success: true, users: users })

}

export default handler;