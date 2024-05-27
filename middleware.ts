import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      // console.log(token);
      const protectedPaths = [
        /\/cart/,
        /\/placeorder/,
        /\/account/,
        /\/add_product/,
        /\/edit_product/,
        /\/canteen_dashboard/,
        /\/canteen_request/,
        /\/edit_canteen/,
        /\/make_canteen/,
        /\/mobile_profile/,
        /\/orderlist/,
      ];
      const { pathname } = req.nextUrl;
      const userRole = token?.role as string; // role sekarang adalah string tunggal

      const roleProtectedPaths: Record<string, RegExp[]> = {
        admin: [/\/make_canteen/, /\/canteens/, /\/orderlist/],
        user: [
          /\/canteen_request/,
          /\/add_product/,
          /\/edit_product/,
          /\/edit_canteen/,
          /\/canteen_dashboard/,
        ],
        blu: [
          /\/canteens/,
          /\/make_canteen/,
          /\/canteen_request/,
          /\/add_product/,
          /\/edit_product/,
          /\/edit_canteen/,
        ],
        canteen: [/\/canteens/, /\/make_canteen/, /\/canteen_request/],
        // Tambahkan role lainnya dan path yang diizinkan di sini
      };

      // Fungsi untuk mengecek apakah pengguna memiliki akses ke path berdasarkan perannya
      const hasRoleAccess = (role: string, path: string) => {
        // console.log(role, path);
        return (roleProtectedPaths[role] || []).some((p) => p.test(path));
      };

      // Jika jalur dilindungi, pastikan token ada dan peran pengguna sesuai

      if (protectedPaths.some((p) => p.test(pathname))) {
        let isRole = false;
        if (userRole) {
          isRole = true;
        }
        return !!token && isRole && !hasRoleAccess(userRole, pathname);
      }

      // Untuk jalur lain, izinkan akses
      return true;
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
