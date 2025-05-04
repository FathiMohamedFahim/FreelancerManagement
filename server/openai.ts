import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "default_key" });

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Creates an AI response for the freelancer assistant
 * @param messages Array of messages with role and content
 * @returns The AI response as a string
 */
export async function createAIResponse(messages: ChatMessage[]): Promise<string> {
  try {
    // Add a system message if one doesn't exist
    if (!messages.some(msg => msg.role === 'system')) {
      messages.unshift({
        role: 'system',
        content: `You are an AI assistant for freelancers and creators using a project management platform. 
        Provide helpful, concise, and actionable advice on freelancing, project management, client relations, 
        time management, setting rates, and other freelance business topics. 
        Be friendly, professional, and focus on practical solutions. 
        If asked about something outside of freelancing scope, politely redirect to freelance-related topics.`
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || "I'm not sure how to respond to that. Could you try asking in a different way?";
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    
    // Provide a fallback response in case of API error
    return "I'm currently experiencing some technical difficulties. Please try again later.";
  }
}

/**
 * Analyzes project requirements and provides insights
 * @param projectDescription Description of the project
 * @returns Analysis with pricing, scope, and timeline suggestions
 */
export async function analyzeProject(projectDescription: string): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a project analysis expert for freelancers. Analyze project descriptions and provide insights on pricing, scope, timeline, and potential challenges."
        },
        {
          role: "user",
          content: `Please analyze this project description: ${projectDescription}`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error analyzing project:", error);
    return { error: "Failed to analyze project. Please try again later." };
  }
}

/**
 * Calculates optimal freelance rates based on input parameters
 * @param params Rate calculation parameters (experience, skills, project type)
 * @returns Suggested rates and rationale
 */
export async function calculateRates(params: any): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a freelance pricing expert. Calculate optimal rates for freelance services based on the provided parameters."
        },
        {
          role: "user",
          content: `Calculate rates based on these parameters: ${JSON.stringify(params)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error calculating rates:", error);
    return { error: "Failed to calculate rates. Please try again later." };
  }
}

/**
 * Estimates time needed for a project based on requirements
 * @param requirements Project requirements description
 * @returns Estimated time and breakdown
 */
export async function estimateTime(requirements: string): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a project time estimation expert for freelancers. Estimate time needed for projects based on requirements."
        },
        {
          role: "user",
          content: `Estimate time needed for this project: ${requirements}`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error estimating time:", error);
    return { error: "Failed to estimate time. Please try again later." };
  }
}
