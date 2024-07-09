import { rateLimit } from "express-rate-limit";

const rateLimiter = rateLimit({
	limit: 100,
	windowMs: 1000 * 60 * 15,
	standardHeaders: true,
	legacyHeaders: false
});

export default rateLimiter;
