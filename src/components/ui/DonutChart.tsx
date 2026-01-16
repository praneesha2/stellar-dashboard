interface DonutChartProps {
  segments: { value: number; color: string; label: string }[];
  centerText: string;
  centerSubtext?: string;
  size?: number;
}

export function DonutChart({ 
  segments, 
  centerText, 
  centerSubtext,
  size = 180 
}: DonutChartProps) {
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let accumulatedOffset = 0;

  return (
    <div className="flex items-center justify-center gap-8">
      <div className="relative" style={{ width: size, height: size }}>
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(0 0% 100% / 0.05)"
            strokeWidth={strokeWidth}
          />
          
          {/* Segments */}
          {segments.map((segment, index) => {
            const segmentLength = (segment.value / 100) * circumference;
            const dashOffset = circumference - accumulatedOffset;
            accumulatedOffset += segmentLength;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{centerText}</span>
          {centerSubtext && (
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {centerSubtext}
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-sm text-muted-foreground">
              {segment.label}
            </span>
            <span className="text-sm font-medium text-white">
              {segment.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
