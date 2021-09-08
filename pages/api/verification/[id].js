import { getSession } from 'next-auth/client'
import { connectToDatabase } from '@/util/connectToDb'
import { ObjectId } from 'mongodb'

async function handler(req, res) {
  const session = await getSession({ req })
  if (req.method !== 'PUT') {
    return;
  }

  if(session?.user.role !== 'admin') {
    return res.status(401).json({ success: false, message: 'Unauthenticated User'})
  }

  const { id } = req.query
  console.log(id)
  const { db } = await connectToDatabase();
  
  db.collection('users').updateOne({ _id: ObjectId(`${id}`)}, { $set: { verified: true }}, function(err) {
    if(err) return res.status(201).json({ success: false, message: 'Something went wrong'})
    return res.status(201).json({ success: true, message: 'Verified'})
  });
  
}

export default handler;