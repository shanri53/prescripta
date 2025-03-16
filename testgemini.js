require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testAI() {
    try {
        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-001" }); // ✅ Correct model name
        const response = await model.generateContent(["What is a prescription?"]);
        console.log("✅ AI Response:", response.response.text());
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

testAI();
