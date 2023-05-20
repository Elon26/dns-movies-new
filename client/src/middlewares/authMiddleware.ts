import { NextResponse, NextRequest, NextFetchEvent } from "next/server";
import { MiddlewareFactory } from "./types";
import jwtDecode from "jwt-decode";

export const authMiddleware: MiddlewareFactory = (next) => {
    return (request: NextRequest, _next: NextFetchEvent) => {
        const refreshToken = request.cookies.get("refreshToken")?.value;
        const url = request.nextUrl.clone();

        // guard для админ страницы
        if (request.nextUrl.pathname === "/admin") {
            url.pathname = "/404";
            if (refreshToken === undefined) {
                return NextResponse.redirect(url);
            }

            try {
                const decode: { roles: { name: string }[] } =
                    jwtDecode(refreshToken);
                const roles = decode.roles.map((elem) => elem.name);
                if (roles.includes("USER")) {
                    return NextResponse.next();
                } else {
                    return NextResponse.redirect(url);
                }
            } catch (e) {
                return NextResponse.redirect(url);
            }
        }

        // url для редиректа на страницу, с которой был переход на страницу логина
        if (refreshToken === undefined) {
            const PUBLIC_FILE = /\.(.*)$/;

            if (
                request.nextUrl.pathname.startsWith("/_next") ||
                request.nextUrl.pathname.includes("/api/") ||
                PUBLIC_FILE.test(request.nextUrl.pathname)
            ) {
                return null;
            }
            const res = NextResponse.next();

            const pathname = request.nextUrl.pathname;
            url.pathname = pathname;

            if (
                pathname !== "/auth/login" &&
                pathname !== "/404" &&
                pathname !== "/auth/registration"
            ) {
                res.cookies.set("callbackUrl", pathname);
            }

            return res;
        }

        return NextResponse.next();
    };
};
