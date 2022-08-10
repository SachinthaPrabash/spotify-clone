import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req) {

    //Token will exist if user log in
    const token = await getToken({ req, secret: process.env.JWT_TOKEN });

    const { pathname, origin } = req.nextUrl;

    //allow the request if the following is true
    // 1. it's requesting for next-auth and provider fetching
    // 2. the token exists

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    //redirect them to login if they haven't a token and requesting a protected route 

    if (!token && pathname !== `/login`) {
        return NextResponse.redirect(`${origin}/login`);
    }
}