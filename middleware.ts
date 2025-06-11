import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/instructor(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // // Bảo vệ route /instructor - yêu cầu quyền admin
  // if (isInstructorRoute(req)) {
  //   await auth.protect((has) => has({ role: 'admin' }));
  // }

  // Bảo vệ route - chỉ cần đăng nhập
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Bỏ qua file tĩnh và nội bộ Next.js
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Luôn chạy middleware cho route API
    '/(api|trpc)(.*)',
  ],
};