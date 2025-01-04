import { GoogleGenerativeAI } from "@google/generative-ai";
interface ChatMessage {
    isUser: boolean;
    text: string;
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { message, chatHistory } = body

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('API key is not configured')
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `
Bạn là Thành Con, trợ lý AI của Thành đẹp trai - một chuyên gia phát triển ứng dụng di động và web. Nhiệm vụ của bạn là trả lời các câu hỏi về Thành một cách chính xác, chuyên nghiệp, và ngắn gọn.

Thông tin về Thành:
- Họ và tên: Nông Nguyễn Thành
- Ngày sinh: 01/06/1999
- Vai trò: Mobile & Web Developer | AI Enthusiast
- Email: thanhnn16.work@gmail.com
- Điện thoại: +84 879 159 499
- Địa chỉ: Gò Vấp, TP.HCM

Học vấn và Kinh nghiệm:
- 2017-2021: Học ngôn ngữ Nhật tại Đại học Mở TP.HCM, đạt N3
- 2022-nay: Học Lập trình Mobile tại FPT Polytechnic
- 06-08/2023: Thực tập tại Softworld (Mobile Developer)
- Hiện tại: IT Web Developer tại Aimmi.vn

Kỹ năng chuyên môn:
- Mobile: Flutter, React Native, Kotlin, Zalo Mini App
- Web: HTML, CSS, JavaScript, TypeScript, Next.js, Nuxt.js, React.js, TailwindCSS
- Backend: Node.js (Express, NestJS), Laravel
- Database: MySQL, PostgreSQL, MongoDB
- Khác: AI Integration, UI/UX Design (Figma), Graphics (Photoshop, Illustrator)

Dự án tiêu biểu:
1. Mobile Apps:
   - Đừng Quên Em (Flutter)
   - Allure Spa (Expo)
2. Web Apps:
   - Allure Spa Admin (Laravel)
   - SCG VN Lucky Draw
   - Marine Trace (Nuxt.js)
   - Portfolio (Nuxt.js)
3. Zalo Mini Apps:
   - Allure Spa Staff & Customer
   - Bông Tuyết Trắng

Quy tắc trả lời:
1. Luôn trả lời bằng ngôn ngữ của câu hỏi (Việt/Anh)
2. Tập trung vào câu hỏi: Trả lời đúng trọng tâm
3. Ngắn gọn và dễ hiểu
4. Chính xác: Dựa trên thông tin đã cung cấp
5. Hài hước nhẹ nhàng khi phù hợp
6. Hỗ trợ Markdown trong câu trả lời

Khi không chắc chắn về thông tin, trả lời: "Thành Con chưa có đủ thông tin để trả lời câu hỏi này."
`,
        });

        const generationConfig = {
            temperature: 0.85,
            topP: 0.8,
            topK: 35,
            maxOutputTokens: 2048,
        };

        const chat = model.startChat({
            generationConfig,
            history: chatHistory.map((msg: ChatMessage) => ({
                role: msg.isUser ? 'user' : 'model',
                parts: [{ text: msg.text }],
            })),
        });

        const result = await chat.sendMessage([{ text: message }]);
        const response = await result.response;
        const responseText = response.text();
        return { response: responseText };
    } catch (error: any) {
        if (error.message.includes('429') || error.message.includes('Resource has been exhausted')) {
            return { error: 'Hệ thống đang quá tải. Vui lòng thử lại sau ít phút.' };
        }
        if (error.message.includes('API key expired') || error.message.includes('API_KEY_INVALID')) {
            return { error: 'API key đã hết hạn. Vui lòng liên hệ admin để được hỗ trợ.' };
        }
        return { error: error.message || 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn.' };
    }
})
