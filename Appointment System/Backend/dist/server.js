"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require("./Config/Database");
const cors_1 = __importDefault(require("cors"));
const port = process.env.PORT || 3000;
// Import Routes
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const doctorPanelRoutes_1 = __importDefault(require("./Routes/doctorPanelRoutes"));
const adminRoutes_1 = __importDefault(require("./Routes/adminRoutes"));
const patientRoutes_1 = __importDefault(require("./Routes/patientRoutes"));
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("Doctor Appointment System");
});
// Routes
app.use("/api/auth", userRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/doctor", doctorPanelRoutes_1.default);
app.use("/api/patient", patientRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map