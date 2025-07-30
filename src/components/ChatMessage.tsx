import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, TrendingDown, ChefHat, Lightbulb } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  carbonImpact?: number;
  suggestions?: string[];
  recipe?: {
    name: string;
    carbonSaved: number;
    difficulty: string;
  };
}

export const ChatMessage = ({ 
  message, 
  isUser, 
  timestamp, 
  carbonImpact, 
  suggestions, 
  recipe 
}: ChatMessageProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={cn(
      "flex w-full mb-6 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-natural transition-natural",
        isUser 
          ? "bg-chat-user text-chat-user-foreground ml-4" 
          : "bg-chat-bot text-chat-bot-foreground mr-4"
      )}>
        {/* Avatar */}
        <div className={cn(
          "flex items-center gap-3 mb-2",
          isUser ? "justify-end" : "justify-start"
        )}>
          {!isUser && (
            <div className="w-8 h-8 rounded-full bg-gradient-earth flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
          )}
          <span className="text-sm font-medium">
            {isUser ? "You" : "DietBot"}
          </span>
          {isUser && (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">You</span>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{message}</p>

          {/* Carbon Impact */}
          {carbonImpact !== undefined && (
            <div className="flex items-center gap-2 p-3 bg-gradient-impact rounded-lg">
              <TrendingDown className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Carbon Impact: {carbonImpact}g CO2
              </span>
            </div>
          )}

          {/* Suggestions */}
          {suggestions && suggestions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Suggestions:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground transition-natural"
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Recipe Card */}
          {recipe && (
            <div className="p-3 bg-card border border-border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">{recipe.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Difficulty: {recipe.difficulty}</span>
                <span className="text-success font-medium">
                  Saves {recipe.carbonSaved}g CO2
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className={cn(
          "text-xs opacity-60 mt-2",
          isUser ? "text-right" : "text-left"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};