import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({ publicRoutes: ["/", "/products/(.*)"], ignoredRoutes: ["/api/products", "/api/products/get/(.*)"] });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
