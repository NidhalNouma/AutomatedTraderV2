import React, { useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface TradingChartProps {
  symbol?: string;
  timeframe?: string;
  height?: number;
}

const TradingChart: React.FC<TradingChartProps> = ({ 
  symbol = 'BTCUSDT', 
  timeframe = '1H',
  height = 400 
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Mock price data for demonstration
  const mockData = [
    { time: '00:00', price: 43250, volume: 1250 },
    { time: '01:00', price: 43180, volume: 980 },
    { time: '02:00', price: 43420, volume: 1450 },
    { time: '03:00', price: 43380, volume: 1120 },
    { time: '04:00', price: 43650, volume: 1680 },
    { time: '05:00', price: 43580, volume: 1340 },
    { time: '06:00', price: 43720, volume: 1520 },
    { time: '07:00', price: 43850, volume: 1780 },
    { time: '08:00', price: 43920, volume: 1420 },
    { time: '09:00', price: 44100, volume: 1950 },
    { time: '10:00', price: 44050, volume: 1650 },
    { time: '11:00', price: 44200, volume: 1820 },
  ];

  const currentPrice = mockData[mockData.length - 1].price;
  const previousPrice = mockData[mockData.length - 2].price;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100);

  const maxPrice = Math.max(...mockData.map(d => d.price));
  const minPrice = Math.min(...mockData.map(d => d.price));
  const priceRange = maxPrice - minPrice;

  return (
    <div className="bg-[#111111] rounded-2xl border border-gray-800 p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">{symbol}</h3>
            <span className="text-gray-400 text-sm">{timeframe}</span>
          </div>
          <div className="flex items-center gap-2">
            {priceChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className={`font-medium ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${currentPrice.toLocaleString()}
            </span>
            <span className={`text-sm ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex items-center gap-1 bg-[#0a0a0a] rounded-lg p-1">
          {['1M', '5M', '15M', '1H', '4H', '1D'].map((tf) => (
            <button
              key={tf}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                tf === timeframe
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative" style={{ height: `${height}px` }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#1f2937" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Price Line */}
          <path
            d={mockData.map((point, index) => {
              const x = (index / (mockData.length - 1)) * 100;
              const y = ((maxPrice - point.price) / priceRange) * 80 + 10;
              return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`;
            }).join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          
          {/* Area Fill */}
          <path
            d={`${mockData.map((point, index) => {
              const x = (index / (mockData.length - 1)) * 100;
              const y = ((maxPrice - point.price) / priceRange) * 80 + 10;
              return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`;
            }).join(' ')} L 100% 90% L 0% 90% Z`}
            fill="url(#gradient)"
            opacity="0.1"
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          {/* Data Points */}
          {mockData.map((point, index) => {
            const x = (index / (mockData.length - 1)) * 100;
            const y = ((maxPrice - point.price) / priceRange) * 80 + 10;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r="3"
                fill="#3b82f6"
                className="opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <title>{`${point.time}: $${point.price.toLocaleString()}`}</title>
              </circle>
            );
          })}
        </svg>
        
        {/* Price Labels */}
        <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-2">
          <span>${maxPrice.toLocaleString()}</span>
          <span>${((maxPrice + minPrice) / 2).toLocaleString()}</span>
          <span>${minPrice.toLocaleString()}</span>
        </div>
        
        {/* Time Labels */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 pt-2">
          <span>{mockData[0].time}</span>
          <span>{mockData[Math.floor(mockData.length / 2)].time}</span>
          <span>{mockData[mockData.length - 1].time}</span>
        </div>
      </div>

      {/* Chart Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-800">
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">24h High</div>
          <div className="text-sm font-medium text-white">${maxPrice.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">24h Low</div>
          <div className="text-sm font-medium text-white">${minPrice.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Volume</div>
          <div className="text-sm font-medium text-white">1.2M</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Market Cap</div>
          <div className="text-sm font-medium text-white">$847B</div>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;