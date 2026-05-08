import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Khởi tạo Google AI với Key bạn đã dán trên Vercel
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { message?: string };
    const userMessage = body.message?.trim() ?? "";

    if (!userMessage) {
      return NextResponse.json({ reply: "Vui lòng nhập tin nhắn." }, { status: 400 });
    }

    // Gọi model Gemini 1.5 Flash (nhanh và miễn phí)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Thiết lập ngữ cảnh để AI biết nó là ai và phải nói tiếng gì
    const prompt = `Bạn là Jason AI, một trợ lý phân tích tài chính thông minh và thân thiện. 
    Hãy trả lời câu hỏi sau của người dùng bằng tiếng Việt một cách chuyên nghiệp: ${userMessage}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      reply: text
    });

  } catch (error) {
    console.error("Lỗi AI:", error);
    return NextResponse.json(
      { reply: "Hệ thống AI đang bận, Jason vui lòng thử lại sau nhé!" },
      { status: 500 }
    );
  }
}