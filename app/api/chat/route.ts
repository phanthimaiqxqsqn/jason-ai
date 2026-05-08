import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// CHUYỂN SANG EDGE RUNTIME CHO CLOUDFLARE
export const runtime = 'edge'; 
export const dynamic = 'force-dynamic';

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { message?: string };
    const userMessage = body.message?.trim() ?? "";

    if (!userMessage) {
      return NextResponse.json({ reply: "Vui lòng nhập tin nhắn." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Bạn là Jason AI, một trợ lý phân tích tài chính thông minh và thân thiện. 
    Hãy trả lời bằng tiếng Việt chuyên nghiệp: ${userMessage}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Lỗi AI cụ thể:", error);
    return NextResponse.json(
      { reply: "Hệ thống AI đang bận, thử lại sau nhé!" },
      { status: 500 }
    );
  }
}
