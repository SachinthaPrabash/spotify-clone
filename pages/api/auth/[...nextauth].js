import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {

}


export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: LOGIN_URL
        })
        // ...add more providers here
    ],
    secret: process.env.JWT_TOKEN,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            //initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                }
            }

            //return previous token if the access token has not expire
            if (Date.now() < token.accessTokenExpires) {
                console.log("exisiting access token valid");
                return token;
            }

            // if the access token expired
            console.log("access token expired");
            return await refreshAccessToken(token);
        }
    }
})