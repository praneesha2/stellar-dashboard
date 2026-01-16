import { ChevronDown } from "lucide-react";

interface AreaChartProps {
  title: string;
  timeRange?: string;
}

export function AreaChart({ title, timeRange = "Last 7 days" }: AreaChartProps) {
  // Mock data points for the chart
  const dataPoints = [20, 35, 25, 45, 40, 55, 65, 60, 75, 70, 85];
  const maxValue = 100;
  const width = 100;
  const height = 100;
  
  // Generate SVG path
  const points = dataPoints.map((value, index) => {
    const x = (index / (dataPoints.length - 1)) * width;
    const y = height - (value / maxValue) * height;
    return `${x},${y}`;
  }).join(" L ");

  const pathD = `M 0,${height} L ${points} L ${width},${height} Z`;
  const lineD = `M ${points}`;

  return (
    <div className="glass squircle-sm p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          {title}
        </h3>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-muted-foreground">
          {timeRange}
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="relative h-[200px]">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[100, 75, 50, 25, 0].map((value) => (
            <div key={value} className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-6">{value}%</span>
              <div className="flex-1 border-t border-white/5" />
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="absolute inset-0 pl-8">
          <svg 
            viewBox={`0 0 ${width} ${height}`} 
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Gradient definition */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(211, 100%, 50%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(211, 100%, 50%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Area fill */}
            <path
              d={pathD}
              fill="url(#areaGradient)"
            />
            
            {/* Line */}
            <path
              d={lineD}
              fill="none"
              stroke="hsl(211, 100%, 50%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
