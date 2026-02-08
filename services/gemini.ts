
import { UserInput, AnalysisResult } from "../types";

const HF_TOKEN = process.env.HF_TOKEN;

if (!HF_TOKEN) {
  throw new Error("HF_TOKEN environment variable not set");
}

const MODEL = "Qwen/Qwen2.5-72B-Instruct";

export const generateAuspiciousNames = async (input: UserInput): Promise<AnalysisResult> => {
  const systemPrompt = `You are a world-class Thai master of "Poyisi" (Bazi), Thai Phonology (Aksara-Kalaikini), and Numerology.
Analyze the destiny of the given person and provide an auspicious name transformation strategy.
Always respond with valid JSON only, no markdown, no explanation outside the JSON.`;

  const userPrompt = `Analyze the destiny of the following person and provide an auspicious name transformation strategy.

PERSONAL INFO:
- Name: ${input.fullName}
- Gender: ${input.gender}
- Occupation: ${input.occupation}
- DOB: ${input.birthDate} (${input.birthDayOfWeek})
- Time: ${input.isTimeUnknown ? 'Unknown Time' : input.birthTime}
- Zodiac: ${input.zodiac}
- Birth Place: ${input.birthPlace}
- Life Goals: ${input.lifeGoals.join(', ')}
- Urgent Problems: ${input.urgentProblems.join(', ')}
- Desired Name Style: ${input.nameStyle.join(', ')}

REQUIREMENTS:
1. Identify the current "Dominant Element" and the "Needed Element" based on Bazi/Poyisi principles. Use Thai: ไม้, ไฟ, ดิน, ทอง, น้ำ
2. Evaluate the "Current Name Score" (0-100).
3. Provide a realistic "Current Name Analysis". Weave their specific problems and goals into the story.
4. Calculate "Auspicious Potential" (0-100).
5. Describe the "Naming Concept" focusing on balancing elements and styles.
6. Describe the "Potential Result" after adopting the new names.
7. Generate exactly 20 Real Names and 20 Nicknames. CRITICAL DIVERSITY RULES:
   - Each name MUST start with a DIFFERENT Thai consonant (no two names share the same first letter)
   - Mix short names (1-2 syllables) and long names (3-4 syllables) roughly equally
   - Use varied name roots: avoid repeating the same prefix or suffix more than once
   - Draw from diverse Thai name traditions: Sanskrit-origin, Pali-origin, pure Thai, royal-style, modern-Thai
   - Each name must sound distinctly different from all others in the list
8. Avoid 'Kalaikini' letters for their birth day.

Return ONLY valid JSON with this exact structure:
{
  "dominantElement": "string (Thai element name)",
  "neededElement": "string (Thai element name)",
  "currentTraits": "string",
  "currentNameScore": number,
  "currentNameAnalysis": "string",
  "auspiciousPotential": number,
  "potentialResult": "string",
  "namingConcept": "string",
  "realNames": [{"thai": "string", "english": "string", "meaning": "string", "numerologySum": number}],
  "nickNames": [{"thai": "string", "english": "string", "meaning": "string", "numerologySum": number}]
}`;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 1.2,
        max_tokens: 8192,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error("API key ไม่ถูกต้อง กรุณาตรวจสอบ HF_TOKEN ใน .env.local");
      }
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from AI");
    }

    // Extract JSON if wrapped in markdown code blocks
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : content;

    return JSON.parse(jsonStr) as AnalysisResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`เกิดข้อผิดพลาด: ${error.message}`);
    }
    throw new Error("AI ขัดข้อง กรุณาลองใหม่อีกครั้ง");
  }
};
