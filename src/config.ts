import dotenv from "dotenv";

dotenv.config();

export const { PORT = 3001 } = process.env;
export const { TOKEN_COOKIE_NAME = "jwt" } = process.env;
export const { APP_CORS_ORIGIN = "https://places.ivanjsx.com" } = process.env;
export const { MONGODB_URI = "mongodb://localhost:27017/mestodb" } = process.env;
export const { JWT_SECRET_KEY = "yes-i-do-masturbate-to-my-own-code" } = process.env;
