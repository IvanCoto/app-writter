import Prompt from "../model/prompt";
import Story from "../model/story";
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

/*
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
*/
export const createPrompt = async (req, res, next) => {
    try {
        const { contentType, title, characters, tone, category, switchAutoTitle, switchAutoCharacters, switchAutoTone, switchAutoCategory } = req.body;

        // Lógica para determinar si el campo es automático o manual
        const titleInput = switchAutoTitle === "true" ? "Generar Titulo Automático" : title;
        const charactersInput = switchAutoCharacters === "true" ? "Generar Personajes Automático" : characters;
        const toneInput = switchAutoTone === "true" ? "Generar Tono Automático" : tone;
        const categoryInput = switchAutoCategory === "true" ? "Generar Categoría Automático" : category;

        const prompt = new Prompt({
            contentType: contentType,
            title: titleInput,
            characters: charactersInput,
            tone: toneInput,
            category: categoryInput,
        });

        await prompt.save();

        // Genera la historia
        const story = await generateStory({
            contentType: contentType,
            title: titleInput,
            characters: charactersInput,
            tone: toneInput,
            category: categoryInput,
        });

        // Renderiza la vista con la historia generada
        res.render("prompts", { story });

    } catch (error) {
        console.error(error);
        res.render("error", { errorMessage: error.message });
    }
};

async function generateStory({ contentType, title, characters, tone, category }) {
    try {
        const response = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Eres un exelente escritor." },
                { role: "user", content: `Crea un ${contentType} con titulo: ${title} con los personajes: ${characters}, tono de la historia: ${tone}, y la categoria: ${category}. Cuando indica "Automatico" quiere decir que le genere ese campo con autoria propia` },
            ],
            model: "gpt-3.5-turbo",
        });

        const story = new Story({
            content: response.choices[0].message.content.trim(),
        });

        await story.save();

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error al generar la historia:', error);
        throw error;
    }
}