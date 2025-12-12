import { GoogleGenAI } from "@google/genai";
import { UserProfile, WorkTask, TaskType } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-2.5-flash"; // Fast model for interactive UI

export const analyzeCareerPotential = async (profile: UserProfile): Promise<string> => {
  try {
    const prompt = `
      You are an expert HR consultant for the "Silver Economy". Analyze this elderly user profile:
      Name: ${profile.name}, Experience: ${profile.experienceYears} years.
      Skills: ${profile.skills.join(", ")}.
      Digital Literacy: ${profile.digitalLiteracyScore}/100.
      
      Suggest 2 specific "Silver+Agent" job roles where their human wisdom combines with AI speed.
      Keep it encouraging and brief (under 50 words).
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "无法生成建议，请稍后重试。";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "AI 服务当前正忙，请稍后重试。";
  }
};

export const decomposeTask = async (complexGoal: string): Promise<WorkTask[]> => {
  try {
    const prompt = `
      Break down the work goal: "${complexGoal}" into 4 actionable steps for an elderly worker collaborating with an AI Agent.
      Return strictly a JSON array.
      Format: [{"content": "string", "type": "HUMAN" | "AGENT"}]
      
      Rules:
      - "HUMAN" tasks involve judgment, empathy, decision making, or verify quality.
      - "AGENT" tasks involve data processing, drafting, searching, or calculation.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const tasks = JSON.parse(response.text || "[]");
    
    return tasks.map((t: any, index: number) => ({
      id: `gen-${Date.now()}-${index}`,
      content: t.content,
      type: t.type === 'HUMAN' ? TaskType.HUMAN : TaskType.AGENT,
      status: 'pending',
      timestamp: new Date().toLocaleTimeString()
    }));
  } catch (error) {
    console.error("Gemini Task Decomposition Error:", error);
    return [
      { id: 'err-1', content: '人工审核关键信息', type: TaskType.HUMAN, status: 'pending', timestamp: 'Now' },
      { id: 'err-2', content: 'AI 自动检索相关数据', type: TaskType.AGENT, status: 'pending', timestamp: 'Now' }
    ];
  }
};