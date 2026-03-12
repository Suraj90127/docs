import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from "path";
import { connectDB } from './config/db.js';
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import adminRoutes from './routes/adminRoute.js';
import resultRoutes from "./routes/resultRoutes.js";
import updateResultRoute from "./routes/updateResultRoute.js";
import cricketRoutes from "./routes/cricketRoutes.js";
import { Server } from "socket.io";
import cricketGameRoute from './routes/cricketGameRoute.js';
import gameLaunchRoute from './routes/GameLaunchRoute.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;

const app = express();



/* =====================
   MIDDLEWARES
===================== */
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         imgSrc: ["'self'", "data:", "https:"],
//         scriptSrc: ["'self'", "'unsafe-inline'"],
//         styleSrc: ["'self'", "'unsafe-inline'"],
//       },
//     },
//   })
// );


app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://api-docs.space"],
    // origin: ["https://api-docs.space"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", true);
app.use(morgan(process.env.LOG_FORMAT || 'dev'));
console.log("Server restarted at", new Date());

/* =======================
   HEALTH CHECK
======================= */

// app.get("/", (req, res) => {
//   res.json({ 
//     status: 'ok', 
//     time: new Date().toISOString(),
//     message: "Welcome to the Cricket Result API" });
// });


app.get('/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

/* =======================
   ROUTES
======================= */

app.use('/api', adminRoutes);
app.use('/api', resultRoutes);
app.use('/api', updateResultRoute);
app.use('/api', cricketRoutes);
app.use('/api', cricketGameRoute);
app.use('/api', gameLaunchRoute);



// app.use(express.static(path.join(__dirname, "admin/dist")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "admin/dist/index.html"));
// });

// app.use(express.static(path.join(__dirname, "client/dist")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/dist/index.html"));
// });


app.use(express.static(path.join(__dirname, "client/dist")));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(
      path.join(__dirname, "client/dist/index.html")
    );
  }
  next();
});



/* =======================
   ERROR HANDLER
======================= */

app.use((err, _req, res, _next) => {
  console.error('🔥 Error:', err);
  res.status(500).json({ error: 'internal_error' });
});

/* =======================
   START SERVER
======================= */

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at ${PORT}`);
});



// ✅ SOCKET SERVER
export const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://api-docs.space"
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});