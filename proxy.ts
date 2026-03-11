import { clerkMiddleware, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const publicRoutes = [
  "/",
  "/api/webhook/register",
  "/sign-up",
  "/sign-in"
]

export default clerkMiddleware({
  publicRoutes,
  async afterAuth(auth,req){
    if(!auth.userId && !publicRoutes.includes(req.nextUrl.pathname)){
      return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    if(auth.userId){
      try{
      // const user = await clerkClient.users.getUser(auth.userId);
      // const role = user.publicMetadata.role as string | undefined
        const client = await clerkClient();
const user = await client.users.getUser(auth.userId);
      //admin role redirection
      if(role==='/admin' && req.nextUrl.pathname==="/dashboard"){
        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
      }

      //prevent non admin user to access the admin routes
      if(role!=='/admin' && req.nextUrl.pathname.startsWith("/admin")){
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      if(publicRoutes.includes(req.nextUrl.pathname)){
        return NextResponse.redirect(
          new URL(
            role==="admin" ? "admin/dashboard" : "/dashboard", req.url
          )
        )
      }
    }catch(err){
      console.log(err);
      return NextResponse.redirect(new URL("/error", req.url))
    }

    }

  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}