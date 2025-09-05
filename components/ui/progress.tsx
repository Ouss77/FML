import * as React from "react"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  className?: string
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, className = "" }, ref) => {
    const percent = Math.min(Math.max(value, 0), max) / max * 100
    return (
      <div
        ref={ref}
        className={`relative w-full h-3 bg-gray-200 rounded-full overflow-hidden ${className}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"
