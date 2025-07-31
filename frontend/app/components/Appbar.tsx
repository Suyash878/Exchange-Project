"use client"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export const Appbar = () => {
  const route = usePathname()
  const router = useRouter()

  return (
    <div className="bg-slate-950/95 backdrop-blur-sm border-b border-slate-800/50 sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div
            className="text-2xl font-bold cursor-pointer text-white hover:text-blue-400 transition-colors duration-200"
            onClick={() => router.push("/")}
          >
            Exchange
          </div>
          <nav className="flex items-center space-x-6">
            <div
              className={`text-sm font-medium cursor-pointer transition-colors duration-200 hover:text-blue-400 ${
                route.startsWith("/markets") ? "text-blue-500" : "text-slate-400"
              }`}
              onClick={() => router.push("/markets")}
            >
              Markets
            </div>
            <div
              className={`text-sm font-medium cursor-pointer transition-colors duration-200 hover:text-blue-400 ${
                route.startsWith("/trade") ? "text-blue-500" : "text-slate-400"
              }`}
              onClick={() => router.push("/trade/SOL_USDC")}
            >
              Trade
            </div>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-lg shadow-green-500/25">
            Deposit
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-500/25">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}
