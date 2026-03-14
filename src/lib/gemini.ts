import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnalysisResult, Language } from './types';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeImagesInternal(
  faceBase64: string,
  veinBase64: string,
  lang: Language
): Promise<AnalysisResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }

  // Using the widely available, fast, and multimodal gemini-2.5-flash model
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  // Convert base64 strings to Gemini's expected format
  const facePart = {
    inlineData: {
      data: faceBase64.split(',')[1] || faceBase64,
      mimeType: 'image/jpeg', // Defaulting to jpeg, could extract from base64 header if needed
    },
  };

  const veinPart = {
    inlineData: {
      data: veinBase64.split(',')[1] || veinBase64,
      mimeType: 'image/jpeg',
    },
  };

  const langString = lang === 'tr' ? 'Turkish' : 'English';

  const prompt = `
You are an elite, world-class Color Analyst and Master Stylist.
I am providing two images of a client:
1. A front-facing selfie (to analyze face shape, features, and contrast).
2. A photo of their inner wrist veins (to analyze skin undertone).

Your job is to provide a complete "12-Season Color Analysis" and a personalized styling guide based on these images.

Analyze the following:
- Face Shape (oval, round, square, heart, diamond, oblong, triangle).
- Skin Undertone based on the veins and overall complexion (cool, warm, neutral).
- The 12-season color palette they belong to (e.g., Cool Summer, Warm Autumn, Bright Spring).

CRITICAL REQUIREMENT:
You MUST return your ENTIRE response as a valid JSON object. 
Do NOT include any markdown formatting like \`\`\`json. 
Do NOT write any introductory or concluding text outside the JSON.
The JSON must perfectly match this TypeScript interface:

export type Undertone = 'cool' | 'warm' | 'neutral';
export type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'oblong' | 'triangle';

export interface ColorDetail {
  hex: string;
  name: string;
  reason: string;
  combinations: string;
}

export interface StylingDetail {
  name: string;
  reason: string;
  changes: string;
}

export interface AnalysisResult {
  imageUrl: null;
  undertone: Undertone;
  faceShape: FaceShape;
  colorPalette: {
    season: string;
    description: string;
    bestColors: ColorDetail[]; // Provide exactly 5 distinct and beautiful colors
    avoidColors: ColorDetail[]; // Provide exactly 4 colors to avoid
    makeup: {
      foundation: string;
      blush: string;
      eyeshadow: string;
      lipstick: string;
    };
    metals: string[];
  };
  styling: {
    haircuts: StylingDetail[]; // Provide 3 specific haircut styles
    haircutAvoid: string[]; // Provide 2 styles to avoid
    glasses: StylingDetail[]; // Provide 3 glasses frame styles
    glassesAvoid: string[]; // Provide 2 absolute frames to avoid
    hairColors: ColorDetail[]; // Provide 3 specific hair colors that match the season
  };
}

All textual descriptions, reasons, combinations, and names inside the JSON MUST be written in ${langString}.
Ensure hex codes are valid 6-character hex colors starting with #.
`;

  try {
    const result = await model.generateContent([prompt, facePart, veinPart]);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting from Gemini's response
    const jsonString = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();
    
    let parsedData: AnalysisResult;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse Gemini output as JSON:", jsonString);
      throw new Error("AI returned invalid JSON.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
