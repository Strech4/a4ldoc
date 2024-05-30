import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db"
import bcrypt from 'bcrypt';

export const authOptions = {
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string };
                try {
                    const user = await prisma.user.findUnique({
                        where: { email }
                    });
                    if (!user) {
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }

                    return user;

                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            if(user){
                return {
                    ...token,
                    id: user.id,
                };
            }
            return token;
        },
        async session({ session, token, user }){
            
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                }
            };

            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth"
    }
} satisfies NextAuthOptions