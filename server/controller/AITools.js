const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateQuizAndFlashcards = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ success: false, message: "Text content is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `
        Analyze the following text and generate:
        1. 5 Multiple Choice Questions (MCQs) with 4 options each, and indicate the correct answer.
        2. 5 Flashcards (Front/Back pairs) representing key concepts.
        
        Format the response strictly as a JSON object with this exact structure:
        {
          "mcqs": [
            {
              "question": "...",
              "options": ["...", "...", "...", "..."],
              "answer": "..."
            }
          ],
          "flashcards": [
            {
              "front": "...",
              "back": "..."
            }
          ]
        }
        
        Do not wrap the JSON in Markdown formatting like \`\`\`json. Return only raw JSON.
        
        Text to analyze:
        ${text}
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        let generatedText = response.text();
        
        // Clean up any markdown json formatting if Gemini still includes it
        generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const parsedData = JSON.parse(generatedText);

        return res.status(200).json({
            success: true,
            data: parsedData,
            message: "Content generated successfully"
        });

    } catch (error) {
        console.error("Error generating AI content:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate AI content",
            error: error.message
        });
    }
};
