import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDatabase } from '@/util/connectToDb'
import { compare } from 'bcryptjs';

const options = {
    providers: [
        Providers.Credentials({
            name: "Custom Provider",
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: "admin"},
                password: { label: 'Password', type: 'Password' }
            },
            async authorize(credentials) {
                const { db } = await connectToDatabase();
                const admin = await db.collection('admin').findOne({ username: credentials.username });
                
                if (!admin) {
                    throw new Error('User not found')
                    // return res.json({ success: false, message: 'User not found' });
                }

                const checkPassword = await compare(credentials.password, admin.password);

                if(!checkPassword) {
                    throw new Error('Incorrect Password')
                }

                return { name: admin.username }
            }
        })
    ],
    pages: { 
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    session: {
        jwt: true, 
    },
    jwt: {
        secret: '1231232131313123'
    },
    callbacks: {
        async redirect() {
            return process.env.NEXTAUTH_URL
        },
        async session(session, token) {
            session.user.role = 'admin'
            return session
        }
    }
}

export default (req, res) => NextAuth(req, res, options)