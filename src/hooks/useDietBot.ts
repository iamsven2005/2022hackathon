import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
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

interface UserPreferences {
  dietaryRestrictions: string[];
  favoriteIngredients: string[];
  sustainabilityGoals: string;
  dailyCarbonTarget: number;
}

export const useDietBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm DietBot, your sustainable food AI assistant. I'm here to help you make eco-friendly food choices, suggest plant-based alternatives, and track your carbon footprint. What would you like to know about sustainable eating today?",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "Show me plant-based protein options",
        "Calculate my breakfast carbon footprint",
        "Suggest a low-carbon dinner recipe",
        "Compare meat vs. plant alternatives"
      ]
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    dietaryRestrictions: [],
    favoriteIngredients: [],
    sustainabilityGoals: 'Reduce carbon footprint by 30%',
    dailyCarbonTarget: 2000 // grams CO2
  });
  
  const { toast } = useToast();

  // Mock carbon footprint calculation
  const calculateCarbonFootprint = useCallback((food: string): number => {
    const carbonData: Record<string, number> = {
      'beef': 60000,     // 60kg CO2 per kg
      'lamb': 24000,     // 24kg CO2 per kg
      'cheese': 21000,   // 21kg CO2 per kg
      'pork': 12000,     // 12kg CO2 per kg
      'chicken': 6900,   // 6.9kg CO2 per kg
      'fish': 5400,      // 5.4kg CO2 per kg
      'eggs': 4800,      // 4.8kg CO2 per kg
      'tofu': 2000,      // 2kg CO2 per kg
      'beans': 800,      // 0.8kg CO2 per kg
      'lentils': 900,    // 0.9kg CO2 per kg
      'vegetables': 500, // 0.5kg CO2 per kg
      'rice': 2700,      // 2.7kg CO2 per kg
      'pasta': 1700,     // 1.7kg CO2 per kg
    };

    const foodLower = food.toLowerCase();
    for (const [key, value] of Object.entries(carbonData)) {
      if (foodLower.includes(key)) {
        return Math.round(value / 10); // Convert to grams and assume 100g portion
      }
    }
    return 300; // Default value for unknown foods
  }, []);

  // Mock plant-based suggestions
  const getPlantBasedAlternatives = useCallback((food: string): string[] => {
    const alternatives: Record<string, string[]> = {
      'beef': ['Beyond Burger', 'Black bean burger', 'Mushroom steak', 'Lentil bolognese'],
      'chicken': ['Tofu strips', 'Tempeh', 'Seitan chicken', 'Cauliflower wings'],
      'pork': ['Jackfruit carnitas', 'Mushroom bacon', 'Tempeh bacon', 'Plant sausage'],
      'fish': ['Banana blossom fish', 'Hearts of palm', 'Mushroom scallops', 'Tofu fish'],
      'cheese': ['Cashew cheese', 'Nutritional yeast', 'Almond cheese', 'Coconut cheese'],
      'milk': ['Oat milk', 'Almond milk', 'Soy milk', 'Coconut milk'],
    };

    const foodLower = food.toLowerCase();
    for (const [key, value] of Object.entries(alternatives)) {
      if (foodLower.includes(key)) {
        return value;
      }
    }
    return ['Try more vegetables', 'Consider legumes', 'Explore plant proteins', 'Add whole grains'];
  }, []);

  // Mock recipe generation
  const generateRecipe = useCallback((preferences: string[]): any => {
    const recipes = [
      {
        name: "Rainbow Buddha Bowl",
        carbonSaved: 850,
        difficulty: "Easy",
        ingredients: ["quinoa", "chickpeas", "sweet potato", "kale", "avocado"],
        cookTime: "30 minutes"
      },
      {
        name: "Lentil Walnut Bolognese",
        carbonSaved: 1200,
        difficulty: "Medium",
        ingredients: ["green lentils", "walnuts", "tomatoes", "whole grain pasta"],
        cookTime: "45 minutes"
      },
      {
        name: "Stuffed Bell Peppers",
        carbonSaved: 700,
        difficulty: "Easy",
        ingredients: ["bell peppers", "black beans", "brown rice", "corn"],
        cookTime: "35 minutes"
      }
    ];
    
    return recipes[Math.floor(Math.random() * recipes.length)];
  }, []);

  // Simulate AI response
  const generateAIResponse = useCallback(async (userMessage: string): Promise<Partial<Message>> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const messageLower = userMessage.toLowerCase();
    
    // Carbon footprint calculation
    if (messageLower.includes('carbon') || messageLower.includes('footprint')) {
      const foods = ['chicken', 'beef', 'rice', 'vegetables'];
      const detectedFood = foods.find(food => messageLower.includes(food)) || 'mixed meal';
      const carbonImpact = calculateCarbonFootprint(detectedFood);
      
      return {
        content: `Based on your meal description, I estimate a carbon footprint of approximately ${carbonImpact}g CO2. ${carbonImpact > 1000 ? 'Consider switching to plant-based alternatives to reduce your environmental impact!' : 'Great choice! This is a relatively low-carbon meal.'}`,
        carbonImpact,
        suggestions: carbonImpact > 1000 ? getPlantBasedAlternatives(detectedFood) : ['Keep up the sustainable eating!', 'Try adding more vegetables', 'Consider organic options']
      };
    }
    
    // Plant-based alternatives
    if (messageLower.includes('alternative') || messageLower.includes('swap') || messageLower.includes('plant')) {
      const foods = ['beef', 'chicken', 'pork', 'fish', 'cheese'];
      const detectedFood = foods.find(food => messageLower.includes(food)) || 'meat';
      const alternatives = getPlantBasedAlternatives(detectedFood);
      
      return {
        content: `Here are some delicious plant-based alternatives to ${detectedFood}. These options can significantly reduce your carbon footprint while providing excellent nutrition!`,
        suggestions: alternatives,
        carbonImpact: calculateCarbonFootprint(detectedFood)
      };
    }
    
    // Recipe suggestions
    if (messageLower.includes('recipe') || messageLower.includes('cook') || messageLower.includes('meal')) {
      const recipe = generateRecipe([]);
      
      return {
        content: `I've found a perfect sustainable recipe for you! This ${recipe.name} is not only delicious but also saves ${recipe.carbonSaved}g of CO2 compared to a typical meat-based meal.`,
        recipe,
        suggestions: ['Get full recipe details', 'Find similar recipes', 'Calculate nutrition info', 'Add to meal plan']
      };
    }
    
    // General response
    return {
      content: "I'm here to help you make sustainable food choices! I can calculate carbon footprints, suggest plant-based alternatives, recommend eco-friendly recipes, and track your environmental impact. What specific aspect of sustainable eating would you like to explore?",
      suggestions: [
        'Calculate carbon footprint of a meal',
        'Find plant-based protein sources',
        'Get a low-carbon recipe',
        'Learn about seasonal eating'
      ]
    };
  }, [calculateCarbonFootprint, getPlantBasedAlternatives, generateRecipe]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content || "I'm here to help with sustainable eating!",
        isUser: false,
        timestamp: new Date(),
        carbonImpact: aiResponse.carbonImpact,
        suggestions: aiResponse.suggestions,
        recipe: aiResponse.recipe,
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (aiResponse.carbonImpact && aiResponse.carbonImpact > 1500) {
        toast({
          title: "High Carbon Impact Detected",
          description: `This meal has ${aiResponse.carbonImpact}g CO2. Consider plant-based alternatives!`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [generateAIResponse, toast]);

  return {
    messages,
    isLoading,
    sendMessage,
    userPreferences,
    setUserPreferences,
  };
};