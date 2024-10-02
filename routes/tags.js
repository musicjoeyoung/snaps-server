import express from "express";
import fs from "fs";
const router = express.Router();

const tagsFilePath = "./data/tags.json";

const readTags = () => {
  const tagsData = fs.readFileSync(tagsFilePath);
  const tags = JSON.parse(tagsData);
  return tags;
};
router.get("/", (req, res) => {
  try {
    const tags = readTags();
    res.json(tags);
  } catch (error) {
    console.error("Error reading tags file", error);
  }
});

export default router;
