import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const protectedPaths = [
        /\/profile/,
        /\/admin/,
      ];
      const { pathname } = req.nextUrl;
      // Jika jalur dilindungi, pastikan token ada
      if (protectedPaths.some((p) => p.test(pathname))) return !!token;
      // Untuk jalur lain, izinkan akses
      return true;
    },
  },
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};