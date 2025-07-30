import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, User, BarChart3, Leaf } from "lucide-react";
import heroImage from "@/assets/dietbot-hero.jpg";

interface DietBotHeaderProps {
  userName?: string;
  sustainabilityScore: number;
}

export const DietBotHeader = ({ userName = "Eco Warrior", sustainabilityScore }: DietBotHeaderProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-success text-success-foreground";
    if (score >= 60) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <div className="relative bg-gradient-natural border-b border-border">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-earth flex items-center justify-center shadow-elevated">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-earth bg-clip-text text-transparent">
                DietBot
              </h1>
              <p className="text-sm text-muted-foreground">
                Your Sustainable Food AI Assistant
              </p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* User Info & Score */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium">Welcome back, {userName}!</p>
            <p className="text-sm text-muted-foreground">
              Ready to make sustainable food choices today?
            </p>
          </div>
          
          <Badge 
            className={`px-3 py-1 ${getScoreColor(sustainabilityScore)}`}
          >
            Eco Score: {sustainabilityScore}/100
          </Badge>
        </div>
      </div>
    </div>
  );
};