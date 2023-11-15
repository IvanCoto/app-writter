import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://webUser:webUser@cluster1.ay4kowr.mongodb.net/writter";
