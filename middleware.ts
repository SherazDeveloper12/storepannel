import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/login", "/signup",];
const OTP_ROUTE = ["/verifyotp"];
export const middleware = async (req: NextRequest) => {
    console.log("middleware is running")
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('token')?.value;

    let payload: { isAuthenticated: boolean | null } = null;

    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload: decoded } = await jwtVerify(token, secret);
            payload = decoded as any;
        } catch (error) {
            console.error("Error verifying token:", error);
            payload = null;
        }
    }
    console.log("after token verification, payload is", payload)
    const isLoggedIn = !!payload
    const isVerified = payload?.isAuthenticated === true;

    if (!isLoggedIn && !PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (isLoggedIn && !isVerified && pathname !== OTP_ROUTE ) {
        return NextResponse.redirect(new URL('/verifyotp', req.url));
    }
    if (isLoggedIn && isVerified && (PUBLIC_ROUTES.includes(pathname) || pathname === OTP_ROUTE)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();

}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};