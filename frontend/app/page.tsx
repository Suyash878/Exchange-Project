"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="text-center space-y-12 px-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          <span className="text-white">Trade with </span>
          <span className="text-blue-500">confidence</span>
          <span className="text-white">.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
          Lightning-fast trades with institutional-grade security
        </p>
        <button
          onClick={() => router.push("/markets")}
          className="mt-12 px-16 py-6 text-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 hover:scale-105 transform transition-all duration-300 ease-out shadow-2xl shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Explore Markets
        </button>
      </div>
    </main>
  )
}
