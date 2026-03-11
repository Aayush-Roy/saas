// "use client"
// import { useSignUp } from '@clerk/nextjs'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import React, { useState } from 'react'
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// const Signup = () => {
//   const{isLoaded,signUp,setActive}=useSignUp();
//   const[emailAddress,setEmailAddress]=useState("")
//   const[password,setPassword]=useState("")
//   const[pendingVerification,setPendingVerification] = useState(false);
//   const[code,setCode]=useState("");
//   const[error,setError] = useState("")
//   const router = useRouter()
//   // if(!isLoaded)
//   // {
//   //   return null;
//   // }
//   if (!isLoaded) {
//   return <div>Loading...</div>
// }
//   async function submit(e:React.FormEvent) {
//     e.preventDefault();
//     if(!isLoaded)
//   {
//     return ;
//   }

//   try{
//     await signUp.create({
//       emailAddress,
//       password
//     })
// //     await signUp.prepareEmailAddressVerification({
// //   strategy: "email_code",
// // });
//     await signUp.verifications.sendEmailCode()
//     setPendingVerification(true)
//   }catch(err:any){
//     console.log(JSON.stringify(err,null,2));
//     setError(err.errors[0].message)
//   }

//   }

//   async function onPressVerify(e:React.FormEvent) {
//     e.preventDefault()
//     if(!isLoaded) return;
//     try{
//     const completeSignUp =  await signUp.verifications.verifyEmailCode({code});
//     if(completeSignUp.status!=="complete"){
//       console.log(JSON.stringify(completeSignUp,null,2))
//     }

//     if(completeSignUp.status==="complete"){
//       // console.log(JSON.stringify(completeSignUp,null,2))
//       await setActive({session:completeSignUp.createdSessionId})
//     }

//     }catch(err:any){
//       console.log(JSON.stringify(err,null,2));
//     setError(err.errors[0].message)
//     }

//   }

// //  return (
// //     <Card className="w-full max-w-sm">
// //       <CardHeader>
// //         <CardTitle>Login to your account</CardTitle>
// //         <CardDescription>
// //           Enter your email below to login to your account
// //         </CardDescription>
// //         <CardAction>
// //           <Button variant="link">Sign Up</Button>
// //         </CardAction>
// //       </CardHeader>
// //       <CardContent>
// //         <form>
// //           <div className="flex flex-col gap-6">
// //             <div className="grid gap-2">
// //               <Label htmlFor="email">Email</Label>
// //               <Input
// //                 id="email"
// //                 type="email"
// //                 placeholder="m@example.com"
// //                 required
// //               />
// //             </div>
// //             <div className="grid gap-2">
// //               <div className="flex items-center">
// //                 <Label htmlFor="password">Password</Label>
// //                 <a
// //                   href="#"
// //                   className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
// //                 >
// //                   Forgot your password?
// //                 </a>
// //               </div>
// //               <Input id="password" type="password" required />
// //             </div>
// //           </div>
// //         </form>
// //       </CardContent>
// //       <CardFooter className="flex-col gap-2">
// //         <Button type="submit" className="w-full">
// //           Login
// //         </Button>
// //         <Button variant="outline" className="w-full">
// //           Login with Google
// //         </Button>
// //       </CardFooter>
// //     </Card>
// //   )
// return (
//   <Card className="w-full max-w-sm">
//     <CardHeader>
//       <CardTitle>
//         {pendingVerification ? "Verify your Email" : "Create your account"}
//       </CardTitle>

//       <CardDescription>
//         {pendingVerification
//           ? "Enter the verification code sent to your email"
//           : "Enter your email and password to sign up"}
//       </CardDescription>
//     </CardHeader>

//     <CardContent>

//       {!pendingVerification ? (

//         // SIGNUP FORM
//         <form onSubmit={submit}>
//           <div className="flex flex-col gap-6">

//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//                 value={emailAddress}
//                 onChange={(e) => setEmailAddress(e.target.value)}
//               />
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             {error && (
//               <p className="text-sm text-red-500">{error}</p>
//             )}

//             <Button type="submit" className="w-full">
//               Sign Up
//             </Button>

//           </div>
//         </form>

//       ) : (

//         // EMAIL VERIFICATION FORM
//         <form onSubmit={onPressVerify}>
//           <div className="flex flex-col gap-6">

//             <div className="grid gap-2">
//               <Label htmlFor="code">Verification Code</Label>
//               <Input
//                 id="code"
//                 type="text"
//                 placeholder="Enter email code"
//                 required
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//               />
//             </div>

//             {error && (
//               <p className="text-sm text-red-500">{error}</p>
//             )}

//             <Button type="submit" className="w-full">
//               Verify Email
//             </Button>

//           </div>
//         </form>

//       )}

//     </CardContent>

//     {/* {!pendingVerification && (
//       <CardFooter className="flex-col gap-2">
//         <Button variant="outline" className="w-full">
//           Login with Google
//         </Button>
//       </CardFooter>
//     )} */}
//   </Card>
// )
// }

// export default Signup

'use client'

import { useAuth, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const emailAddress = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await signUp.password({
      emailAddress,
      password,
    })
    
    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }

    if (!error) await signUp.verifications.sendEmailCode()
  }

  const handleVerify = async (formData: FormData) => {
    const code = formData.get('code') as string

    await signUp.verifications.verifyEmailCode({ code })
    
    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask)
            return
          }
          const url = decorateUrl('/')
          if (url.startsWith('http')) {
            window.location.href = url
          } else {
            router.push(url)
          }
        },
      })
    }
  }

  if (signUp.status === 'complete' || isSignedIn) return null

  // Verification View
  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address') &&
    signUp.missingFields.length === 0
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Verify your account</h1>
            <p className="mt-2 text-sm text-gray-600">We've sent a code to your email.</p>
          </div>
          
          <form action={handleVerify} className="mt-8 space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">Verification Code</label>
              <input 
                id="code" 
                name="code" 
                type="text" 
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.fields.code && <p className="mt-1 text-xs text-red-500">{errors.fields.code.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={fetchStatus === 'fetching'}
              className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {fetchStatus === 'fetching' ? 'Verifying...' : 'Verify'}
            </button>
          </form>

          <button 
            onClick={() => signUp.verifications.sendEmailCode()}
            className="w-full text-sm text-blue-600 hover:underline"
          >
            I need a new code
          </button>
        </div>
      </div>
    )
  }

  // Sign Up View
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create an account</h1>
        </div>

        <form action={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input 
                id="email" 
                type="email" 
                name="email" 
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.fields.emailAddress && <p className="mt-1 text-xs text-red-500">{errors.fields.emailAddress.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                id="password" 
                type="password" 
                name="password" 
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.fields.password && <p className="mt-1 text-xs text-red-500">{errors.fields.password.message}</p>}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={fetchStatus === 'fetching'}
            className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {fetchStatus === 'fetching' ? 'Processing...' : 'Continue'}
          </button>
        </form>

        {/* Error Debugging Box */}
        {Object.keys(errors.fields).length > 0 && (
          <div className="mt-4 rounded-md bg-red-50 p-3">
             <p className="text-xs text-red-700 font-mono">Check details above or try again.</p>
          </div>
        )}

        <div id="clerk-captcha" className="mt-4" />
      </div>
    </div>
  )
}