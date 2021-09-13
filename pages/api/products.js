import { getSession } from 'next-auth/client'
import { connectToDatabase } from '@/util/connectToDb'
import { ObjectId } from 'mongodb'

async function handler(req, res) {
  const session = await getSession({ req })
  const { db } = await connectToDatabase();

  if(req.method === 'GET') {
    try {
        const products = await db.collection('products').find().sort({ "_id": -1}).toArray();  
        return res.status(200).json({ success: true, products })
    } catch (e) {
        return res.status(401).json({ success: false, message: 'Something went wrong' })
    }   
  }

  if (req.method === 'POST') {

    if(session?.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Unauthenticated User'})
    }

    console.log(req.body.name)
    
    const { name, description, price, imageUrl, category } = req.body

    const existingProduct = await db.collection('products').findOne({ name: name});

    if (existingProduct) {
        return res.status(422).json({ success: false, message: 'Product already exists!' });
    }

    try {
        await db.collection('products').insertOne({
          name,
          description,
          price,
          imageUrl,
          category
        }); 
    } catch (e) {
        return res.status(422).json({ success: false, message: 'Something Went Wrong! Try Again' });
    }

    return res.status(201).json({ success: true, message: 'Product Created Successfully' });
  }

  if(req.method === 'DELETE') {
    if(session?.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Unauthenticated User'})
    }
    db.collection('products').deleteOne({ _id: ObjectId(`${req.query.id}`)}, function(err) {
        if(err) return res.status(201).json({ success: false, message: 'Something went wrong'})
        return res.status(201).json({ success: true, message: 'Deleted Successfully'})
    });
  }

}

export default handler;