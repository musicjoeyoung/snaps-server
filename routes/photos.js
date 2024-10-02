import express from "express";
import fs from "fs";
const router = express.Router();

const photosFilePath = "./data/photos.json";

const readPhotos = () => {
  const photosData = fs.readFileSync(photosFilePath);
  const photos = JSON.parse(photosData);
  return photos;
};
router.get("/", (req, res) => {
  try {
    const photos = readPhotos();
    res.json(photos);
  } catch (error) {
    console.error("Error reading photos file", error);
  }
});

router.get("/:id", (req, res) => {
  try {
    const photos = readPhotos();
    const photoId = req.params.id;
    const individualPhoto = photos.find((photo) => photo.id === photoId);

    if (!individualPhoto) {
      console.log("photo not found for ID: ", photoId);
    }

    res.json(individualPhoto);
  } catch (error) {
    console.error("Error ", error);
    res.status(404);
  }
});

export default router;
