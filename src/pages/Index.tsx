import { useState, useRef, useEffect } from "react";
import { DietBotHeader } from "@/components/DietBotHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { CarbonTracker } from "@/components/CarbonTracker";
import { useDietBot } from "@/hooks/useDietBot";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { messages, isLoading, sendMessage } = useDietBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock user data
  const [userData] = useState({
    name: "Alex",
    sustainabilityScore: 78,
    dailyGoal: 2000,
    currentImpact: 1650,
    weeklyTrend: -12,
    streak: 5
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <DietBotHeader 
        userName={userData.name}
        sustainabilityScore={userData.sustainabilityScore}
      />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  carbonImpact={message.carbonImpact}
                  suggestions={message.suggestions}
                  recipe={message.recipe}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-chat-bot text-chat-bot-foreground rounded-2xl px-4 py-3 max-w-[80%] animate-pulse">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Chat Input */}
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-muted/30 border-l border-border p-4 hidden lg:block">
          <div className="space-y-6">
            <CarbonTracker
              dailyGoal={userData.dailyGoal}
              currentImpact={userData.currentImpact}
              weeklyTrend={userData.weeklyTrend}
              streak={userData.streak}
            />
            
            {/* Quick Stats */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Today's Impact</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-card p-3 rounded-lg">
                  <p className="text-muted-foreground">Meals Logged</p>
                  <p className="font-semibold">3</p>
                </div>
                <div className="bg-card p-3 rounded-lg">
                  <p className="text-muted-foreground">CO2 Saved</p>
                  <p className="font-semibold text-success">450g</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
