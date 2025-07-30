import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const quickActions = [
    "Calculate carbon footprint of my breakfast",
    "Suggest plant-based alternatives for chicken",
    "Give me a low-carbon dinner recipe",
    "What's the impact of eating beef vs. beans?"
  ];

  return (
    <div className="border-t border-border bg-background p-4 space-y-3">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSendMessage(action)}
            disabled={isLoading}
            className="text-xs hover:bg-accent hover:text-accent-foreground transition-natural"
          >
            {action}
          </Button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={isLoading}
          className="shrink-0"
        >
          <Camera className="w-4 h-4" />
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={isLoading}
          className="shrink-0"
        >
          <Mic className="w-4 h-4" />
        </Button>

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about sustainable food choices..."
          disabled={isLoading}
          className="flex-1 bg-muted border-0 focus:ring-2 focus:ring-primary transition-natural"
        />

        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={cn(
            "shrink-0 bg-gradient-earth hover:shadow-elevated transition-natural",
            isLoading && "animate-pulse"
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};