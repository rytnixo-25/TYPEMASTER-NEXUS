import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
);

export const generateParagraph = async () => {

    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
        });

        const result = await model.generateContent(
            "Generate a typing practice paragraph of about 80 words. Use clear English. No title. No bullet points."
        );

        return result.response.text();

    } catch (error) {

        console.log(error);

        return "Failed to generate text.";

    }

};