import { getSession } from 'next-auth/client'
import { connectToDatabase } from '@/util/connectToDb'
import { ObjectId } from 'mongodb'

async function handler(req, res) {
  const session = await getSession({ req })
  const { db } = await connectToDatabase();

  if(session?.user.role !== 'admin') {
    return res.status(401).json({ success: false, message: 'Unauthenticated User'})
  }

  if(req.method === 'GET') {
    try {
        const categories = await db.collection('productCategories').find().sort({ "_id": -1}).toArray();  
        return res.status(200).json({ success: true, categories: categories })
    } catch (e) {
        return res.status(401).json({ success: false, message: 'Something went wrong' })
    }   
  }

  if (req.method === 'POST') {
    const category = req.body

    const existingProduct = await db.collection('productCategories').findOne({ name: category});

    if (existingProduct) {
        return res.status(422).json({ success: false, message: 'Category already exists!' });
    }

    try {
        await db.collection('productCategories').insertOne({
          name: category
        }); 
    } catch (e) {
        return res.status(422).json({ success: false, message: 'Something Went Wrong! Try Again' });
    }

    return res.status(201).json({ success: true, message: 'Category Created Successfully' });
  }

  if(req.method === 'DELETE') {
    db.collection('productCategories').deleteOne({ _id: ObjectId(`${req.query.id}`)}, function(err) {
        if(err) return res.status(201).json({ success: false, message: 'Something went wrong'})
        return res.status(201).json({ success: true, message: 'Verified'})
    });
  }

}

export default handler;