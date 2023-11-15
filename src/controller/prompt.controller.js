import Prompt from "../model/prompt";
require("dotenv").config();
const OpenAI = require("openai").OpenAI;


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

export const renderPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.find().lean();
        res.render("prompts", {
            prompts,
        });
    } catch (error) {
        console.log({ error });
        return res.render("error", { errorMessage: error.message });
    }
};

export const createPrompt = async (req, res, next) => {
    try {
        const { idea } = req.body;
        const prompt = new Prompt({ idea });
        await prompt.save();

        const story = await generateStory(idea);
        res.render("prompts", { story });

    } catch (error) {
        console.error(error);
        res.render("error", { errorMessage: error.message });
    }
};

async function generateStory(idea) {
    
    try {

        const response = await await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful writter." },
                { role: "user", content: `Create a story about: ${idea}` }
            ],
            model: "gpt-3.5-turbo",
        });

        return response.choices[0].message.content.trim();

    } catch (error) {
      console.error('Error al generar la historia:', error);
      throw error;
    }
}




