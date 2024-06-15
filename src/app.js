"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const institutionRoutes_1 = __importDefault(require("./routes/institutionRoutes"));
const incidentRoutes_1 = __importDefault(require("./routes/incidentRoutes"));
// Determine the correct .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv_1.default.config({ path: envFile });
const app = (0, express_1.default)();
// Configure CORS to allow requests from your Vercel frontend
const allowedOrigins = ['https://edulogr.vercel.app', 'http://localhost:5173'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/institutions', institutionRoutes_1.default);
app.use('/api/incidents', incidentRoutes_1.default);
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
