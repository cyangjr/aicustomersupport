import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt =
  "You are an AI-powwered chatbot for Headstarter AI and you are here to help with any questions you have. Ask me anything!";

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...data,
    ],
    model: "gpt-4o-mini",
    stream: true,
  });
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for (const chunk of completion.stream) {
          const content = chunk.choices[0].delta.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
  return new NextResponse(stream)
}
