import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Target, Leaf } from "lucide-react";

interface CarbonTrackerProps {
  dailyGoal: number;
  currentImpact: number;
  weeklyTrend: number;
  streak: number;
}

export const CarbonTracker = ({ 
  dailyGoal, 
  currentImpact, 
  weeklyTrend, 
  streak 
}: CarbonTrackerProps) => {
  const progressPercentage = Math.min((currentImpact / dailyGoal) * 100, 100);
  const isOnTrack = currentImpact <= dailyGoal;
  const remaining = Math.max(dailyGoal - currentImpact, 0);

  return (
    <Card className="p-6 bg-gradient-natural border-0 shadow-elevated">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-earth flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Daily Carbon Impact</h3>
              <p className="text-sm text-muted-foreground">
                Track your food footprint
              </p>
            </div>
          </div>
          
          <Badge 
            variant={isOnTrack ? "default" : "destructive"}
            className={isOnTrack ? "bg-success text-success-foreground" : ""}
          >
            {isOnTrack ? "On Track" : "Over Limit"}
          </Badge>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current: {currentImpact}g CO2</span>
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              Goal: {dailyGoal}g CO2
            </span>
          </div>
          
          <Progress 
            value={progressPercentage} 
            className="h-3"
          />
          
          {remaining > 0 && (
            <p className="text-sm text-success">
              {remaining}g CO2 remaining in your daily budget
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-card rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              {weeklyTrend > 0 ? (
                <TrendingUp className="w-4 h-4 text-warning" />
              ) : (
                <TrendingDown className="w-4 h-4 text-success" />
              )}
              <span className="text-xs text-muted-foreground">Weekly Trend</span>
            </div>
            <p className="font-semibold">
              {weeklyTrend > 0 ? '+' : ''}{weeklyTrend}%
            </p>
          </div>
          
          <div className="text-center p-3 bg-card rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Leaf className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Green Streak</span>
            </div>
            <p className="font-semibold">{streak} days</p>
          </div>
        </div>
      </div>
    </Card>
  );
};