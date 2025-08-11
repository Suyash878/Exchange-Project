"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface MarketData {
  symbol: string
  price: string
  priceChangePercent: string
  volume: string
  quoteVolume: string
}

const SUPPORTED_SYMBOLS = [
  "BTC",
  "ETH",
  "SOL",
  "PYTH",
  "JTO",
  "BONK",
  "HNT",
  "MOBILE",
  "WIF",
  "JUP",
  "RENDER",
  "WEN",
  "W",
  "TNSR",
  "PRCL",
  "SHARK",
  "KMNO",
  "MEW",
  "BOME",
  "RAY",
  "HONEY",
  "SHFL",
  "BODEN",
  "IO",
  "DRIFT",
  "PEPE",
  "SHIB",
  "LINK",
  "UNI",
  "ONDO",
  "FTM",
  "MATIC",
  "STRK",
  "BLUR",
  "WLD",
  "GALA",
  "NYAN",
  "HLG",
  "MON",
  "ZKJ",
  "MANEKI",
  "HABIBI",
  "UNA",
  "ZRO",
  "ZEX",
  "AAVE",
  "LDO",
  "MOTHER",
  "CLOUD",
  "MAX",
]

export default function TradingTable() {
  const [markets, setMarkets] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const getMarketData = async () => {
    try {
      // Create promises for all supported symbols
      const promises = SUPPORTED_SYMBOLS.map(
        (symbol) =>
          axios
            .get(`https://exchange-project.onrender.com/api/v1/ticker?symbol=${symbol}_USDC`)
            .then((res) => {
              console.log(`Raw data for ${symbol}:`, res.data)
              return res.data
            })
            .catch(() => null), // Handle cases where the pair doesn't exist
      )

      // Wait for all requests to complete
      const results = await Promise.all(promises)

      // Format the market data
      const formattedMarkets = results.map((result, index) => {
        if (!result) {
          // Return default values if the pair doesn't exist
          return {
            symbol: `${SUPPORTED_SYMBOLS[index]}/USDC`,
            price: "0.00",
            priceChangePercent: "0.00",
            volume: "0.00",
            quoteVolume: "0.00",
          }
        }

        return {
          symbol: result.symbol.replace("_", "/"),
          price: Number.parseFloat(result.lastPrice).toFixed(2),
          // Fix: Multiply by 100 to convert decimal to percentage
          priceChangePercent: (Number.parseFloat(result.priceChangePercent) * 100).toFixed(2),
          volume: Number.parseFloat(result.volume).toFixed(2),
          quoteVolume: Number.parseFloat(result.quoteVolume).toFixed(2),
        }
      })

      // Sort by quote volume, putting active markets first
      const sortedMarkets = formattedMarkets.sort(
        (a, b) => Number.parseFloat(b.quoteVolume) - Number.parseFloat(a.quoteVolume),
      )

      setMarkets(sortedMarkets)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching market data:", err)
      // If API fails, show all symbols with default values
      const defaultMarkets = SUPPORTED_SYMBOLS.map((symbol) => ({
        symbol: `${symbol}/USDC`,
        price: "0.00",
        priceChangePercent: "0.00",
        volume: "0.00",
        quoteVolume: "0.00",
      }))
      setMarkets(defaultMarkets)
      setLoading(false)
    }
  }

  const handleRowClick = (symbol: string) => {
    const [base] = symbol.split("/")
    const formattedPair = `${base}_USDC`
    router.push(`/trade/${formattedPair}`)
  }

  const formatVolume = (volume: string) => {
    const num = Number.parseFloat(volume)
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toFixed(2)
  }

  useEffect(() => {
    getMarketData()
    const interval = setInterval(getMarketData, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col flex-1 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        <div className="flex items-center gap-3 mb-8">
          <Activity className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-semibold text-white tracking-tight">Markets</h1>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800/50 overflow-hidden">
          <div className="animate-pulse">
            <div className="grid grid-cols-4 gap-4 p-6 border-b border-slate-800/50">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded"></div>
            </div>
            {[...Array(10)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 p-6 border-b border-slate-800/30">
                <div className="h-4 bg-slate-800 rounded"></div>
                <div className="h-4 bg-slate-800 rounded"></div>
                <div className="h-4 bg-slate-800 rounded"></div>
                <div className="h-4 bg-slate-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen font-system">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="w-8 h-8 text-blue-400" />
        <h1 className="text-3xl font-semibold text-white tracking-tight">Markets</h1>
        <div className="ml-auto flex items-center gap-2 text-sm text-slate-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Live Data
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800/50 bg-slate-800/30">
                <th className="py-4 px-6 text-left text-sm font-medium text-slate-300 tracking-wide">Trading Pair</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-slate-300 tracking-wide">Price</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-slate-300 tracking-wide">24h Change</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-slate-300 tracking-wide">Volume</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((market, index) => {
                const isPositive = Number.parseFloat(market.priceChangePercent) >= 0
                const [base, quote] = market.symbol.split("/")

                return (
                  <tr
                    key={market.symbol}
                    className="border-b border-slate-800/30 hover:bg-slate-800/40 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.01] hover:shadow-lg group"
                    onClick={() => handleRowClick(market.symbol)}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {base.slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-white font-medium text-base group-hover:text-blue-300 transition-colors duration-200">
                            {base}
                            <span className="text-slate-400 font-normal">/{quote}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-5 px-6 text-right">
                      <div className="text-white font-mono text-base font-medium">${market.price}</div>
                    </td>

                    <td className="py-5 px-6 text-right">
                      <div
                        className={`flex items-center justify-end gap-1 font-medium ${
                          isPositive ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="font-mono">
                          {isPositive ? "+" : ""}
                          {market.priceChangePercent}%
                        </span>
                      </div>
                    </td>

                    <td className="py-5 px-6 text-right">
                      <div className="text-slate-300 font-mono text-sm">${formatVolume(market.quoteVolume)}</div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-slate-500">
        Data updates every 10 seconds • {markets.length} trading pairs
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .font-system {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        }
      `}</style>
    </div>
  )
}
