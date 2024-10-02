import "dotenv/config";

import cors from "cors";
import express from "express";
import photosRoutes from "./routes/photos.js";
import tagsRoutes from "./routes/tags.js";

const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.static("public/images"));

app.use(cors());
app.use(express.json());

app.use("/photos", photosRoutes);
app.use("/tags", tagsRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
