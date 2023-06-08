import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { XataAdapter } from "@next-auth/xata-adapter"
import { XataClient } from '../../../utils/xata'
import EmailProvider from "next-auth/providers/email"


const client = new XataClient();

export const authConfig = {
    adapter: XataAdapter(client),
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
};

export default NextAuth(authConfig)