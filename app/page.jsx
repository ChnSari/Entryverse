'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'

const City = dynamic(() => import('@/components/canvas/City').then((mod) => mod.City), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full" />
    </div>
  ),
})

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  // LOGIN
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  // RESET
  const [resetOpen, setResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMsg, setResetMsg] = useState(null)

  // SIGN UP (AAA)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [signUpFullName, setSignUpFullName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('')
  const [signUpMsg, setSignUpMsg] = useState(null)

  // LOGIN HANDLER
  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill all fields')
      return
    }

    setError(null)
    console.log('login:', { email, password })
  }

  // RESET HANDLER
  const handleReset = () => {
    if (!resetEmail) {
      setResetMsg('Please enter your email')
      return
    }

    setResetMsg('Reset link sent ✔')
  }

  return (
    <div className="w-screen h-screen overflow-hidden">

      {/* 3D BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <View orbit className="w-full h-full">
          <Suspense fallback={null}>
            <City scale={1} position={[-90, -55, -120]} rotation={[0, Math.PI / 4, 0]} />
            <Common color="#d1d5db" />
          </Suspense>
        </View>
      </div>

      {/*LOGIN PANEL */}
      <div className="fixed top-24 left-6 z-40">
        <div className="w-[360px] p-5 rounded-2xl bg-black/30 backdrop-blur-xl shadow-2xl text-white">

          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-sm text-gray-200 mt-1">
            Sign in to continue your workspace
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-5">

            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 text-sm rounded-xl outline-none text-gray-800 bg-gray-100"
            />

            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 text-sm rounded-xl outline-none text-gray-800 bg-gray-100"
            />

            {error && (
              <div className="text-red-300 text-sm">{error}</div>
            )}

            <button type="submit"
              className="mt-2 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-black text-white text-sm font-medium shadow-lg hover:scale-[1.01] transition">
              Sign in
            </button>

            <div className="text-center text-sm text-gray-200 mt-2">
              Don’t have an account?{" "}
              <span onClick={() => setSignUpOpen(true)}
                className="text-gray-900 font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </div>

            <div onClick={() => setResetOpen(true)}
              className="text-xs text-gray-300 cursor-pointer hover:underline mt-2 text-center"
            >
              Forgot password?
            </div>
          </form>
        </div>
      </div>

      {/* RESET MODAL */}
      {resetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />

          <div
            className="relative z-10 w-[360px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl p-6 text-white shadow-2xl">

            <h2 className="text-xl font-semibold">Reset Password</h2>
            <p className="text-sm text-white/60 mt-1">
              We will send a reset link to your email
            </p>

            <div className="relative mt-5">
              <input value={resetEmail} onChange={(e) => setResetEmail(e.target.value)}
                className="w-full rounded-xl bg-white/5 px-4 pt-5 pb-2 outline-none ring-1 ring-white/10 focus:ring-2
                focus:ring-gray-400 text-white"
              />
              <label className="absolute left-4 top-2 text-xs text-white/50">
                Email
              </label>
            </div>

            {resetMsg && (
              <div className="mt-4 text-green-300 text-sm">
                {resetMsg}
              </div>
            )}

            <div className="mt-6 flex gap-3">

              <button onClick={handleReset}
                className="flex-1 rounded-xl bg-gradient-to-r from-gray-900 to-black py-2 text-sm font-medium hover:scale-[1.02] transition">
                Send
              </button>

              <button onClick={() => {
                setResetOpen(false)
                setResetEmail('')
                setResetMsg(null)
              }}
                className="flex-1 rounded-xl border border-white/10 py-2 text-sm hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIGN UP MODAL */}
      {signUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />
          <div
            className="relative z-10 w-[380px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl p-6 text-white shadow-2xl">

            <h2 className="text-xl font-semibold">Create Account</h2>
            <p className="text-sm text-white/60 mt-1">
              Join the platform in seconds
            </p>

            {/* FULL NAME */}
            <div className="relative mt-5">
              <input value={signUpFullName} onChange={(e) => setSignUpFullName(e.target.value)}
                placeholder=" "
                className="w-full rounded-xl bg-white/5 px-4 pt-5 pb-2 outline-none ring-1 ring-white/10 focus:ring-2
                focus:ring-gray-400 text-white"
              />
              <label className="absolute left-4 top-2 text-xs text-white/50">
                Full Name
              </label>
            </div>

            {/* EMAIL */}
            <div className="relative mt-4">
              <input value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder=" "
                className="w-full rounded-xl bg-white/5 px-4 pt-5 pb-2 outline-none ring-1 ring-white/10 focus:ring-2
                focus:ring-gray-400 text-white"
              />
              <label className="absolute left-4 top-2 text-xs text-white/50">
                Email
              </label>
            </div>

            {/* PASSWORD */}
            <div className="relative mt-4">
              <input type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)}
                placeholder=" "
                className="w-full rounded-xl bg-white/5 px-4 pt-5 pb-2 outline-none ring-1 ring-white/10 focus:ring-2
                focus:ring-gray-400 text-white"
              />
              <label className="absolute left-4 top-2 text-xs text-white/50">
                Password
              </label>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative mt-4">
              <input type="password" value={signUpConfirmPassword} onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                placeholder=" "
                className="w-full rounded-xl bg-white/5 px-4 pt-5 pb-2 outline-none ring-1 ring-white/10 focus:ring-2
                focus:ring-gray-400 text-white"
              />
              <label className="absolute left-4 top-2 text-xs text-white/50">
                Confirm Password
              </label>
            </div>

            {signUpMsg && (
              <div className="mt-4 text-sm text-green-300">
                {signUpMsg}
              </div>
            )}

            <div className="mt-6 flex gap-3">

              <button onClick={() => {
                if (
                  !signUpFullName ||
                  !signUpEmail ||
                  !signUpPassword ||
                  !signUpConfirmPassword
                ) {
                  setSignUpMsg('Please fill all fields')
                  return
                }

                if (signUpPassword !== signUpConfirmPassword) {
                  setSignUpMsg('Passwords do not match')
                  return
                }

                setSignUpMsg('Account created successfully ✔')
                console.log({
                  name: signUpFullName,
                  email: signUpEmail,
                  password: signUpPassword,
                })
              }}
                className="flex-1 rounded-xl bg-gradient-to-r from-gray-900 to-black py-2 text-sm font-medium
                hover:scale-[1.02] transition"
              >
                Create
              </button>

              <button onClick={() => {
                setSignUpOpen(false)
                setSignUpFullName('')
                setSignUpEmail('')
                setSignUpPassword('')
                setSignUpConfirmPassword('')
                setSignUpMsg(null)
              }}
                className="flex-1 rounded-xl border border-white/10 py-2 text-sm hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}