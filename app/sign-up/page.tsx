"use client"
import { useSignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Session } from 'node:inspector/promises'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
const Signup = () => {
  const{isLoaded,signUp,setActive}=useSignUp();
  const[emailAddress,setEmailAddress]=useState("")
  const[password,setPassword]=useState("")
  const[pendingVerification,setPendingVerification] = useState(false);
  const[code,setCode]=useState("");
  const[error,setError] = useState("")
  const router = useRouter()
  // if(!isLoaded)
  // {
  //   return null;
  // }
  if (!isLoaded) {
  return <div>Loading...</div>
}
  async function submit(e:React.FormEvent) {
    e.preventDefault();
    if(!isLoaded)
  {
    return ;
  }

  try{
    await signUp.create({
      emailAddress,
      password
    })
//     await signUp.prepareEmailAddressVerification({
//   strategy: "email_code",
// });
    await signUp.verifications.sendEmailCode()
    setPendingVerification(true)
  }catch(err:any){
    console.log(JSON.stringify(err,null,2));
    setError(err.errors[0].message)
  }

  }

  async function onPressVerify(e:React.FormEvent) {
    e.preventDefault()
    if(!isLoaded) return;
    try{
    const completeSignUp =  await signUp.verifications.verifyEmailCode({code});
    if(completeSignUp.status!=="complete"){
      console.log(JSON.stringify(completeSignUp,null,2))
    }

    if(completeSignUp.status==="complete"){
      // console.log(JSON.stringify(completeSignUp,null,2))
      await setActive({session:completeSignUp.createdSessionId})
    }

    }catch(err:any){
      console.log(JSON.stringify(err,null,2));
    setError(err.errors[0].message)
    }

  }

//  return (
//     <Card className="w-full max-w-sm">
//       <CardHeader>
//         <CardTitle>Login to your account</CardTitle>
//         <CardDescription>
//           Enter your email below to login to your account
//         </CardDescription>
//         <CardAction>
//           <Button variant="link">Sign Up</Button>
//         </CardAction>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex flex-col gap-6">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Password</Label>
//                 <a
//                   href="#"
//                   className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                 >
//                   Forgot your password?
//                 </a>
//               </div>
//               <Input id="password" type="password" required />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex-col gap-2">
//         <Button type="submit" className="w-full">
//           Login
//         </Button>
//         <Button variant="outline" className="w-full">
//           Login with Google
//         </Button>
//       </CardFooter>
//     </Card>
//   )
return (
  <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle>
        {pendingVerification ? "Verify your Email" : "Create your account"}
      </CardTitle>

      <CardDescription>
        {pendingVerification
          ? "Enter the verification code sent to your email"
          : "Enter your email and password to sign up"}
      </CardDescription>
    </CardHeader>

    <CardContent>

      {!pendingVerification ? (

        // SIGNUP FORM
        <form onSubmit={submit}>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Sign Up
            </Button>

          </div>
        </form>

      ) : (

        // EMAIL VERIFICATION FORM
        <form onSubmit={onPressVerify}>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter email code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Verify Email
            </Button>

          </div>
        </form>

      )}

    </CardContent>

    {!pendingVerification && (
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    )}
  </Card>
)
}

export default Signup
