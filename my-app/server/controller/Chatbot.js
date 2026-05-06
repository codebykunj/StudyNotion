const Course = require("../models/Course");

/**
 * AI Chatbot controller using Google Gemini API.
 * 
 * The student sends a message + optional courseId.
 * We build a context-aware system prompt using the course details,
 * then send it to Gemini and return the reply.
 */
exports.chat = async (req, res) => {
    try {
        const { message, courseId, history = [] } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        const apiKey = process.env.GEMINI_API_KEY?.trim();
        if (!apiKey || apiKey === "AIzaSyD-fDKjjW7q-LCIBz-Idn1QqPIRwwRVE-k") {
            return res.status(400).json({
                success: false,
                message: "⚠️ **API Key is missing!**\n\nPlease get your free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) and paste it into the `server/.env` file as `GEMINI_API_KEY`.",
            });
        }

        // Build context from course if courseId provided
        let courseContext = "";
        if (courseId) {
            try {
                const course = await Course.findById(courseId)
                    .select("courseName courseDescription whatYouWillLearn category tag")
                    .populate("category", "name");
                if (course) {
                    courseContext = `
The student is currently studying the course: "${course.courseName}".
Course description: ${course.courseDescription}
What they will learn: ${course.whatYouWillLearn}
Category: ${course.category?.name || ""}
Tags: ${course.tag?.join(", ") || ""}
`;
                }
            } catch (err) {
                console.log("Could not load course context:", err.message);
            }
        }

        // System prompt
        const systemInstruction = `You are StudyBro, a helpful AI tutor assistant for StudyNotion, an online learning platform.
Your role is to help students learn effectively.
${courseContext}
Guidelines:
- Be encouraging, clear, and concise.
- Answer questions related to the course topics.
- If asked something outside the course scope, still help with general educational questions.
- Use simple language; break down complex topics step by step.
- Keep responses under 300 words unless a detailed explanation is needed.
- Use bullet points and numbered lists when listing steps or concepts.
- Do NOT answer questions unrelated to education or learning.`;

        // Build conversation history for multi-turn
        const contents = [];

        // Add history (max last 10 messages to save tokens)
        const recentHistory = history.slice(-10);
        for (const h of recentHistory) {
            contents.push({ role: h.role, parts: [{ text: h.text }] });
        }

        // Add current user message
        contents.push({ role: "user", parts: [{ text: message }] });

        // Call Gemini API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: systemInstruction }] },
                    contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 512,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            console.log("Gemini API error:", errText);
            return res.status(500).json({
                success: false,
                message: "Failed to get response from AI. Please try again.",
            });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response. Please try again.";

        return res.status(200).json({
            success: true,
            reply,
        });
    } catch (error) {
        console.log("Chatbot error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Chatbot service error. Please try again.",
            error: error.message,
        });
    }
};
