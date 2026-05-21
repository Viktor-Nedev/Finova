import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type Intent = "generate_quiz" | "tutor" | "scam_detector";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function parseJson(content: string) {
  const cleaned = content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned);
}

async function callOpenAi(messages: { role: "system" | "user"; content: string }[]) {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-4o-mini";

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.45,
      response_format: { type: "json_object" },
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI request failed: ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI returned an empty message");
  }

  return parseJson(content);
}

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const { intent, payload } = (await request.json()) as {
      intent: Intent;
      payload: Record<string, string>;
    };

    if (intent === "generate_quiz") {
      const topic = payload.topic ?? "personal finance";
      const difficulty = payload.difficulty ?? "Beginner";
      const result = await callOpenAi([
        {
          role: "system",
          content:
            "You create safe, accurate beginner financial literacy quizzes for students. Respond only with valid JSON.",
        },
        {
          role: "user",
          content: `Generate 5 multiple choice questions about ${topic} for ${difficulty.toLowerCase()} financial literacy students. Include correct answers. Return JSON shaped exactly as {"questions":[{"question":"...","options":["...","...","...","..."],"correctAnswer":"...","explanation":"..."}]}. Each correctAnswer must match one option exactly.`,
        },
      ]);

      return jsonResponse(result);
    }

    if (intent === "tutor") {
      const topic = payload.topic ?? "money";
      const result = await callOpenAi([
        {
          role: "system",
          content:
            "You are Finova, a friendly but precise AI financial literacy tutor for students. Keep advice educational and age appropriate. Respond only with valid JSON.",
        },
        {
          role: "user",
          content: `Explain ${topic} in a simple way for a 15 year old. Include a real life example and one short practice question. Return JSON shaped exactly as {"simpleExplanation":"...","realLifeExample":"...","miniExercise":"..."}.`,
        },
      ]);

      return jsonResponse(result);
    }

    if (intent === "scam_detector") {
      const text = payload.text ?? "";
      const result = await callOpenAi([
        {
          role: "system",
          content:
            "You analyze potentially suspicious financial messages for educational scam awareness. Do not claim certainty. Respond only with valid JSON.",
        },
        {
          role: "user",
          content: `Analyze this message for scam risk: ${text}. Return JSON shaped exactly as {"riskLevel":"Low|Medium|High","verdict":"...","redFlags":["..."],"saferAction":"..."}.`,
        },
      ]);

      return jsonResponse(result);
    }

    return jsonResponse({ error: "Unknown intent" }, 400);
  } catch (error) {
    return jsonResponse(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
});
