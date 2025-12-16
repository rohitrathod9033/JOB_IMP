import express from "express";
const app = express();
import "./Config/Database";
import cors from "cors";
const port = process.env.PORT || 3000;

// Import Routes
import userRoutes from "./Routes/userRoutes";
import doctorPanelRoutes from "./Routes/doctorPanelRoutes";
import adminRoutes from "./Routes/adminRoutes";
import patientRoutes from "./Routes/patientRoutes";

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Doctor Appointment System");
});

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorPanelRoutes);
app.use("/api/patient", patientRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});